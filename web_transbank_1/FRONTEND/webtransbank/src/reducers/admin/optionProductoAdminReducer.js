import { SELECT_ADMIN_PRODUCT_OPTION } from '../../actions/types'



const optionProductoAdminReducer = (state = null, action) => {

    switch (action.type) {
        case SELECT_ADMIN_PRODUCT_OPTION:
            return action.payload;
        default:
            return state;
    }
}

export default optionProductoAdminReducer;