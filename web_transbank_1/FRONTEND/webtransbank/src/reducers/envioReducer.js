import { ADD_ENVIO, ADD_VALID_ADRESS } from '../actions/types'


const initialState = {

    dataForm: {
        calle: '', 
        numCalle: '',
        ciudad: '',
        detalle: '',
        pais: 'chile',
        numContacto: ''
    },

    validAdress: '',
    lat:'', 
    lng: ''


}

const envioReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_ENVIO:
            return  {...state, dataForm: action.payload};
        case ADD_VALID_ADRESS:
            return  {
                ...state, 
                validAdress: action.payload.validAdress, 
                lng: action.payload.lng, 
                lat: action.payload.lat
            };
        default:
            return state;
    }
}

export default envioReducer;