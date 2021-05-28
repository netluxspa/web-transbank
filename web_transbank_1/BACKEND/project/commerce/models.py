from django.db import models
from pag.models import Pagina
from django.core.validators import MinValueValidator
import uuid
from django_cryptography.fields import encrypt
from pag.models import UserPagina

def scramble_uploaded_filename(instanece, filename):
    extension = filename.split(".")[-1]
    return "{}.{}".format(uuid.uuid4(), extension)

# Create your models here.


class Tienda(models.Model):
    pagina = models.OneToOneField(Pagina, on_delete=models.CASCADE)
    titulo = models.CharField(max_length=50)
    descripcion = models.TextField(null=True, blank=True)
    codigo_comercio = encrypt(models.CharField(max_length=200, default='597055555532'))
    llave_secreta = encrypt(models.CharField(max_length=200, default='579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C'))


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

class Transaction(models.Model):

    main_status = models.BooleanField()

    vci = models.CharField(max_length=50, null=True, blank=True)
    amount = models.CharField(max_length=50, null=True, blank=True)
    status = models.CharField(max_length=50, null=True, blank=True)
    buy_order = models.CharField(max_length=50, null=True, blank=True)
    session_id = models.CharField(max_length=50, null=True, blank=True)
    card_detail = models.CharField(max_length=50, null=True, blank=True)
    accounting_date = models.CharField(max_length=50, null=True, blank=True)
    transaction_date = models.CharField(max_length=50, null=True, blank=True)
    authorization_code = models.CharField(max_length=50, null=True, blank=True)
    payment_type_code = models.CharField(max_length=50, null=True, blank=True)
    response_code = models.CharField(max_length=50, null=True, blank=True)
    installments_amount = models.CharField(max_length=50, null=True, blank=True)
    installments_number = models.CharField(max_length=50, null=True, blank=True)

    

class Pedido(models.Model):
    tienda = models.ForeignKey(Tienda, on_delete=models.CASCADE)
    userPagina = models.ForeignKey(UserPagina, on_delete=models.CASCADE)
    fecha = models.DateField(auto_now_add=True)
    num_orden = models.IntegerField()
    codigo_seguimiento = models.CharField(max_length=100, blank=True, unique=True, default=uuid.uuid4)
    productos = models.ManyToManyField(Producto, through='ProductosPedido', blank=True)
    transaction = models.OneToOneField(Transaction, null=True, blank=True, on_delete=models.SET_NULL)

    nombre_receptor = models.CharField(max_length=100)
    direccion = models.CharField(max_length=100)
    ciudad = models.CharField(max_length=100)
    fono = models.CharField(max_length=100)
    detalle = models.TextField()

    def monto(self):
        monto = 0
        productos = ProductosPedido.objects.filter(pedido=self.id)
        for i in productos:
            monto += i.precio_pedido*i.cantidad
        return monto


    class Meta:
        unique_together = (('num_orden', 'tienda'),) 
        index_together = (('num_orden', 'tienda'),)

    def save(self, *args, **kwargs):
        if (self.id == None):
            try:
                last_num_orden = Pedido.objects.filter(tienda=self.tienda).latest('num_orden').num_orden
            except:
                last_num_orden = 0
            self.num_orden = last_num_orden + 1
        super(Pedido, self).save(*args, **kwargs)


class ProductosPedido(models.Model):
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    pedido = models.ForeignKey(Pedido, null=True, blank=True, on_delete=models.CASCADE)
    cantidad = models.IntegerField(default=1, validators=[MinValueValidator(1)])
    precio_pedido = models.IntegerField()

    def save(self, *args, **kwargs):
        self.precio_pedido = self.producto.precio
        super(ProductosPedido, self).save(*args, **kwargs)