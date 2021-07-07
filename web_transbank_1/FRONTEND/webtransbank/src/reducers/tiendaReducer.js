import { ADD_TIENDA } from '../actions/types'



const tiendaReducer = (state = null, action) => {

    switch (action.type) {
        case ADD_TIENDA:
            return action.payload;
        default:
            return state;
    }
}

export default tiendaReducer;