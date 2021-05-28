from rest_framework import permissions
from .models import Pagina, TokenAdminPagina, TokenUserPagina


class OnlyAdminPerPag(permissions.BasePermission):
    def has_permission(self, request, view):
        if view.action not in ['retrieve', 'list']:
            try:
                pagina = Pagina.objects.get(codigo=request.META.get("HTTP_SITE"))
            except:
                pagina = False 
            
            if pagina:
                try:
                    admin = TokenAdminPagina.objects.get(token=request.META.get("HTTP_ADMINKEY")).adminPagina
                except:
                    admin = False 
                if admin:
                    if pagina.admin == admin:
                        return True 
                    else:
                        return False
                else:
                    return False
            else:
                return False
        else:
            return True




class OnlyCreatePerUserAndListPerUserAndAdminAndRetrievePerAll(permissions.BasePermission):
    def has_permission(self, request, view):
        if view.action =='retrieve':
            print('work retrieve')
            # retringir para pedidos del sitio 
            return True
        elif view.action == 'list':
            print('work list')
            try:
                pagina = Pagina.objects.get(codigo=request.META.get("HTTP_SITE"))
            except:
                pagina = False 
            
            if pagina:
                
                try:
                    admin = TokenAdminPagina.objects.get(token=request.META.get("HTTP_ADMINKEY")).adminPagina
                except:
                    admin = False 
                if admin:
                    
                    if admin == pagina.admin:
                        return True 
                    else:
                        return False
                else:
                    try:
                        user = TokenUserPagina.objects.get(token=request.META.get("HTTP_USERKEY")).userPagina
                    except:
                        user = False 
                    if user:
                        
                        if user.pagina == pagina:
                            
                            try:
                                filter_user = request.GET.get("userPagina")
                            except:
                                filter_user = False 
                            if filter_user:
                                print('work user')
                                if (str(user.id) == str(filter_user)):
                                   
                                    return True 
                                else:
                                    return False
                            else:
                                try:
                                    codigo_seguimiento = request.GET.get('codigo_seguimiento')
                                except:
                                    codigo_seguimiento = False 
                                if codigo_seguimiento:
                                    return True
                                else:
                                    return False

                        else:
                            return False
                    else: 
                        return False

            else:
                return False

       