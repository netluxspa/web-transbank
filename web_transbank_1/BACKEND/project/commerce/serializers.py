from rest_framework import serializers
from django.contrib.auth.models import User, Group
from .models import *


class ConfigLogisticaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConfigLogistica
        fields = '__all__'


class PoliticasEnvioGlobalSerializer(serializers.ModelSerializer):
    class Meta:
        model = PoliticasEnvioGlobal
        fields = '__all__'


class PoliticasEnvioSerializer(serializers.ModelSerializer):
    politica_detail = PoliticasEnvioGlobalSerializer(source='politica_envio', many=False, read_only=True)
    class Meta:
        model = PoliticasEnvio
        fields = '__all__'


class TiendaSerializer(serializers.ModelSerializer):
    config_logistica = ConfigLogisticaSerializer(read_only=True)
    politica_envio = PoliticasEnvioSerializer(read_only=True)
    class Meta:
        model = Tienda
        fields = ('id', 'pagina', 'titulo', 'descripcion', 'starken_origen_code', 'starken_origin_name', 'color_primary', 'color_secondary', 'config_logistica', 'politica_envio' ,)




class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'


class ImagenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Imagen
        fields = '__all__'

class ParrafoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Parrafo
        fields = '__all__'

class TextoProductoSerializer(serializers.ModelSerializer):

    parrafos = ParrafoSerializer(many=True, read_only=True)

    class Meta:
        model = TextoProducto
        fields = '__all__'

class CajaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Caja
        fields = '__all__'

class FormatoEnvioSerializer(serializers.ModelSerializer):

    caja_detail = CajaSerializer(source='caja', many=False, read_only=True)


    class Meta:
        model = FormatoEnvio
        fields = '__all__'


class ProductoSerializer(serializers.ModelSerializer):
    formato_envio = FormatoEnvioSerializer(read_only=True)
    imagenes = ImagenSerializer(many=True, read_only=True)
    textos = TextoProductoSerializer(many=True, read_only=True)
    categoria_detail = CategoriaSerializer(source='categoria', many=False, read_only=True)
    class Meta:
        model = Producto
        fields = '__all__'


class ProductoResumeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = ('id', 'titulo',)


class ProductosPedidoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductosPedido
        fields = '__all__'



class ProductoPedidoSerializer(serializers.ModelSerializer):
    producto = ProductoResumeSerializer(many=False, read_only=True)
    class Meta:
        model = ProductosPedido
        fields = '__all__'

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'


class PedidoSerializer(serializers.ModelSerializer):   
    transaction =  TransactionSerializer(many=False, read_only=True)
    productos = ProductoPedidoSerializer(many=True, required=False)
    class Meta:
        model = Pedido
        fields =  ('id', 'tienda', 'userPagina', 'fecha', 'num_orden', 'codigo_seguimiento', 'productos', 'transaction', 'valid_address', 'numContact', 'lng', 'lat', 'status', 'monto',)



