import { SELECT_ADMIN_PRODUCT_IMAGE } from '../../actions/types'



const imagenProductoSelectedReducer = (state = null, action) => {

    switch (action.type) {
        case SELECT_ADMIN_PRODUCT_IMAGE:
            return action.payload;
        default:
            return state;
    }
}

export default imagenProductoSelectedReducer;