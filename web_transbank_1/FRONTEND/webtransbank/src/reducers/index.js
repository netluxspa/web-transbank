import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import carritoReducer from './carritoReducer';
import envioReducer from './envioReducer';
import paginaReducer from './paginaReducer';
import userPaginaReducer from './userPaginaReducer'
import adminPagReducer from './adminPagReducer'
import productoAdminReducer from './admin/productoAdminReducer';
import imagenProductoSelectedReducer from './admin/imagenProductoSelectedReducer';
import optionProductoAdminReducer from './admin/optionProductoAdminReducer';
import tiendaReducer from './tiendaReducer';
import gestionPedidosReducer from './gestionPedidosReducers/gestionPedidosReducers';


export default combineReducers({
    carrito: carritoReducer,
    adress: envioReducer,
    pagina: paginaReducer,
    tienda: tiendaReducer,
    userPagina: userPaginaReducer,
    adminPagina: adminPagReducer,
    productoAdmin: productoAdminReducer,
    imagenProductoAdmin: imagenProductoSelectedReducer,
    optionProductoAdmin: optionProductoAdminReducer,
    gestionPedidos: gestionPedidosReducer,
    form: formReducer
});