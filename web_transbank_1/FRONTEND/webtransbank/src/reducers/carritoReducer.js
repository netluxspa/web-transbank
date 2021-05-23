import { ADD_CARRITO, REMOVE_CARRITO, REMOVE_ALL_CARRITO } from '../actions/types'
import _ from 'lodash';

// const initialState =  {
//     productos: []
// }

const initialState = () =>{
    if (localStorage.getItem('productos')){
        return JSON.parse(localStorage.getItem('productos'))
    }else{
        return ({})
    }
}

const carritoReducer = (state = initialState(), action) => {

    switch (action.type) {
        case ADD_CARRITO:
            var new_state =  JSON.stringify({...state, [action.payload.producto]:action.payload});
            localStorage.setItem('productos', new_state)
            return  {...state, [action.payload.producto]:action.payload} ;
        case REMOVE_CARRITO:
            localStorage.removeItem('productos')
            localStorage.setItem('productos', JSON.stringify(_.omit(state, action.payload)));
            return _.omit(state, action.payload);
        case REMOVE_ALL_CARRITO:
            return {}
        default:
            return state;
    }
}

export default carritoReducer;