import { ADD_PAGINA } from '../actions/types'



const paginaReducer = (state = null, action) => {

    switch (action.type) {
        case ADD_PAGINA:
            return action.payload;
        default:
            return state;
    }
}

export default paginaReducer;