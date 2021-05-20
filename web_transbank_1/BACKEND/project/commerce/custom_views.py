from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import HttpResponse
from django.shortcuts import redirect

from rest_framework import status

from django.shortcuts import render
from rest_framework import serializers
from .models import *
from pag.models import Pagina,UserPagina, TokenUserPagina
from .serializers import *
import requests
import json


@api_view(['POST'])
def transaccionCreate(request):
    try:
        pagina = Pagina.objects.get(codigo=request.META.get('HTTP_SITE'))
    except:
        pagina = False 


    if pagina:
        try:
            tienda = Tienda.objects.get(pagina=pagina)
        except:
            tienda = False 
        
        if tienda:
            print(request.META.get('HTTP_USERKEY'))
            try:
                token = TokenUserPagina.objects.get(token=request.META.get('HTTP_USERKEY'))
            except:
                token = False 
            if token:
                user = token.userPagina
                if user.pagina.codigo == pagina.codigo:

                    try:
                        productos = request.data["productos"]
                    except:
                        productos = False 


                    if productos:
                        list_productos = []
                        for p in productos:

                            try:
                                verify_producto = Producto.objects.get(id=p["producto"], tienda=tienda)
                            except:
                                verify_producto = False 

                            if verify_producto and p["cantidad"]:
                                list_productos.append({"producto": verify_producto, "cantidad": p["cantidad"]})
                            else:
                                return Response({'error': 'Información inválida'}, status=status.HTTP_400_BAD_REQUEST)

                        if tienda.codigo_comercio and tienda.llave_secreta:
                            new_pedido = Pedido.objects.create(tienda=tienda, userPagina=user)
                            new_pedido.save()

                            amount = 0

                            for p in list_productos:
                                amount += p["producto"].precio*p["cantidad"]
                                new_producto_pedido = ProductosPedido.objects.create(
                                    pedido=new_pedido, producto=p["producto"], cantidad=p["cantidad"]
                                    )
                                new_producto_pedido.save()
                            
                            # session_id = json.dumps({"pagina": pagina.codigo, "cod_seg": str(new_pedido.codigo_seguimiento)})
                            # print(type(session_id))
                            url = "https://webpay3gint.transbank.cl/rswebpaytransaction/api/webpay/v1.0/transactions/"

                            data_set = {
                                "buy_order": new_pedido.id,
                                "session_id": pagina.codigo,
                                "amount": amount,
                                "return_url": "http://localhost:8000/commerce/return-transbank/?codigo_seguimiento=" + str(new_pedido.codigo_seguimiento),
                                }
                            headers = {
                                "Tbk-Api-Key-Id": tienda.codigo_comercio,
                                "Tbk-Api-Key-Secret": tienda.llave_secreta,
                                "Content-Type": "application/json",
                                }

                            json_dump = json.dumps(data_set)
                            
                            r = requests.post(url, data=json_dump, headers=headers)

                            return Response(r.json())


                        else:
                            return Response({"error": "Credenciales de comercio no ingresadas."})

 



                    else:
                        return Response({'error': 'Información inválida'}, status=status.HTTP_400_BAD_REQUEST)


                else:
                     return Response({'error': 'Error en la autenticación.'}, status=status.HTTP_400_BAD_REQUEST)

            else:
                return Response({'error': 'Error en la autenticación.'}, status=status.HTTP_400_BAD_REQUEST)




        else:
            return Response({'error': 'Error de sistema'}, status=status.HTTP_400_BAD_REQUEST)


    else:
        return Response({'error': 'Error de sistema'}, status=status.HTTP_400_BAD_REQUEST)





@api_view(['POST'])
def return_transbank(request):
    if request.method == 'POST':
        codigo_seguimiento = request.GET.get("codigo_seguimiento")
        token = request.data["token_ws"]
        response_transaction =  transaction_status(token, codigo_seguimiento)

    return redirect('http://' + response_transaction["session_id"] + '/tienda/seguimiento/' + codigo_seguimiento)


def transaction_status(token, codigo_seguimiento):
    try:
        tienda = Pedido.objects.get(codigo_seguimiento=codigo_seguimiento).tienda
    except:
        tienda = False
    print('tienda', tienda)
    if tienda and tienda.codigo_comercio and tienda.llave_secreta:
        url = "https://webpay3gint.transbank.cl/rswebpaytransaction/api/webpay/v1.0/transactions/" + token + "/"
        headers = {
            "Tbk-Api-Key-Id": tienda.codigo_comercio,
            "Tbk-Api-Key-Secret": tienda.llave_secreta,
            "Content-Type": "application/json",
            }
        r = requests.put(url, headers=headers)
        print('transaction_status',  r.json())
        if r.status_code == 200:
            try:
                pedido = Pedido.objects.get(codigo_seguimiento=codigo_seguimiento)
            except:
                pedido = False

            if pedido: 
                pedido.estado_transaccion = r.json()["status"]
                pedido.save()

                new_transaction = Transaction.objects.create(
                    vci=r.json()["vci"],
                    amount=r.json()["amount"],
                    status=r.json()["status"],
                    buy_order=r.json()["buy_order"],
                    session_id=r.json()["session_id"],
                    card_detail=r.json()["card_detail"]["card_number"],
                    accounting_date=r.json()["accounting_date"],
                    transaction_date=r.json()["transaction_date"],
                    authorization_code=r.json()["authorization_code"],
                    payment_type_code=r.json()["payment_type_code"],
                    response_code=r.json()["response_code"],
                    installments_number=r.json()["installments_number"],
                )

                new_transaction.save()
                pedido.transaction = new_transaction
                pedido.save()



        return r.json()
    else:
        return 'error'
