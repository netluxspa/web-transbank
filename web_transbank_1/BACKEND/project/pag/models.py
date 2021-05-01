from django.db import models

# Create your models here.

class Pagina(models.Model):
    codigo = models.CharField(max_length=100, primary_key=True)
