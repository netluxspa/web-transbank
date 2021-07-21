from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Pedido, Envio
from django.db.models import Q


def isValidAdmin(request):
    from pag.models import TokenAdminPagina, Pagina
    try:
        adminkey = request.META.get('HTTP_ADMINKEY')
        site = request.META.get('HTTP_SITE')
        token = TokenAdminPagina.objects.get(token=adminkey)
        if token:
            pagina = Pagina.objects.get(codigo=site)
            if pagina:
                if token.adminPagina == pagina.admin:
                    return True
                else:
                    return False
            else: 
                return False
        else: 
            return False
    except:
        return False



@api_view(['GET'])
def getResumenPedido(request):
        if isValidAdmin(request):

            response = {
                "completados": 0,
                "pendientes": 0,
                "erroneos": 0,
                "envios_pendientes": 0
            }

            site = request.META.get('HTTP_SITE')

            response["pendientes"] = len(Pedido.objects.filter(tienda__pagina__codigo=site, transaction__response_code=0, envio=None))
            response["completados"] = len(Pedido.objects.filter(tienda__pagina__codigo=site, transaction__response_code=0, envio__status=True))
            response["erroneos"] = len(Pedido.objects.filter(tienda__pagina__codigo=site, transaction__response_code=0, envio__status=False))
            response["envios_pendientes"] = len(Envio.objects.distinct().filter(Q(pedidos__status=None) | Q(pedidos=None), pedidos__pedido__tienda__pagina__codigo=site, pedidos__pedido__transaction__response_code=0))
            
            
            return Response(response)
        else:
            return Response({'credenciales': ['Credenciales inválidas']}, status=status.HTTP_403_FORBIDDEN)
    

    