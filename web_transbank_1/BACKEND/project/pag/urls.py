from django.contrib import admin
from django.urls import path, include
from .views import *
from .custom_views import *
from rest_framework import routers
from .authAdmin import *

router = routers.DefaultRouter()

router.register('pagina', PaginaViewSet)
router.register('user-pagina', UserPaginaViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('get-user/', getUser, name='get-user'),
    path('register-user/', registerUser, name='register-user'),
    path('verify-code/', verifyCode, name='verify-code'),
    path('login-user/', loginUser, name='login-user'),
    path('logout/', logout, name='logout'),
    path('try-reset-password/', tryResetPassword, name='try-reset-password'),
    path('reset-password/', resetPassword, name='reset-password'),

    path('get-admin/', getAdmin, name='get-admin'),
    # path('register-user/', registerUser, name='register-user'),
    path('verify-code-admin/', verifyCodeAdmin, name='verify-code-admin'),
    path('login-admin/', loginAdmin, name='login-admin'),
    path('logout-admin/', logoutAdmin, name='logout-admin'),
    path('try-reset-password-admin/', tryResetPasswordAdmin, name='try-reset-password-admin'),
    path('reset-password-admin/', resetPasswordAdmin, name='reset-password-admin'),


]