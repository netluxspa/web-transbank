from rest_framework import serializers
from django.contrib.auth.models import User, Group
from .models import *

class PaginaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pagina
        fields = '__all__'