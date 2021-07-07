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

class PoliticasEnvioGlobal(models.Model):
    codigo = models.CharField(max_length=50, primary_key=True)
    titulo = models.CharField(max_length=50)
    descripcion = models.TextField()



class Tienda(models.Model):
    pagina = models.OneToOneField(Pagina, on_delete=models.CASCADE)
    titulo = models.CharField(max_length=50)
    descripcion = models.TextField(null=True, blank=True)
    codigo_comercio = encrypt(models.CharField(max_length=200, default='597055555532'))
    llave_secreta = encrypt(models.CharField(max_length=200, default='579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C'))
    starken_origen_code = models.IntegerField(null=True, blank=True)
    starken_origin_name = models.CharField(max_length=50, null=True, blank=True)
    color_primary= models.CharField(max_length=100, null=True, blank=True)
    color_secondary= models.CharField(max_length=100, default='#C70039', null=True, blank=True)


class PoliticasEnvio(models.Model):
    tienda = models.OneToOneField(Tienda, on_delete=models.CASCADE, related_name='politica_envio')
    rango_zonal = models.FloatField() # distancia maxima que el vendedor cubriría
    politica_envio = models.ForeignKey(PoliticasEnvioGlobal, on_delete=models.CASCADE) # PROPIA ;  PROPIA_EXTERNA; EXTERNA; 
    c_distancia = models.FloatField(validators=[MinValueValidator(0)])
    c_peso = models.FloatField(validators=[MinValueValidator(0)])
    c_volumen = models.FloatField(validators=[MinValueValidator(0)])
    c_base = models.FloatField(validators=[MinValueValidator(0)])

class ConfigLogistica(models.Model):
    tienda = models.OneToOneField(Tienda, on_delete=models.CASCADE, related_name='config_logistica')
    lng = models.CharField(max_length=200, null=True)
    lat = models.CharField(max_length=200, null=True)
    address = models.CharField(max_length=200, null=True)
    starken_origen_code = models.IntegerField(null=True, blank=True) # código posición starken para calcular costo
    starken_origin_name = models.CharField(max_length=50, null=True, blank=True)# nombre ciudad starken
    ciudad = models.CharField(max_length=100, default='')
    pais = models.CharField(max_length=100, default='')
    calle = models.CharField(max_length=100,default='')
    numCalle = models.CharField(max_length=100, default='')
    detalle = models.TextField(default='')

    ready = models.BooleanField(default=False)


class Categoria(models.Model):
    tienda = models.ForeignKey(Tienda, on_delete=models.CASCADE)
    titulo = models.CharField(max_length=50)

    def __str__(self):
        return self.titulo


class Producto(models.Model):
    tienda = models.ForeignKey(Tienda, on_delete=models.CASCADE)
    url = models.CharField(max_length=100, unique=True)
    categoria = models.ForeignKey(Categoria, null=True, blank=True,  on_delete=models.SET_NULL)
    titulo = models.CharField(max_length=50)  
    descripcion = models.TextField(null=True, blank=True)
    precio = models.IntegerField()

    def __str__(self):
        return self.titulo

    # @property
    # def imagenes(self):
    #     return self.imagen_set.all()

    # @property
    # def textos(self):
    #     # print('asd')
    #     return self.textoproducto_set.all()


class Caja(models.Model):
    titulo = models.CharField(max_length=100)
    tienda = models.ForeignKey(Tienda, on_delete=models.CASCADE)
    alto = models.FloatField()
    ancho = models.FloatField()
    largo = models.FloatField()


class FormatoEnvio(models.Model):
    producto = models.OneToOneField(Producto, on_delete=models.CASCADE,related_name='formato_envio')
    sobre = models.BooleanField(default=None)
    peso = models.FloatField(null=True, blank=True)
    caja = models.ForeignKey(Caja, null=True, blank=True, on_delete=models.SET_NULL)
    unidades_caja = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(1)])
    solo_zona = models.BooleanField(default=False)


class TextoProducto(models.Model):
    texto = models.CharField(max_length=200)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE, related_name='textos')

    def __str__(self):
        return 'texto de' + self.producto.titulo

    @property
    def parrafos(self):
        return self.parrafo_set.all()

class Parrafo(models.Model):
    parrafo = models.TextField()
    texto = models.ForeignKey(TextoProducto, on_delete=models.CASCADE)


class Imagen(models.Model):
    imagen = models.ImageField(upload_to=scramble_uploaded_filename)
    descripcion = models.CharField(max_length=50, null=True, blank=True)
    prioridad = models.IntegerField(null=True, blank=True)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE, related_name='imagenes')

    class Meta:
        ordering = ('prioridad',)

    def __str__(self):
        return self.descripcion


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
    fecha = models.DateTimeField(auto_now_add=True)
    num_orden = models.IntegerField()
    codigo_seguimiento = models.CharField(max_length=100, blank=True, unique=True, default=uuid.uuid4)
    transaction = models.OneToOneField(Transaction, null=True, blank=True, on_delete=models.SET_NULL)

    valid_address = models.CharField(max_length=100)
    lat = models.CharField(max_length=100)
    lng = models.CharField(max_length=100)
    numContact = models.CharField(max_length=100)

    status = models.CharField(max_length=100, default='NOT_PAYED_YET')

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


class Envio(models.Model):
    pedido = models.ForeignKey(Pedido, on_delete=models.CASCADE)



class ProductosPedido(models.Model):
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    pedido = models.ForeignKey(Pedido, null=True, blank=True, on_delete=models.CASCADE, related_name='productos')
    cantidad = models.IntegerField(default=1, validators=[MinValueValidator(1)])
    precio_pedido = models.IntegerField()

    def save(self, *args, **kwargs):
        self.precio_pedido = self.producto.precio
        super(ProductosPedido, self).save(*args, **kwargs)