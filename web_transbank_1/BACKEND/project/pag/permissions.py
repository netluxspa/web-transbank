from rest_framework import permissions
from .models import Pagina, TokenAdminPagina


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

           