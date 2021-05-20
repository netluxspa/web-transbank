import { ADD_ADMIN_PAGINA, REMOVE_ADMIN_PAGINA } from '../actions/types'


const adminPaginaReducer = (state = null, action) => {

    switch (action.type) {
        case ADD_ADMIN_PAGINA:
            return action.payload;
        case REMOVE_ADMIN_PAGINA:
            return null;
        default:
            return state;
    }
}

export default adminPaginaReducer;