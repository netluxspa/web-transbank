from rest_framework import serializers, permissions, viewsets
from rest_framework.response import Response
from .models import *
from .serializers import *
from django_filters.rest_framework import DjangoFilterBackend


class FixAnAppointmentPermssion(permissions.BasePermission):
    def has_permission(self, request, view):
        # data = request.POST.get('photos')
        data = request.data
        print(data)
        return True


    
class OwnerPaginaViewSet(viewsets.ModelViewSet):
    queryset = OwnerPagina.objects.all()
    serializer_class = OwnerPaginaSerializer
    # filter_backends = (DjangoFilterBackend,)
    # filter_fields = ('codigo',)
    permission_classes = (FixAnAppointmentPermssion,)

    def create(self, request, *args, **kwargs):

        return Response('mamame la colloma bastardo la puta')
