import { combineReducers } from 'redux';
import carritoReducer from './carritoReducer';

export default combineReducers({
    carrito: carritoReducer
});