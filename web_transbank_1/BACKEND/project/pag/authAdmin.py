from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from .models import *
from django.conf import settings
from .serializers import *
from django.core.mail import send_mail
from django.contrib.auth.hashers import check_password


@api_view(['GET'])
def getAdmin(request):

    try:
        admin = TokenAdminPagina.objects.get(token=request.META.get('HTTP_ADMINKEY')).adminPagina
    except :
        admin = False

    if admin:
        try:
            pagina = Pagina.objects.get(codigo=request.META.get('HTTP_SITE'))
        except:
            pagina = False 
        if pagina:
            if admin == pagina.admin:
                admin_serializer = AdminPaginaSerializer(admin)
                return Response(admin_serializer.data)
            else:
                return Response('usuario no autorizado', status=status.HTTP_403_FORBIDDEN)

    else:
        return Response('usuario no encontrado', status=status.HTTP_403_FORBIDDEN)




def sendActivationCode(admin):
    try:
        code_activation = CodeVerificationAdmin.objects.get(adminPagina=admin)
    except:
        code_activation = CodeVerificationAdmin.objects.create(adminPagina=admin)
        code_activation.save()
    if code_activation:
        subject = 'Codigo de activación'
        mensaje = str(code_activation.code)
        email_from = settings.EMAIL_HOST_USER
        recipient_list = [admin.email]
        send_mail(subject, mensaje, email_from, recipient_list)

# DESACTIVADA POR AHORA  REGISTRO MANUAL
@api_view(['POST'])
def registerAdmin(request):
    user_request = request.data
    try:
        user_db = UserPagina.objects.get(email=user_request["email"])
    except:
        user_db = False
    if user_db:
        if user_db.is_active == False:
            user_db.password = user_request["password"]
            user_db.save()
            sendActivationCode(user_db)
            return Response({'message': 'Hemos enviado el codigo de activación al correo ' + user_db.email})
    serializer = UserPaginaSerializer(data=user_request)
    if serializer.is_valid():
        serializer.save()
        new_user = UserPagina.objects.get(pk=serializer.data["id"])
        sendActivationCode(new_user)
        return Response({'message': 'Hemos enviado el codigo de activación al correo ' + new_user.email})
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
def verifyCodeAdmin(request):
    email = request.data["email"]
    code = request.data["code"]
    try:
        admin = AdminPagina.objects.get(email=email)
    except:
        admin = False
    if admin:
        try:
            code_db = CodeVerificationAdmin.objects.get(adminPagina=admin)
        except: 
            code_db = False
        if code_db:
            if (str(code_db.code) == code):
                try:
                    old_keyadmin = TokenAdminPagina.objects.get(adminPagina=admin)
                except:
                    old_keyadmin = False
                if old_keyadmin:
                    old_keyadmin.delete()
                new_keyadmin = TokenAdminPagina.objects.create(adminPagina=admin)
                new_keyadmin.save()
                admin.is_active = True
                admin.save()
                code_db.delete()
                return Response({'adminkey': new_keyadmin.token})
            else:
                return Response({'error': 'Código incorrecto'}, status=status.HTTP_400_BAD_REQUEST)   
        else:
            return Response({'error': 'Código no encontrado'}, status=status.HTTP_400_BAD_REQUEST)           
    else:
        return Response({'error': 'Usuario no encontrado'}, status=status.HTTP_400_BAD_REQUEST)              




@api_view(['POST'])
def loginAdmin(request):


    try:
        email = request.data["email"]
    except:
        email = False
    try:
        password = request.data["password"]
    except:
        password = False
    try:
        pagina = Pagina.objects.get(pk=request.META.get('HTTP_SITE'))
    except:
        pagina = False
    if pagina:
        if email and password:
            try:
                admin = AdminPagina.objects.get(email=email)
            except:
                admin = False 
            if admin:
                if pagina.admin == admin:
                    if admin.is_active:
                        if check_password(password, admin.password):
                            try:
                                adminkey = TokenAdminPagina.objects.get(adminPagina=admin)
                            except:
                                adminkey = False
                            if adminkey:
                                return Response({'adminkey': adminkey.token})
                            else:
                                new_adminkey = TokenAdminPagina.objects.create(adminPagina=admin)
                                new_adminkey.save()
                                return Response({'adminkey': new_adminkey.token})
                        else:
                            return Response({'error': 'Clave incorrecta'}, status=status.HTTP_400_BAD_REQUEST)
                    else:
                        return Response({'error': 'No está registrado. '}, status=status.HTTP_400_BAD_REQUEST)

                else:
                    return Response({'error':'usuario no autorizado'}, status=status.HTTP_403_FORBIDDEN)

            else:
                return Response({'error': 'No está registrado. '}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': 'Debe ingresar un usuario y contraseña'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'error': 'Error de sistema'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def logoutAdmin(request):
    try:
        pagina = Pagina.objects.get(pk=request.META.get('HTTP_SITE'))
    except: 
        pagina = False
    try:
        token = TokenAdminPagina.objects.get(token=request.META.get('HTTP_ADMINKEY'))
    except:
        token = False
    
    if pagina:
        if token:
            admin = token.adminPagina
            if admin == pagina.admin:
                token.delete()  
                return Response({'response', 'Sesión cerrada con éxito'})

            else:
                return Response({'error': 'Usuario no autorizado'}, status=status.HTTP_400_BAD_REQUEST)

        else:
            return Response({'error': 'Usuario no encontrado'}, status=status.HTTP_400_BAD_REQUEST)

    else:
        return Response({'error': 'Error de sistema'}, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
def tryResetPasswordAdmin(request):
  
    try:
        email = request.data["email"]
    except:
        email = False
    try:
        pagina = Pagina.objects.get(codigo=request.META.get('HTTP_SITE'))
    except:
        pagina = False
    
    if pagina:
        if email:
            try:
                admin = AdminPagina.objects.get(email=email)
            except:
                admin = False
            if admin:

                if pagina.admin == admin:
                    try:
                        old_code = CodeVerificationAdmin.objects.get(adminPagina=admin)
                    except:
                        old_code = False
                    if old_code:
                        old_code.delete()
                    new_code = CodeVerificationAdmin.objects.create(adminPagina=admin)
                    new_code.save()
                    sendActivationCode(admin)
                    return Response({'message': 'Hemos enviado el codigo de activación al correo ' + admin.email})
                else:
                    return Response({'error': 'Usuario no autorizado'}, status=status.HTTP_403_FORBIDDEN)

                
            else:
                return Response({'error': 'Este correo no está registrado'}, status= status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': 'Ingrese un correo'}, status= status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'error': 'Error de sistema'}, status= status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def resetPasswordAdmin(request):
    try:
        pagina = Pagina.objects.get(codigo=request.META.get('HTTP_SITE'))
    except:
        pagina = False
    try:
        token = TokenAdminPagina.objects.get(token=request.META.get('HTTP_ADMINKEY'))
    except:
        token = False 
    try:
        password = request.data["password"]
    except:
        password = False 

    if pagina:
        if token:
            admin = token.adminPagina
            if admin == pagina.admin:
                admin.password = password
                admin.save()
                return Response({'message':'Clave actualizada.'})
            else:
                return Response({'error': 'Error de autenticación'})
        else:
            return Response({'error': 'Error de autenticación'}, status=status.HTTP_403_FORBIDDEN)
    else:
        return Response({'error': 'Error del sistema'}, status= status.HTTP_400_BAD_REQUEST)