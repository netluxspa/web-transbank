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
        fields =  ('id', 'tienda', 'userPagina', 'fecha',  'codigo_seguimiento', 'productos', 'transaction', 'valid_address', 'numContact', 'transportista', 'nombreReceptor', 'precio_envio', 'lng', 'lat', 'monto',  'envio',)
        # fields = '__all__'


class EnvioPedidoSerializer(serializers.ModelSerializer):  
    pedido_detail = PedidoSerializer(source='pedido', many=False, read_only=True)
    class Meta:
        model = EnvioPedido
        fields = '__all__'

class EnvioSerializer(serializers.ModelSerializer):   
    pedidos = EnvioPedidoSerializer(many=True, required=False)
    class Meta:
        model = Envio
        fields = ('id', 'fecha', 'descripcion', 'pedidos', 'tienda', 'pedidos_pendientes', 'pedidos_totales',  )
    
    def create(self, validated_data):
        pedidos_data = validated_data.pop('pedidos')
        envio = Envio.objects.create(**validated_data)
        for pedido_data in pedidos_data:
            EnvioPedido.objects.create(envio=envio, **pedido_data)
        return envio






