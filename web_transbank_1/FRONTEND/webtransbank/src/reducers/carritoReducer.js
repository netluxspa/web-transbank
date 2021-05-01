import { GET_CARRITO, ADD_CARRITO } from '../actions/types'

// const initialState =  {
//     productos: []
// }

const initialState = () =>{
    if (localStorage.getItem('productos')){
        return JSON.parse(localStorage.getItem('productos'))
    }else{
        return ({productos: []})
    }
}

const carritoReducer = (state = initialState(), action) => {

    switch (action.type) {
        case GET_CARRITO:
            return action.payload;
        case ADD_CARRITO:
            const productos = JSON.stringify({productos: [...state.productos, action.payload]})
            localStorage.setItem('productos', productos);
            return  {...state, productos: [...state.productos, action.payload]} ;
        default:
            return state;
    }
}

export default carritoReducer;