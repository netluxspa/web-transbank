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


def get_or_none(classmodel, **kwargs):
    try:
        return classmodel.objects.get(**kwargs)
    except classmodel.DoesNotExist:
        return None


@api_view(['POST'])
def transaccionCreate(request):
    pagina = get_or_none(Pagina, codigo=request.META.get('HTTP_SITE'))
    if pagina:
        tienda = get_or_none(Tienda, pagina=pagina)
        if tienda:
            token = get_or_none(TokenUserPagina, token=request.META.get('HTTP_USERKEY'))
            if token:
                user = token.userPagina
                if user.pagina.codigo == pagina.codigo:
                    try:
                        envio = request.data['envio']
                    except:
                        envio = False

                    if envio:
                        try:
                            valid_address = envio["valid_address"]
                            numContact = envio["numContact"]
                            lat = envio["lat"]
                            lng = envio["lng"]
                            
                            envio_data = True
                        except:
                            envio_data = False 
                        if envio_data:
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
                                    new_pedido = Pedido.objects.create(tienda=tienda, userPagina=user, numContact=numContact, valid_address=valid_address, lat=lat, lng=lng)
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
                                        "buy_order": new_pedido.num_orden,
                                        "session_id": pagina.codigo,
                                        "amount": amount,
                                        "return_url": "http://localhost:8000/commerce/return-transbank/?codigo_seguimiento=" + str(new_pedido.codigo_seguimiento) + "&tienda=" + pagina.codigo,
                                        }
                                    headers = {
                                        "Tbk-Api-Key-Id": tienda.codigo_comercio,
                                        "Tbk-Api-Key-Secret": tienda.llave_secreta,
                                        "Content-Type": "application/json",
                                        }

                                    json_dump = json.dumps(data_set)
                                    
                                    r = requests.post(url, data=json_dump, headers=headers)
                                    print('createtransaction', r)
                                    new_pedido.token_ws = r.json()["token"]
                                    new_pedido.save()
                                    return Response(r.json())

                                else:
                                    return Response({"error": "Credenciales de comercio no ingresadas."})

                            else:
                                return Response({'error': 'Información inválida '}, status=status.HTTP_400_BAD_REQUEST)


                        else:
                            return Response({'error': 'Información inválida de envio'}, status=status.HTTP_400_BAD_REQUEST)

                        
                    else:
                        return Response({'error': 'Información inválida de envio'}, status=status.HTTP_400_BAD_REQUEST)
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
    try:
        tienda = Pedido.objects.get(codigo_seguimiento=codigo_seguimiento).tienda
    except:
        tienda = False
    if tienda and tienda.codigo_comercio and tienda.llave_secreta:
        url = "https://webpay3gint.transbank.cl/rswebpaytransaction/api/webpay/v1.0/transactions/" + token + "/"
        headers = {
            "Tbk-Api-Key-Id": tienda.codigo_comercio,
            "Tbk-Api-Key-Secret": tienda.llave_secreta,
            "Content-Type": "application/json",
            }
        r = requests.put(url, headers=headers)
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
                if new_transaction.response_code == 0:
                    pedido.status = 'PENDING'
                else:
                    pedido.status = 'FAILED_PAYMENT'
                pedido.save()

        if r.json()["response_code"] == 0:
            sendEmailToComprador(codigo_seguimiento)
            sendEmailToVendedor(codigo_seguimiento)

        return r.json()
    else:
        return 'error'




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



