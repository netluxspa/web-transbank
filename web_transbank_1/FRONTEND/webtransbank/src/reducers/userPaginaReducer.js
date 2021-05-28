import { ADD_USER_PAGINA, REMOVE_USER_PAGINA } from '../actions/types'


const userPaginaReducer = (state = {}, action) => {

    switch (action.type) {
        case ADD_USER_PAGINA:
            return action.payload;
        case REMOVE_USER_PAGINA:
            return null;
        default:
            return state;
    }
}

export default userPaginaReducer;