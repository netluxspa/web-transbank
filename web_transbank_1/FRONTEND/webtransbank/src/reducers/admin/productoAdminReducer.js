import { 
    SELECT_ADMIN_PRODUCT, 
    ADD_IMAGE_PRODUCT, 
    REMOVE_ADMIN_PRODUCT_IMAGE,
    ADMIN_ADD_TEXTO_PRODUCTO,
    ADMIN_REMOVE_TEXTO_PRODUCTO,
    ADMIN_UPDATE_TEXTO_PRODUCTO,
    ADMIN_ADD_PARRAFO_TEXTO_PRODUCTO,
    ADMIN_REMOVE_PARRAFO_TEXTO_PRODUCTO,
    ADMIN_UPDATE_PARRAFO_TEXTO_PRODUCTO
} from '../../actions/types'



const productoAdminReducer = (state = null, action) => {

    switch (action.type) {
        case SELECT_ADMIN_PRODUCT:
            return action.payload;
        case ADD_IMAGE_PRODUCT:
            if(state.imagenes.find(i=>i.id===action.payload.id)){
                var imagenes = [...state.imagenes]
                var obj = imagenes.find(i=>i.id===action.payload.id)
                var pos = imagenes.indexOf(obj)
                imagenes[pos] = action.payload
                return {...state,  imagenes: imagenes };
            }else{
                return {...state,  imagenes: [...state.imagenes, action.payload] };
            }
        case REMOVE_ADMIN_PRODUCT_IMAGE:
            if(state.imagenes.find(i=>i.id===action.payload.id)){
                var imagenes = [...state.imagenes]
                var imagenes = imagenes.filter(i=>i.id!==action.payload.id)
                return {...state,  imagenes: imagenes };
            }else{
                return state;
            }

        case ADMIN_ADD_TEXTO_PRODUCTO:
            return {...state,  textos: [...state.textos, action.payload] } 

        case ADMIN_REMOVE_TEXTO_PRODUCTO:
            var textos = [...state.textos]
            var textos = textos.filter(i=>i.id!==action.payload.id)
            return {...state,  textos: textos };

        case ADMIN_UPDATE_TEXTO_PRODUCTO:
            var textos = [...state.textos]
            var obj = textos.find(i=>i.id===action.payload.id)
            var pos = textos.indexOf(obj)
            textos[pos] = action.payload
            return {...state,  textos: textos };
            

        case ADMIN_UPDATE_PARRAFO_TEXTO_PRODUCTO:
            var textos = [...state.textos]
            var obj_texto = textos.find(i=>i.id===action.payload.texto)
            var obj_parrafo = obj_texto.parrafos.find(p=>p.id === action.payload.id)
            var pos_parrafo = obj_texto.parrafos.indexOf(obj_parrafo)
            obj_texto.parrafos[pos_parrafo] = action.payload
            return {...state,  textos: textos };

        case ADMIN_REMOVE_PARRAFO_TEXTO_PRODUCTO:
            var textos = [...state.textos]
            var obj_texto = textos.find(i=>i.id===action.payload.texto)
            obj_texto.parrafos = obj_texto.parrafos.filter(p=>p.id !== action.payload.id)
            return {...state,  textos: textos };

        case ADMIN_ADD_PARRAFO_TEXTO_PRODUCTO:
            var textos = [...state.textos]
            var obj_texto = textos.find(i=>i.id===action.payload.texto)
            obj_texto.parrafos.push(action.payload)
            return {...state,  textos: textos };
        default:
            return state;
    }
}

export default productoAdminReducer;