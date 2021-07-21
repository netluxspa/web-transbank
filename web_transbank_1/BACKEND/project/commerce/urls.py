from django.contrib import admin
from django.urls import path, include
from .views import *
from .custom_views import *
from .envio_views import *
from .adminPedidosViews import *
from rest_framework import routers


router = routers.DefaultRouter()

router.register('tienda', TiendaViewSet)
router.register('config-logistica', ConfigLogisticaViewSet)
router.register('politica-envio', PoliticasEnvioViewSet)
router.register('politica-global', PoliticasEnvioGlobalViewSet)
router.register('caja', CajaViewSet)




router.register('categoria', CategoriaViewSet)
router.register('producto', ProductoViewSet)
router.register('formato-envio', FormatoEnvioViewSet)
router.register('imagen', ImagenViewSet)
router.register('texto', TextoProductoViewSet)
router.register('parrafo', ParrafoViewSet)
router.register('pedido', PedidoViewSet)
router.register('envio', EnvioViewSet)
router.register('envio-pedido', EnvioPedidoViewSet)


# router.register('producto-pedido', ProductosPedidoViewSet)






urlpatterns = [
    path('', include(router.urls)),
    path('pagar/', pagar, name='test-view'),
    path('return-transbank/', return_transbank, name='return-transbank'),
    path('get-city/', getCity, name='get-city'),
    path('get-envio-cost/', getEnvioCost, name='get-envio-cost'),
    path('get-resumen-pedido/', getResumenPedido, name='get-resumen-pedido'),


    
]



# STATUS PEDIDO: 

# NOT_PAYED_YET,
# PENDING,
# FAILED_PAYMENT