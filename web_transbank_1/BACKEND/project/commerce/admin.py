from django.contrib import admin
from .models import *

# Register your models here.

admin.site.register(Tienda)
admin.site.register(Categoria)
admin.site.register(Imagen)
admin.site.register(Producto)
admin.site.register(TextoProducto)
admin.site.register(Parrafo)
admin.site.register(Pedido)
admin.site.register(ProductosPedido)
