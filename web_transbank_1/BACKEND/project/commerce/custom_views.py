from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.http import HttpResponse
from django.shortcuts import redirect



from django.core import mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags

from django.conf import settings
from django.core.mail import send_mail




from rest_framework import status

from django.shortcuts import render
from rest_framework import serializers
from .models import *
from pag.models import Pagina,UserPagina, TokenUserPagina
from .serializers import *
import requests
import json


from .envio_views import calulateEnvioCost


def get_or_none(classmodel, **kwargs):
    try:
        return classmodel.objects.get(**kwargs)
    except classmodel.DoesNotExist:
        return None


def validateUser(site, userkey):
    token = get_or_none(TokenUserPagina, token=userkey)
    if token:
        if token.userPagina.pagina.codigo == site:
            return {"status": True, "data": token.userPagina}
        else:
            return {"status": False}
    else:
        return {"status": False}


def validateData(fields, data):
    errors = {}
    status = True
    for i in fields:
        try:
            data[i]
        except:
            if status:
                status = False
            errors[i]=['Falta este campo']
    return {"status": status, "errors": errors}


def verifyProductos(productos):
    if isinstance(productos, list):
        response = []
        for p in productos:
            producto = get_or_none(Producto, id=p["producto"])
            if producto and p["cantidad"]:
                response.append({"producto": producto, "cantidad": p["cantidad"]})
            else:
                return {"status":False, "errors": ["Error de formato del conjunto de productos"]}
        return {"status": True, "data": response}
    else:
        return {"status":False, "errors": ["Error de formato del conjunto de productos"]}



@api_view(['POST'])
def pagar(request):

    try:
        isValidUser = validateUser(request.META.get('HTTP_SITE'), request.META.get('HTTP_USERKEY'))
    except:
        isValidUser = False
    

    if isValidUser["status"]:
        validData = validateData(["productos", "envio"], request.data)

        if validData["status"]:
            
            envio = request.data["envio"]
            
            validEnvio = validateData(["valid_address", "lat", "lng", "numContact", "destino_starken", "nombreReceptor"], envio)
            
            if validEnvio["status"]:

                productos = request.data["productos"]

                verify_productos = verifyProductos(productos)

                if verify_productos["status"]:

                    envio_cost = calulateEnvioCost(envio["lat"], envio["lng"], request.META.get('HTTP_SITE'), envio["destino_starken"], productos)
                    if envio_cost["status"]:
                        transportista = get_or_none(Transportista, codigo=envio_cost["transportista"])
                        if transportista:
                            tienda = get_or_none(Tienda, pagina__codigo=request.META.get('HTTP_SITE'))
                            if tienda:
                                if tienda.codigo_comercio and tienda.llave_secreta:
                                    new_pedido = Pedido.objects.create(tienda=tienda, userPagina=isValidUser["data"], numContact=envio["numContact"], nombreReceptor=envio["nombreReceptor"], transportista=transportista, valid_address=envio["valid_address"], lat=envio["lat"], lng=envio["lng"], precio_envio=int(envio_cost["precio"]))
                                    new_pedido.save()

                                    amount = int(envio_cost["precio"])
                                    
                                    for p in verify_productos["data"]:
                                        amount += p["producto"].precio*p["cantidad"]
                                        new_producto_pedido = ProductosPedido.objects.create(
                                            pedido=new_pedido, producto=p["producto"], cantidad=p["cantidad"]
                                            )
                                        new_producto_pedido.save()
                                    transaction = createTransaction(amount, new_pedido)
                                    if transaction["status"]:
                                        return Response(transaction["data"])
                                    else:
                                        return Response(transaction["errors"], status=status.HTTP_400_BAD_REQUEST)
                            else:
                                return Response({"envio": ["No fue posible determinar la tienda"]}, status=status.HTTP_400_BAD_REQUEST)
                        else:
                            return Response({"envio": ["No fue posible determinar al transportista"]}, status=status.HTTP_400_BAD_REQUEST)
                    else:
                        return Response(envio_cost["error"], status=status.HTTP_400_BAD_REQUEST)
                    

                else:
                    return Response(verify_productos["errors"], status=status.HTTP_400_BAD_REQUEST)
            else:

                return Response(validEnvio["errors"], status=status.HTTP_400_BAD_REQUEST)
        
        else:
            return Response(validData["errors"], status=status.HTTP_400_BAD_REQUEST)
        
    else:
        return Response({"error": ["Credenciales incorrectas"]}, status=status.HTTP_403_FORBIDDEN)

    




def createTransaction(amount, pedido):
    url = "https://webpay3gint.transbank.cl/rswebpaytransaction/api/webpay/v1.0/transactions"

    data_set = {
        "buy_order": pedido.id,
        "session_id": pedido.tienda.pagina.codigo,
        "amount": amount,
        "return_url": "http://localhost:8000/commerce/return-transbank/?codigo_seguimiento=" + str(pedido.codigo_seguimiento) + "&tienda=" + pedido.tienda.pagina.codigo,
        }
    headers = {
        "Tbk-Api-Key-Id": pedido.tienda.codigo_comercio,
        "Tbk-Api-Key-Secret": pedido.tienda.llave_secreta,
        "Content-Type": "application/json",
        }

    json_dump = json.dumps(data_set)
    try:
        r = requests.post(url, data=json_dump, headers=headers)
        if r.status_code == 200:
            return {"status": True, "data": r.json()}
        else:
            return {"status": False, "errors": {"transaction":["Error al conectar con transbank"]}}
    except:
        return {"status": False, "errors": {"transaction":["Error al conectar con transbank"]}}
    


@api_view(['POST'])
def return_transbank(request):
    if request.method == 'POST':

        codigo_seguimiento = request.GET.get("codigo_seguimiento")
        tienda = request.GET.get("tienda")

        try:
            token_success = request.data["token_ws"]
        except:
            token_success = False 

        if token_success:
            response_transaction =  transaction_status(token_success, codigo_seguimiento)
        else:
            try:
                token_anulacion = request.data["TBK_TOKEN"]
            except:
                token_anulacion = False 

            if token_anulacion:
                try:
                    pedido = Pedido.objects.get(codigo_seguimiento=codigo_seguimiento)
                except:
                    pedido = False

                if pedido: 

                    new_transaction = Transaction.objects.create(
                        main_status=False,
                        response_code='-10',
                    )

                    new_transaction.save()
                    pedido.transaction = new_transaction
                    pedido.status = 'FAILED_PAYMENT'
                    pedido.save()

    return redirect('http://' + tienda + '/tienda/seguimiento/' + codigo_seguimiento)

def transaction_status(token, codigo_seguimiento):
    print('token', token)
    try:
        tienda = Pedido.objects.get(codigo_seguimiento=codigo_seguimiento).tienda
    except:
        tienda = False
    if tienda and tienda.codigo_comercio and tienda.llave_secreta:
        url = "https://webpay3gint.transbank.cl/rswebpaytransaction/api/webpay/v1.0/transactions/" + str(token) 
        headers = {
            "Tbk-Api-Key-Id": tienda.codigo_comercio,
            "Tbk-Api-Key-Secret": tienda.llave_secreta,
            "Content-Type": "application/json",
            }
        r = requests.put(url, headers=headers)
        print('response', r.json())
        if r.status_code == 200:
            try:
                pedido = Pedido.objects.get(codigo_seguimiento=codigo_seguimiento)
            except:
                pedido = False

            if pedido: 

                new_transaction = Transaction()

                new_transaction.main_status=True
                new_transaction.vci=r.json()["vci"]
                new_transaction.amount=r.json()["amount"]
                new_transaction.status=r.json()["status"]
                new_transaction.buy_order=r.json()["buy_order"]
                new_transaction.session_id=r.json()["session_id"]
                new_transaction.card_detail=r.json()["card_detail"]["card_number"]
                new_transaction.accounting_date=r.json()["accounting_date"]
                new_transaction.transaction_date=r.json()["transaction_date"]
                new_transaction.authorization_code=r.json()["authorization_code"]
                new_transaction.payment_type_code=r.json()["payment_type_code"]
                new_transaction.response_code=r.json()["response_code"]

                try: 
                    installments_amount = r.json()["installments_amount"]
                except:
                    installments_amount = False
                if installments_amount:
                    new_transaction.installments_amount=r.json()["installments_amount"]
                
                new_transaction.installments_number=r.json()["installments_number"]
                new_transaction.save()
                pedido.transaction = new_transaction
                pedido.save()

            if r.json()["response_code"] == 0:
                sendEmailToComprador(codigo_seguimiento)
                sendEmailToVendedor(codigo_seguimiento)

            return r.json()
        else:
            return None
    else:
        return None




def sendEmailToComprador(codigo_seguimiento):
    try:
        pedido = Pedido.objects.get(codigo_seguimiento=codigo_seguimiento)
        serializerPedido = PedidoSerializer(pedido)
    except: 
        serializerPedido = None 
    if serializerPedido:
        user = UserPagina.objects.get(pk=serializerPedido.data["userPagina"])
        productos = serializerPedido.data["productos"]
      

        context = {
            'user': user.nombre,
            'productos':productos,
            'total':  serializerPedido.data["monto"],
            'tienda': pedido.tienda.pagina.codigo,
            'codigo_seguimiento': codigo_seguimiento,
            'valid_adress': pedido.valid_address,
            'numContact': pedido.numContact
        }

        subject = 'Compraste en ' + pedido.tienda.pagina.codigo

        html_message = render_to_string('email_comprador.html', context)
        plain_message = strip_tags(html_message)
        from_email = settings.EMAIL_HOST_USER
        recipient_list = [user.email]
        mail.send_mail(subject, plain_message, from_email, recipient_list, html_message=html_message)


def sendEmailToVendedor(codigo_seguimiento):
    try:
        pedido = Pedido.objects.get(codigo_seguimiento=codigo_seguimiento)
        serializerPedido = PedidoSerializer(pedido)
    except: 
        serializerPedido = None 
    if serializerPedido:
        user = UserPagina.objects.get(pk=serializerPedido.data["userPagina"])
        admin = pedido.tienda.pagina.admin
        tienda = pedido.tienda.pagina.codigo
      
        context = {
            'user': user,
            'admin': admin,
            'pedido': serializerPedido.data,
            'tienda': tienda
        }

        subject = 'Te compraron por ' + pedido.tienda.pagina.codigo

        html_message = render_to_string('email_vendedor.html', context)
        plain_message = strip_tags(html_message)
        from_email = settings.EMAIL_HOST_USER
        recipient_list = [admin.email]
        mail.send_mail(subject, plain_message, from_email, recipient_list, html_message=html_message)



