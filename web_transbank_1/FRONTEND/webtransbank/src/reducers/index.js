import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import carritoReducer from './carritoReducer';
import envioReducer from './envioReducer';
import paginaReducer from './paginaReducer';
import userPaginaReducer from './userPaginaReducer'
import adminPagReducer from './adminPagReducer'

export default combineReducers({
    carrito: carritoReducer,
    envio: envioReducer,
    pagina: paginaReducer,
    userPagina: userPaginaReducer,
    adminPagina: adminPagReducer,
    form: formReducer
});