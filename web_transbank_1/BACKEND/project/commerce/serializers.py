from rest_framework import serializers
from django.contrib.auth.models import User, Group
from .models import *

class TiendaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tienda
        fields = ('id', 'pagina', 'titulo', 'descripcion' )


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


class ProductoSerializer(serializers.ModelSerializer):
    imagenes = ImagenSerializer(many=True, read_only=True)
    textos = TextoProductoSerializer(many=True, read_only=True)
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
    productos = ProductoPedidoSerializer(source='productospedido_set', many=True, required=False)
    class Meta:
        model = Pedido
        fields =  '__all__'



