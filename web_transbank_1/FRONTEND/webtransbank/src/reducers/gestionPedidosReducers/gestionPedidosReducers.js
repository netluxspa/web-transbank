import { CLICK_ONE_PEDIDO, CLICK_ALL_PEDIDOS, ADD_PEDIDOS } from '../../actions/types'




const initialState = {
    pedidosPendientes: {
        data: null,
        allSelected: false
    },
}

const gestionPedidosReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_PEDIDOS:
            return {...state, pedidosPendientes: {...state.pedidosPendientes, data:action.payload.map(p=>({...p, checked: false}))}};
        case CLICK_ONE_PEDIDO:
            var pedidos_pendientes = [...state.pedidosPendientes.data];
            const id = action.payload.id;
            const obj = pedidos_pendientes.find(p=>p.id===id)
            if (obj.hasOwnProperty('checked')){
                if (!obj.checked){
                    obj.checked=true
                }else{
                    obj.checked=false
                }
            }else{
                obj.checked = true
            }

            return {...state, pedidosPendientes: {...state.pedidosPendientes, data: pedidos_pendientes, allSelected: false}}

        case CLICK_ALL_PEDIDOS:
                return {
                    ...state, 
                    pedidosPendientes: {
                        data: [...state.pedidosPendientes.data.map(d=>({...d, checked: !state.pedidosPendientes.allSelected}))],
                        allSelected: !state.pedidosPendientes.allSelected
                     }
                    }
        default:
            return state;
    }
}

export default gestionPedidosReducer;