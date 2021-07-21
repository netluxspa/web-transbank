from django.contrib import admin
from .models import *

# Register your models here.

admin.site.register(Tienda)
admin.site.register(ConfigLogistica)
admin.site.register(PoliticasEnvioGlobal)
admin.site.register(PoliticasEnvio)


# admin.site.register(Categoria)
# admin.site.register(Imagen)
# admin.site.register(Producto)
# admin.site.register(Caja)
# admin.site.register(FormatoEnvio)
# admin.site.register(TextoProducto)
# admin.site.register(Parrafo)
admin.site.register(Pedido)
admin.site.register(Envio)
admin.site.register(EnvioPedido)
admin.site.register(ProductosPedido)
admin.site.register(Transportista)
