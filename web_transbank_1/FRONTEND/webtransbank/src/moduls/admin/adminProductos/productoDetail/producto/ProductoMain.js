import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { SELECT_ADMIN_PRODUCT } from '../../../../../actions/types';

import api from '../../../../../api';

import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import './ProductoMain.css'


const ProductoMain = ({producto}) => {

    const dispatch = useDispatch()

    const [descripcion, setDescripcion] = useState(producto.descripcion)

    const [success, setSuccess] = useState(null)

    const updateDescription = (descripcion) => {
        api.patch('/commerce/producto/' + producto.id + '/', 
            {descripcion: descripcion}, 
            {headers: {'content-type':'application/json', 'site': localStorage.getItem('site'), 'adminkey': localStorage.getItem('adminkey')}}
        ).then(res=>{
            setSuccess(true)
            dispatch({type: SELECT_ADMIN_PRODUCT, payload: res.data})
            setTimeout(() => {
                setSuccess(null)
            }, 3000);
        })
    }
    
    const renderAdminTienda = () => {
        return (
            <div className='adminTiendaGrid'>
                <div>
                    <TextField
                        label="Descripción del producto"
                        value={descripcion}
                        onChange={(e)=>setDescripcion(e.target.value)}
                        variant="outlined"
                        multiline
                        rows={4}
                    />
                </div>
                <div>
                    {/* {error ? <div ><Alert severity="error">{error}</Alert></div>: null} */}
                    {success ? <div ><Alert severity="success">Cambios guardados con exito.</Alert></div>: null}
                </div>
                <div>
                    <div>
                        <Button onClick={()=>updateDescription(descripcion)}  variant='contained' size="small" color="primary">
                            Guardar
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

    return renderAdminTienda();
}

export default ProductoMain;