from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import serializers
from .models import *
from .serializers import *
from django_filters.rest_framework import DjangoFilterBackend
from django_filters import rest_framework as filters
from pag.permissions import OnlyAdminPerPag, OnlyCreatePerUserAndListPerUserAndAdminAndRetrievePerAll
from django.db.models import Q

class TiendaViewSet(viewsets.ModelViewSet):
    queryset = Tienda.objects.all()
    serializer_class = TiendaSerializer
    filter_backends = (DjangoFilterBackend,)
    permission_classes = (OnlyAdminPerPag,)
    filter_fields = ('pagina','pagina__codigo',)


class ConfigLogisticaViewSet(viewsets.ModelViewSet):
    queryset = ConfigLogistica.objects.all()
    serializer_class = ConfigLogisticaSerializer
    filter_backends = (DjangoFilterBackend,)
    permission_classes = (OnlyAdminPerPag,)
    filter_fields = ('tienda', 'tienda__pagina__codigo')



class PoliticasEnvioGlobalViewSet(viewsets.ModelViewSet):
    queryset = PoliticasEnvioGlobal.objects.all()
    serializer_class = PoliticasEnvioGlobalSerializer
    filter_backends = (DjangoFilterBackend,)
    permission_classes = (OnlyAdminPerPag,)




class PoliticasEnvioViewSet(viewsets.ModelViewSet):
    queryset = PoliticasEnvio.objects.all()
    serializer_class = PoliticasEnvioSerializer
    filter_backends = (DjangoFilterBackend,)
    permission_classes = (OnlyAdminPerPag,)
    filter_fields = ('tienda', 'tienda__pagina__codigo')


class CajaViewSet(viewsets.ModelViewSet):
    queryset = Caja.objects.all()
    serializer_class = CajaSerializer
    filter_backends = (DjangoFilterBackend,)
    permission_classes = (OnlyAdminPerPag,)
    filter_fields = ('tienda', 'tienda__pagina__codigo')



class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
    permission_classes = (OnlyAdminPerPag,)
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('tienda', 'tienda__pagina', )

class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    permission_classes = (OnlyAdminPerPag,)
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('tienda', 'url',)

class FormatoEnvioViewSet(viewsets.ModelViewSet):
    queryset = FormatoEnvio.objects.all()
    serializer_class = FormatoEnvioSerializer
    permission_classes = (OnlyAdminPerPag,)
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('producto',)


class EnvioFilter(filters.FilterSet):
    nochecked = filters.BooleanFilter(field_name='pedidos__status', lookup_expr='isnull')

    class Meta:
        model=Envio
        fields=('tienda__pagina__codigo', 'nochecked', 'pedidos__pedido__transaction__response_code', )
    


class EnvioViewSet(viewsets.ModelViewSet):
    queryset = Envio.objects.all()
    serializer_class = EnvioSerializer
    filter_backends = (DjangoFilterBackend,)
    filterset_class = EnvioFilter

    def get_queryset(self):
        return self.queryset.distinct()



class EnvioPedidoViewSet(viewsets.ModelViewSet):
    queryset = EnvioPedido.objects.all()
    serializer_class = EnvioPedidoSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('envio',)


class PedidoFilter(filters.FilterSet):
    no_envio = filters.BooleanFilter(field_name='envio', lookup_expr='isnull')

    class Meta:
        model=Pedido
        fields=('codigo_seguimiento', 'tienda__pagina__codigo', 'transaction__response_code', 'userPagina', 'envio__envio', 'no_envio')
    


class PedidoViewSet(viewsets.ModelViewSet):
    queryset = Pedido.objects.all()
    serializer_class = PedidoSerializer
    filter_backends = (DjangoFilterBackend,)
    
    # permission_classes = (OnlyCreatePerUserAndListPerUserAndAdminAndRetrievePerAll,)
    # http_method_names = ['get']
    filterset_class = PedidoFilter

    def create(self, request, *args, **kwargs):
        productos = request.data["productos"]
        tienda = request.data["tienda"]
        for p in productos:
            serializer = ProductosPedidoSerializer(data=p)
            if (serializer.is_valid() == False):
                return Response({'error': serializer.errors})

        new_pedido = Pedido()
        new_pedido.tienda = Tienda.objects.get(pk=tienda)
        new_pedido.save()

        for p in productos:
            producto_add = Producto.objects.get(pk=p["producto"])
            new_producto_pedido = ProductosPedido.objects.create(
                pedido=new_pedido, producto=producto_add, cantidad=p["cantidad"]
                )
            new_producto_pedido.save()
        
        serializer_response = PedidoSerializer(new_pedido)
        return Response(serializer_response.data)

class ProductosPedidoViewSet(viewsets.ModelViewSet):
    queryset = ProductosPedido.objects.all()
    serializer_class = ProductoPedidoSerializer
    # filter_backends = (DjangoFilterBackend,)
    # filter_fields = ('tienda', 'url',)


class ImagenViewSet(viewsets.ModelViewSet):
    queryset = Imagen.objects.all()
    serializer_class = ImagenSerializer
    permission_classes = (OnlyAdminPerPag,)
    # filter_backends = (DjangoFilterBackend,)
    # filter_fields = ('tienda', 'url',)



class TextoProductoViewSet(viewsets.ModelViewSet):
    queryset = TextoProducto.objects.all()
    serializer_class = TextoProductoSerializer
    permission_classes = (OnlyAdminPerPag,)
    # filter_backends = (DjangoFilterBackend,)
    # filter_fields = ('tienda', 'url',)

class ParrafoViewSet(viewsets.ModelViewSet):
    queryset = Parrafo.objects.all()
    serializer_class = ParrafoSerializer
    # permission_classes = (OnlyAdminPerPag,)
    # filter_backends = (DjangoFilterBackend,)
    # filter_fields = ('tienda', 'url',)




    

