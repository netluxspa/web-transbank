import { ADD_ENVIO } from '../actions/types'


const initialState = {
    nombre: '', 
    fono: '',
    ciudad: '',
    direccion: '',
    detalle: ''
}

const envioReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_ENVIO:
            console.log(action)
            return {...state, [action.payload.label]: action.payload.value};
        default:
            return state;
    }
}

export default envioReducer;