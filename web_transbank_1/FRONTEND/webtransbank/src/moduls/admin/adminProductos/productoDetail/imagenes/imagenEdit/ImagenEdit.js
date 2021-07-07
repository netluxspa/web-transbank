import { connect } from 'react-redux';
import ImagenForm from '../imagenForm/ImagenForm'
import api from '../../../../../../api';
import '../imagenCreate/ImagenCreate.css';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ADD_IMAGE_PRODUCT, REMOVE_ADMIN_PRODUCT_IMAGE } from '../../../../../../actions/types'

import Button from '@material-ui/core/Button';

import Alert from '@material-ui/lab/Alert';


const ImagenEdit = ({emitSelected, imagenSelected}) => {

    const dispatch = useDispatch()

    const [image, setImage] = useState(null);
    const [error, setError] = useState({});
    const [apiError, setApiError] = useState('');
    const [apiSuccess, setApiSuccess] = useState('');

    const [apiDeleteSucces, setApiDeleteSuccess] = useState('')
    const [apiDeleteError, setApiDeleteError] = useState('')



    const deleteImagen = () => {
        api.delete('/commerce/imagen/' + imagenSelected.id + '/', 
        {headers: {'content-type': 'application/json', 'site': localStorage.getItem('site'), 'adminkey':localStorage.getItem('adminkey')}}
        ).then(res=>{
            setApiDeleteSuccess(true)
            setTimeout(() => {
                setApiDeleteSuccess(false)
                dispatch({type: REMOVE_ADMIN_PRODUCT_IMAGE, payload: imagenSelected})
                emitSelected(0)
            }, 3000);
        }).catch(err=>{
            setApiDeleteError(true)
            setTimeout(() => {
                setApiDeleteError(false)
            }, 3000);
        })
    }



    const editImage = (imagen) => {

        if (true){
            const formData = new FormData();
            if (imagen && imagen.imagen){
                formData.append('imagen', imagen.imagen)
            }
            formData.append('descripcion', imagen.descripcion)
            formData.append('producto', imagenSelected.producto)

            console.log(formData)
            api.patch('/commerce/imagen/' + imagenSelected.id + '/', 
            formData,
            {headers: {"content-type":'multipart/form-data;boundary=SOME_BOUNDARY', "site":localStorage.getItem('site'), 'adminkey': localStorage.getItem('adminkey')}}
            ).then(res=>{
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


    const validate = (imagen) => {

        if (!imagen || (imagen && !imagen.imagen)) {
            setError({...error, 'imagen':'Debe cargar una imagen'})
        }

        if (!imagen || (imagen && !imagen.imagen)){
            return false
        } else{
            return true
        }


    } 






    const renderImagenUpdate = () => {

        return (
            <div className='gridFormCreateImage'>
                <div>
                    <ImagenForm deleteImagen={()=>deleteImagen()} submitImage={i=>setImage(i)} title='Modificar una imagen del producto' volver={()=>emitSelected(0)} />
                </div>
                <div>
                    <div className='supraline' style={{display: 'flex', flexDirection:'column', alignItems:'center', justifyContent: 'center',  margin: '10px 0 0 0'}}>
                        
                    {Object.keys(error).map(e=>(
                         <Alert  severity="error">({e}) - {error[e]}</Alert>
                    ))}
  { apiError ? <Alert  severity="error">{apiError}</Alert> : null}
                   { apiSuccess ? <Alert  severity="success">{apiSuccess}</Alert> : null}
                        <div style={{marginTop:'10px'}}>
                            <Button  
                            onClick={()=>editImage(image)}
                                    variant='contained'
                                    size="small" color="primary"
                                >
                                Guardar
                            </Button>
                    </div>

                 
                    </div>
                </div>
            </div>
        )

    }

    if (apiDeleteSucces){
        return <Alert severity="success">La imagen se ha eliminado con exito.</Alert>
    } else if (apiDeleteError){
        return <Alert severity="error">La imagen no se pudo eliminar.</Alert>
    } else{
        return renderImagenUpdate();
    }

    
}


const mapStateToProps = state => {
    return {
        imagenSelected: state.imagenProductoAdmin
    }
}
export default connect(mapStateToProps, {})(ImagenEdit);