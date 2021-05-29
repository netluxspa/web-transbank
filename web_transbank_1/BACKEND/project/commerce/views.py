from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import serializers
from .models import *
from .serializers import *
from django_filters.rest_framework import DjangoFilterBackend
from pag.permissions import OnlyAdminPerPag, OnlyCreatePerUserAndListPerUserAndAdminAndRetrievePerAll

class TiendaViewSet(viewsets.ModelViewSet):
    queryset = Tienda.objects.all()
    serializer_class = TiendaSerializer
    filter_backends = (DjangoFilterBackend,)
    permission_classes = (OnlyAdminPerPag,)
    filter_fields = ('pagina','pagina__codigo',)


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


class PedidoViewSet(viewsets.ModelViewSet):
    queryset = Pedido.objects.all()
    serializer_class = PedidoSerializer
    filter_backends = (DjangoFilterBackend,)
    permission_classes = (OnlyCreatePerUserAndListPerUserAndAdminAndRetrievePerAll,)
    http_method_names = ['get']
    filter_fields = ('codigo_seguimiento', 'tienda__pagina__codigo', 'userPagina', )

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

