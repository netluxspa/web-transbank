from rest_framework.decorators import api_view
from rest_framework.response import Response
import requests
import json
from rest_framework import status
from .models import *

from geopy.distance import geodesic


HEADERS = {
            "Content-Type": "application/json",
    }


STARKEN_COTIZACION_URL = 'https://gateway.starken.cl/quote/cotizador' #POST_METHOD

STARKEN_CITY = 'https://gateway.starken.cl/agency/city'

def get_or_none(classmodel, **kwargs):
    try:
        return classmodel.objects.get(**kwargs)
    except classmodel.DoesNotExist:
        return None


def simplify_citys(citys):
    def simplify(city):
        return {"code_dls": city['code_dls'], "name":city["name"]}
    response = map(simplify, citys)
    return response


@api_view(['GET'])
def getCity(request):
    r = requests.get(STARKEN_CITY, headers=HEADERS)
    if r.status_code == 200:
    # if False:
        citys = r.json()
        response = simplify_citys(citys)
        return Response({"citys": list(response)})
    else:
        return Response({"error":'No se pudo obtener las ciudades'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def getEnvioCost(request):
    if (
        request.data["productos"] and 
        request.data["init"] and 
        request.data["distance"] >= 0 and 
        request.data["site"] and 
        request.data["lat"] and 
        request.data["lng"] and 
        request.data["finish"]
        ):

        cost = calulateEnvioCost(
            request.data["lat"], 
            request.data["lng"], 
            request.data["site"],
            request.data["distance"],
            request.data["init"],
            request.data["finish"],
            request.data["productos"]  
        )

        if cost["status"]:
            return Response(cost)
        else:
            return Response(cost, status=status.HTTP_400_BAD_REQUEST)

    else:
        return Response({"error": 'Datos inválidos'}, status=status.HTTP_400_BAD_REQUEST)
    

def calulateEnvioCost(lat, lng, site, distance, init, finish, productos):
    politica = PoliticasEnvio.objects.get(tienda__pagina__codigo=site)
    if politica:
        politica_envio = politica.politica_envio.codigo
        ranzo_zonal = politica.rango_zonal
        
        if politica_envio == 'PROPIA':
            coordenates = get_or_none(ConfigLogistica, tienda__pagina__codigo=site)
            if coordenates.lat and coordenates.lng:
                distancia = calculateDistance(coordenates.lat, coordenates.lng, lat, lng).km

                if distancia > ranzo_zonal:
                    return {"status": False, "error": "No hacemos envíos a esa zona"}
                else:
                    return getSelfCost(int(distancia), site, productos)
            else:
                return {"status": False, "error": "Parámetros insuficientes."}
                

        elif politica_envio == 'EXTERNA':
            starkenCost = getStarkenCost(init,finish,productos)
            return starkenCost
            
        else:
            coordenates = get_or_none(ConfigLogistica, tienda__pagina__codigo=site)
            if coordenates.lat and coordenates.lng:
                distancia = calculateDistance(coordenates.lat, coordenates.lng, lat, lng).km
                if distancia > ranzo_zonal:
                    starkenCost = getStarkenCost(init,finish,productos)
                    return starkenCost
                else:
                    return getSelfCost(int(distancia), site, productos)
            else:
                return {"status": False, "error": "Parámetros insuficientes."}

    else:
        return {"status": False, "error": "Parámetros insuficientes."}


def calculateDistance(lat1, lng1, lat2, lng2):
    newport_ri = (lat1, lng1)
    cleveland_oh = (lat2, lng2)
    distance = geodesic(newport_ri, cleveland_oh)
    return distance


def getStarkenCost(init, finish, productos):
    dataPrepared = prepareStarkenData(
            init, 
            finish, 
            productos
            )
    if dataPrepared["status"]:
        cost = calculateStarkenCost(
            dataPrepared["init"],
            dataPrepared["finish"],
            dataPrepared["largo"],
            dataPrepared["ancho"],
            dataPrepared["alto"],
            dataPrepared["peso"],
            dataPrepared["sobre"],
        )
        return cost
    else:
        return dataPrepared
    

def prepareStarkenData(init, finish, productos):
    pesoTotal = 0
    volumenTotal = 0
    sobre = True
    for i in productos:
        try:
            formato = FormatoEnvio.objects.get(producto=i["id"])
        except:
            formato = False
        if formato:
            if formato.solo_zona:
                return {"status": False, "error": "Hay un producto inválido"}
            else:
                if formato.sobre == False:
                    if sobre:
                        sobre = False
                    if formato.peso and formato.caja and formato.unidades_caja and i["cantidad"]:
                        pesoTotal += formato.peso * i["cantidad"]
                        cant_cajas = i["cantidad"]/formato.unidades_caja
                        vol_caja =(formato.caja.alto * formato.caja.ancho * formato.caja.largo)*cant_cajas
                        volumenTotal += vol_caja
                    else:
                        return {"status": False,  "error": "Hay un producto inválido"}
        else:
            return {"status": False, "error": "Hay un producto inválido"}
    if sobre:
        volumenTotal=1
        pesoTotal=1

    response = {
        "status": True,
        "sobre": sobre,
        "peso": pesoTotal,
        "alto": volumenTotal**(1/3),
        "ancho": volumenTotal**(1/3),
        "largo": volumenTotal**(1/3),   
        "init": init, 
        "finish": finish
    }


    return response
    

def calculateStarkenCost(inicio, final, largo, ancho, alto, peso, sobre):

    payload = {
        "alto": str(alto),
        "ancho": str(ancho),
        "bulto": "PAQUETE",
        "destino": str(final),
        "entrega": "DOMICILIO",
        "kilos": str(peso),
        "largo": str(largo),
        "origen": str(inicio),
        "servicio": "NORMAL"
    }

    if sobre:
        payload["alto"] = "1"
        payload["ancho"] = "1"
        payload["largo"] = "1"
        # payload["kilos"] = "1"

    try:
        r = requests.post(STARKEN_COTIZACION_URL,headers=HEADERS, json=payload)   
        if r.status_code == 201:
            return {"status": True, "precio": r.json()["precio"], "transportista":"STARKEN"}
        else:
            return {"status": False, "error": "Error al obtener los datos de envío"}
    except:
        return {"status": False, "error": "Error al obtener los datos de envío. Compruebe su conexión a internet"}


def getSelfCost(distance, site, productos):
    print(site)
    try:
        c = PoliticasEnvio.objects.get(tienda__pagina__codigo=site)
    except:
        c = False
    if c:
        peso_volumen = calulatePesoVolumen(productos)
        if peso_volumen["status"]:
            selfCost = calulatoSelfCost(c.c_base, c.c_peso, c.c_volumen,c.c_distancia, distance, peso_volumen["peso"], peso_volumen["volumen"])
            return {"status": True, "precio": selfCost, "transportista": "PROPIO"}
        else:
            return peso_volumen
    else:
        return {"status": False, "error":"Datos de envío no definidos"}


def calulatePesoVolumen(productos):
    peso = 0
    volumen = 0
    sobre = True
    for i in productos:
        try:
            formato = FormatoEnvio.objects.get(producto=i["id"])
        except:
            formato = False

        if formato:
            if formato.solo_zona:
                return {"status": False, "error": "Hay un producto inválido"}
            else:
                if formato.sobre == False:
                    if sobre:
                        sobre = False
                    if formato.peso and formato.caja and formato.unidades_caja and i["cantidad"]:
                        peso += formato.peso * i["cantidad"]
                        cant_cajas = i["cantidad"]/formato.unidades_caja
                        vol_caja =(formato.caja.alto * formato.caja.ancho * formato.caja.largo)*cant_cajas
                        volumen += vol_caja
                    else:
                        return {"status": False,  "error": "Hay un producto inválido"}
                
        else:
            return {"status": False, "error": "Error al obtener formato de productos"}

    if sobre:
        peso=1
        volumen=1

    response = {
        "peso": peso,
        "volumen": volumen,
        "status": True
    }

    return response


def calulatoSelfCost(c_base, c_peso, c_volumen,c_distance, distance, peso, volumen):
    if distance > 0:
        distance = distance/1000
    return c_base + c_peso*peso + c_volumen*volumen + c_distance*distance