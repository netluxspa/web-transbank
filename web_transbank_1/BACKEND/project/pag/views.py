from rest_framework import serializers, permissions, viewsets
from rest_framework.response import Response
from rest_framework import serializers
from .models import *
from .serializers import *
from django_filters.rest_framework import DjangoFilterBackend
from .permissions import OnlyAdminPerPag


class FixAnAppointmentPermssion(permissions.BasePermission):
    def has_permission(self, request, view):
        if view.action == 'create':
                # data = request.POST.get('photos')
            data = request.data
            return True

        if view.action == 'partial_update':
            site_request = request.META.get("HTTP_SITE")
            id_request = request.data["id"]
            userkey_request = request.META.get("HTTP_USERKEY")
            try:
                id_valid = TokenUserPagina.objects.get(token=request.META.get("HTTP_USERKEY")).userPagina.id
                site_valid = TokenUserPagina.objects.get(token=request.META.get("HTTP_USERKEY")).userPagina.pagina.codigo
                if (id_request == id_valid and site_request == site_valid):
                    return True
                else:
                    return False
            except:
                return False
           


        







class PaginaViewSet(viewsets.ModelViewSet):
    queryset = Pagina.objects.all()
    serializer_class = PaginaSerializer
    filter_backends = (DjangoFilterBackend,)
    permission_classes = (OnlyAdminPerPag,)
    filter_fields = ('codigo',)

    



class UserPaginaViewSet(viewsets.ModelViewSet):
    queryset = UserPagina.objects.all()
    serializer_class = UserPaginaSerializer
    permission_classes = (FixAnAppointmentPermssion,)
    http_method_names = ['post', 'patch']


    def create(self, request, *args, **kwargs):

        data = {
            "pagina": request.META.get("HTTP_SITE"),
            "nombre": request.data['nombre'],
            "email": request.data['email'],
            "password": request.data["password"]
        }

        serializer = UserPaginaSerializer(data=data)
        if (serializer.is_valid()):
            serializer.save()
            token = TokenUserPagina.objects.create(userPagina=UserPagina.objects.get(pk=serializer.data["id"]))
            token.save()
            return Response({"token": token.token})

        else:
            return Response({"error": serializer.errors})


