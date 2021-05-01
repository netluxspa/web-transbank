from django.contrib import admin
from django.urls import path, include
from .views import *
from rest_framework import routers

router = routers.DefaultRouter()

router.register('tienda', TiendaViewSet)
router.register('categoria', CategoriaViewSet)
router.register('producto', ProductoViewSet)
router.register('pedido', PedidoViewSet)
router.register('producto-pedido', ProductosPedidoViewSet)


urlpatterns = [
    path('', include(router.urls)),
]