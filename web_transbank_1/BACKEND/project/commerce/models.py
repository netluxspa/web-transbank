from django.db import models
from pag.models import Pagina
from django.core.validators import MinValueValidator
import uuid

def scramble_uploaded_filename(instanece, filename):
    extension = filename.split(".")[-1]
    return "{}.{}".format(uuid.uuid4(), extension)

# Create your models here.


class Tienda(models.Model):
    pagina = models.OneToOneField(Pagina, on_delete=models.CASCADE)
    titulo = models.CharField(max_length=50)


class Categoria(models.Model):
    tienda = models.ForeignKey(Tienda, on_delete=models.CASCADE)
    titulo = models.CharField(max_length=50)

    def __str__(self):
        return self.titulo

class Imagen(models.Model):
    imagen = models.ImageField(upload_to=scramble_uploaded_filename)
    descripcion = models.CharField(max_length=50, null=True, blank=True)
    prioridad = models.IntegerField(null=True, blank=True)

    class Meta:
        ordering = ('prioridad',)

    def __str__(self):
        return self.descripcion

class Parrafo(models.Model):
    parrafo = models.TextField()

class TextoProducto(models.Model):
    texto = models.CharField(max_length=200)
    parrafos = models.ManyToManyField(Parrafo, blank=True)


class Producto(models.Model):
    tienda = models.ForeignKey(Tienda, on_delete=models.CASCADE)
    url = models.CharField(max_length=100, unique=True)
    categoria = models.ForeignKey(Categoria, null=True, blank=True,  on_delete=models.SET_NULL)
    titulo = models.CharField(max_length=50)  
    descripcion = models.TextField(null=True, blank=True)
    imagenes = models.ManyToManyField(Imagen, blank=True)
    textos = models.ManyToManyField(TextoProducto, blank=True)
    precio = models.IntegerField()

    def __str__(self):
        return self.titulo


class Pedido(models.Model):
    fecha = models.DateField(auto_now_add=True)
    codigo_seguimiento = models.CharField(max_length=100, blank=True, unique=True, default=uuid.uuid4)
    productos = models.ManyToManyField(Producto, through='ProductosPedido', blank=True)

class ProductosPedido(models.Model):
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    pedido = models.ForeignKey(Pedido, null=True, blank=True, on_delete=models.CASCADE)
    cantidad = models.IntegerField(default=1, validators=[MinValueValidator(1)])


  