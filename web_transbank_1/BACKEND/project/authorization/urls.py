from django.contrib import admin
from django.urls import path, include
from .views import *
from rest_framework import routers

router = routers.DefaultRouter()

router.register('owner-pagina', OwnerPaginaViewSet)



urlpatterns = [
    path('', include(router.urls)),
]