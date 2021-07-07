import ImagenForm from '../imagenForm/ImagenForm'
import './ImagenCreate.css';
import Button from '@material-ui/core/Button';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ADD_IMAGE_PRODUCT, SELECT_ADMIN_PRODUCT_IMAGE } from '../../../../../../actions/types'

import api from '../../../../../../api';

import Alert from '@material-ui/lab/Alert';


const ImagenCreate = ({emitSelected, producto}) => {


    const dispatch = useDispatch()

    dispatch({type: SELECT_ADMIN_PRODUCT_IMAGE, payload: null})

    const [image, setImage] = useState(null);
    const [error, setError] = useState({});
    const [apiError, setApiError] = useState('');
    const [apiSuccess, setApiSuccess] = useState('');


    const createImage = (producto, imagen) => {

        if (validate(producto, imagen)){
            const formData = new FormData();
            formData.append('imagen', imagen.imagen)
            formData.append('descripcion', imagen.descripcion)
            formData.append('producto', producto.id)

            console.log(formData)
            api.post('/commerce/imagen/', 
            formData,
            {headers: {"content-type":'multipart/form-data;boundary=SOME_BOUNDARY', "site":localStorage.getItem('site'), 'adminkey': localStorage.getItem('adminkey')}}
            ).then(res=>{
                console.log('res', res.data)
                dispatch({type: ADD_IMAGE_PRODUCT, payload: res.data})
                setApiSuccess('Imagen cargada con éxito')
                setTimeout(() => {
                    setApiSuccess('')
                    emitSelected(0)
                }, 3000);
            }).catch(err=>{
                setApiError('Ha ocurrido un error al cargar la imagen. Revisa tu conexión a internet.')
                setTimeout(() => {
                    setApiError('')
                }, 3000);
            })
        } else{
            setTimeout(() => {
                    setError({})
            }, 3000);
        }
        

    }

    const validate = (producto, imagen) => {
        if (!producto){
            setError({...error, 'producto':'Debe elegir un producto'})
        }

        if (!imagen || (imagen && !imagen.imagen)) {
            setError({...error, 'imagen':'Debe cargar una imagen'})
        }


        if (!producto || !imagen || (imagen && !imagen.imagen)){
            return false
        } else{
            return true
        }


    } 


    const renderImagenCreate = () => {

        return (
            <div className='gridFormCreateImage'>
                <div>
                    <ImagenForm submitImage={i=>setImage(i)} title='Crear una imagen del producto' volver={()=>emitSelected(0)} />
                </div>
                <div>
                    <div className='supraline' style={{display: 'flex', flexDirection:'column', alignItems:'center', justifyContent: 'center',  margin: '10px 0 0 0'}}>
                        
                    {Object.keys(error).map(e=>(
                         <Alert  severity="error">({e}) - {error[e]}</Alert>
                    ))}

                        <div style={{marginTop:'10px'}}>
                            <Button  
                            onClick={()=>createImage(producto, image)}
                                    variant='contained'
                                    size="small" color="primary"
                                >
                                Guardar
                            </Button>
                    </div>

                   { apiError ? <Alert  severity="error">{apiError}</Alert> : null}
                   { apiSuccess ? <Alert  severity="success">{apiSuccess}</Alert> : null}
                    </div>
                </div>
            </div>
        )

    }

    return renderImagenCreate()
}

export default ImagenCreate;