import { ADD_ENVIO, ADD_VALID_ADRESS } from '../actions/types'


const initialState = () =>{
    if (localStorage.getItem('envio')){
        return JSON.parse(localStorage.getItem('envio'))
    }else{
        return initialStateBase
    }
}


const initialStateBase = {

    dataForm: {
        calle: '', 
        numCalle: '',
        ciudad: '',
        detalle: '',
        pais: 'chile',
        numContacto: '',
        nombreReceptor: '',
    },

    validAdress: '',
    lat:'', 
    lng: ''


}

const envioReducer = (state = initialState(), action) => {

    switch (action.type) {
        case ADD_ENVIO:
            var newState = {...state, dataForm: action.payload};
            localStorage.setItem('envio', JSON.stringify(newState))
            return  newState;
        case ADD_VALID_ADRESS:
            var newState = {
                ...state, 
                validAdress: action.payload.validAdress, 
                lng: action.payload.lng, 
                lat: action.payload.lat
            };
            localStorage.setItem('envio', JSON.stringify(newState))
            return  newState;
        default:
            return state;
    }
}

export default envioReducer;