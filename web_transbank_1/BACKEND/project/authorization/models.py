from django.db import models
from django.contrib.auth.hashers import make_password, check_password
from fernet_fields import EncryptedTextField
import uuid
from django_cryptography.fields import encrypt
# Create your models here.

# Create your models here.

class OwnerPagina(models.Model):
    nombre = models.CharField(max_length=100)
    email = models.EmailField(max_length=254)
    password = EncryptedTextField()

    def save(self,*args, **kwargs):
        self.password = make_password(self.password)
        super(OwnerPagina, self).save(*args, **kwargs)


class TokenOwnerPagina(models.Model):
    token = models.CharField(max_length=254, unique=True, default=uuid.uuid4)
    ownerPagina = models.OneToOneField(OwnerPagina, on_delete=models.CASCADE)

    def save(self,*args, **kwargs):
        self.token = make_password(str(self.token))
        super(TokenOwnerPagina, self).save(*args, **kwargs)







