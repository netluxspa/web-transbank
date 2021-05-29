import { SELECT_ADMIN_PRODUCT } from '../../actions/types'



const productoAdminReducer = (state = null, action) => {

    switch (action.type) {
        case SELECT_ADMIN_PRODUCT:
            return action.payload;
        default:
            return state;
    }
}

export default productoAdminReducer;