from rest_framework import serializers
from .models import *


from rest_framework import serializers
from .models import *

class OwnerPaginaSerializer(serializers.ModelSerializer):
    class Meta:
        model = OwnerPagina
        fields = '__all__'
