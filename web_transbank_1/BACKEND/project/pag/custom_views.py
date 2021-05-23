from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from .models import *
from django.conf import settings
from .serializers import *
from django.core.mail import send_mail
from django.contrib.auth.hashers import check_password

@api_view(['GET'])
def getUser(request):
    token = request.META.get('HTTP_USERKEY')
    pagina = request.META.get('HTTP_SITE')
    try:
        user = TokenUserPagina.objects.get(token=token).userPagina
        if (user.pagina.codigo == pagina):
            user_serializer = UserPaginaSerializer(user)
            return Response(user_serializer.data)
        else:
            return Response('usuario no autorizado', status=status.HTTP_403_FORBIDDEN) 
    except:
        return Response('usuario no autorizado', status=status.HTTP_403_FORBIDDEN)


def sendActivationCode(user):
    try:
        code_activation = CodeVerificationUser.objects.get(userPagina=user)
    except:
        code_activation = CodeVerificationUser.objects.create(userPagina=user)
        code_activation.save()
    if code_activation:
        subject = 'Codigo de activación'
        mensaje = str(code_activation.code)
        email_from = settings.EMAIL_HOST_USER
        recipient_list = [user.email]

        try:
            send_mail(subject, mensaje, email_from, recipient_list)
            return {"status": True, "error":"ok"}
        except:
            return {"status": False, "error":"Error con el correo"}



@api_view(['POST'])
def registerUser(request):
    user_request = request.data
    try:
        user_db = UserPagina.objects.get(email=user_request["email"])
    except:
        user_db = False
    if user_db:
        if user_db.is_active == False:
            print('here')
            user_db.password = user_request["password"]
            user_db.save()
            sendCode = sendActivationCode(user_db)
            if sendCode["status"]:
                return Response({'message': 'Hemos enviado el codigo de activación al correo ' + user_db.email})
            else:
                return Response({'error': sendCode["error"]}, status=status.HTTP_400_BAD_REQUEST)
            
    serializer = UserPaginaSerializer(data=user_request)
    if serializer.is_valid():
        serializer.save()
        new_user = UserPagina.objects.get(pk=serializer.data["id"])
        sendActivationCode(new_user)
        return Response({'message': 'Hemos enviado el codigo de activación al correo ' + new_user.email})
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
def verifyCode(request):
    email = request.data["email"]
    code = request.data["code"]
    try:
        user = UserPagina.objects.get(email=email)
    except:
        user = False
    if user:
        try:
            code_db = CodeVerificationUser.objects.get(userPagina=user)
            print('CODEEEE', code_db)
        except: 
            code_db = False
        if code_db:
            if (str(code_db.code) == code):
                try:
                    old_keyuser = TokenUserPagina.objects.get(userPagina=user)
                except:
                    old_keyuser = False
                if old_keyuser:
                    old_keyuser.delete()
                new_keyuser = TokenUserPagina.objects.create(userPagina=user)
                new_keyuser.save()
                user.is_active = True
                user.save()
                code_db.delete()
                return Response({'keyuser': new_keyuser.token})
            else:
                return Response({'error': 'Código incorrecto'}, status=status.HTTP_400_BAD_REQUEST)   
        else:
            return Response({'error': 'Código no encontrado'}, status=status.HTTP_400_BAD_REQUEST)           
    else:
        return Response({'error': 'Usuario no encontrado'}, status=status.HTTP_400_BAD_REQUEST)              




@api_view(['POST'])
def loginUser(request):

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
                user = UserPagina.objects.get(email=email, pagina=pagina)
            except:
                user = False 
            if user:
                if user.is_active:
                    if check_password(password, user.password):
                        try:
                            userkey = TokenUserPagina.objects.get(userPagina=user)
                        except:
                            userkey = False
                        if userkey:
                            return Response({'userkey': userkey.token})
                        else:
                            new_userkey = TokenUserPagina.objects.create(userPagina=user)
                            new_userkey.save()
                            return Response({'userkey': new_userkey.token})
                    else:
                        return Response({'error': 'Clave incorrecta'}, status=status.HTTP_400_BAD_REQUEST)
                else:
                    return Response({'error': 'No está registrado. Regístrese'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'error': 'No está registrado. Regístrese'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': 'Debe ingresar un usuario y contraseña'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'error': 'Error de sistema'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def logout(request):
    try:
        pagina = Pagina.objects.get(pk=request.META.get('HTTP_SITE'))
    except: 
        pagina = False
    try:
        token = TokenUserPagina.objects.get(token=request.META.get('HTTP_USERKEY'))
    except:
        token = False
    
    if pagina:
        if token:
            user = token.userPagina
            if user.pagina.codigo == pagina.codigo:
                token.delete()  
                return Response({'response', 'Sesión cerrada con éxito'})

            else:
                return Response({'error': 'Usuario no encontrado'}, status=status.HTTP_400_BAD_REQUEST)

        else:
            return Response({'error': 'Usuario no encontrado'}, status=status.HTTP_400_BAD_REQUEST)

    else:
        return Response({'error': 'Error de sistema'}, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
def tryResetPassword(request):
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
                user = UserPagina.objects.get(email=email, pagina=pagina)
            except:
                user = False
            if user:
                try:
                    old_code = CodeVerificationUser.objects.get(userPagina=user)
                except:
                    old_code = False
                if old_code:
                    old_code.delete()
                new_code = CodeVerificationUser.objects.create(userPagina=user)
                new_code.save()
                sendActivationCode(user)
                return Response({'message': 'Hemos enviado el codigo de activación al correo ' + user.email})
            else:
                return Response({'error': 'Este correo no está registrado'}, status= status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': 'Ingrese un correo'}, status= status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'error': 'Error de sistema'}, status= status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def resetPassword(request):
    try:
        pagina = Pagina.objects.get(codigo=request.META.get('HTTP_SITE'))
    except:
        pagina = False
    try:
        token = TokenUserPagina.objects.get(token=request.META.get('HTTP_USERKEY'))
    except:
        token = False 
    try:
        password = request.data["password"]
    except:
        password = False 

    if pagina:
        if token:
            user = token.userPagina
            if user.pagina.codigo == pagina.codigo:
                user.password = password
                user.save()
                return Response({'message':'Clave actualizada.'})
            else:
                return Response({'error': 'Error de autenticación'})
        else:
            return Response({'error': 'Error de autenticación'})
    else:
        return Response({'error': 'Error del sistema'}, status= status.HTTP_400_BAD_REQUEST)