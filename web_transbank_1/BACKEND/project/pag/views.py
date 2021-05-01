from rest_framework import viewsets
from rest_framework import serializers
from .models import *
from .serializers import *
from django_filters.rest_framework import DjangoFilterBackend

class PaginaViewSet(viewsets.ModelViewSet):
    queryset = Pagina.objects.all()
    serializer_class = PaginaSerializer
    filter_backends = (DjangoFilterBackend,)
    filter_fields = ('codigo',)
