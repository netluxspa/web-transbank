from django.db import models
from django.contrib.auth.hashers import make_password, check_password
from fernet_fields import EncryptedTextField
import uuid
from django_cryptography.fields import encrypt
from authorization.models import OwnerPagina
import random
# Create your models here.

# =============================================================
# Admin models 

class AdminPagina(models.Model):
    email = models.EmailField(max_length=254, unique=True)
    nombre = models.CharField(max_length=50)
    password = EncryptedTextField()
    telefono = models.IntegerField(null=True, blank=True)
    is_active = models.BooleanField(default=False)



    def save(self,*args, **kwargs):
        self.password = make_password(self.password)
        super(AdminPagina, self).save(*args, **kwargs)

class TokenAdminPagina(models.Model):
    token = models.CharField(max_length=254, unique=True, default=uuid.uuid4)
    adminPagina = models.OneToOneField(AdminPagina, on_delete=models.CASCADE)

    def save(self,*args, **kwargs):
        self.token = make_password(str(self.token))
        super(TokenAdminPagina, self).save(*args, **kwargs)

# makepassword for encript password in database and check_password for verify if are equal. Both belong to from django.contrib.auth.hashers library
def random_string():
    return str(random.randint(1000, 9999))


class CodeVerificationAdmin(models.Model):
    adminPagina = models.OneToOneField(AdminPagina, on_delete=models.CASCADE)
    code = models.IntegerField(default = random_string)


# =============================================================
# Admin models 


class Pagina(models.Model):
    admin = models.ForeignKey(AdminPagina, on_delete=models.CASCADE)
    codigo = models.CharField(max_length=100, primary_key=True)


class UserPagina(models.Model):
    pagina = models.ForeignKey(Pagina, on_delete=models.CASCADE)
    email = models.EmailField(max_length=254)
    nombre = models.CharField(max_length=50)
    password = EncryptedTextField()
    telefono = models.IntegerField(null=True, blank=True)
    is_active = models.BooleanField(default=False)


    class Meta:
        unique_together = (('pagina', 'email'),) 
        index_together = (('pagina', 'email'),)

    def save(self,*args, **kwargs):
        self.password = make_password(self.password)
        super(UserPagina, self).save(*args, **kwargs)

class TokenUserPagina(models.Model):
    token = models.CharField(max_length=254, unique=True, default=uuid.uuid4)
    userPagina = models.OneToOneField(UserPagina, on_delete=models.CASCADE)

    def save(self,*args, **kwargs):
        self.token = make_password(str(self.token))
        super(TokenUserPagina, self).save(*args, **kwargs)

# makepassword for encript password in database and check_password for verify if are equal. Both belong to from django.contrib.auth.hashers library
def random_string():
    return str(random.randint(1000, 9999))


class CodeVerificationUser(models.Model):
    userPagina = models.OneToOneField(UserPagina, on_delete=models.CASCADE)
    code = models.IntegerField(default = random_string)




