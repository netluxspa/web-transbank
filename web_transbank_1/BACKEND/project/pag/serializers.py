from rest_framework import serializers
from django.contrib.auth.models import User, Group
from .models import *

class PaginaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pagina
        fields = ('codigo',)


class UserPaginaSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPagina
        fields = ('id', 'nombre', 'pagina', 'password', 'email')
        extra_kwargs = {
        'password': {'write_only': True}
        }


class AdminPaginaSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdminPagina
        fields = ('id', 'nombre', 'password', 'email')
        extra_kwargs = {
        'password': {'write_only': True}
        }

