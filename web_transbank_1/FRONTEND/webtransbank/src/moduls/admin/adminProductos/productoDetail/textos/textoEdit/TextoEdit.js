import { useState } from 'react';

import { useDispatch } from 'react-redux';

import Alert from '@material-ui/lab/Alert';


import { ADMIN_REMOVE_TEXTO_PRODUCTO, ADMIN_UPDATE_TEXTO_PRODUCTO } from '../../.././../../../actions/types';

import TextoForm from '../textoForm/TextoForm';

import api from '../../../../../../api';

import Button from '@material-ui/core/Button';

const style = {
    contVolver: {
        borderBottom: 'solid 1px rgba(128, 128, 128, 0.36)',
        padding: '0 0 10px 0'
    },

}

const TextoEdit = ({go, texto}) => {

    const dispatch = useDispatch();

    const [newTexto, setNewTexto] = useState(texto.texto)

    const [openDelete, setOpenDelete] = useState(false);

    const [apiSuccess, setApiSuccess] = useState('');
    const [apiError, setApiError] = useState({});

    const [apiDeleteError, setApiDeleteError] = useState('')
    const [apiDeleteSuccess, setApiDeleteSuccess] = useState('')


    const updateTexto = (texto, id) => {

        const body = {
            texto: texto,
        }

        api.patch('/commerce/texto/' + id + '/',
        body,
        {headers: {"content-type":"application/json", "site":localStorage.getItem("site"), "adminkey": localStorage.getItem("adminkey")}}
        ).then(res=>{
            dispatch({type: ADMIN_UPDATE_TEXTO_PRODUCTO, payload: res.data})
            setApiSuccess('Elemento de texto actualizado con éxito')
            setApiError({})
            setTimeout(() => {
                go(1)
            }, 2000);
        }).catch(err=>{
            if(err && err.response && err.response.data){
            setApiError(err.response.data)
            setApiSuccess('')
        }
        })
    }

    const deleteTexto = (id) => {
        api.delete('/commerce/texto/'+ id +'/',
        {headers: {"content-type":"application/json", "site":localStorage.getItem("site"), "adminkey": localStorage.getItem("adminkey")}}
        ).then(()=>{
            dispatch({type: ADMIN_REMOVE_TEXTO_PRODUCTO, payload: {id: id}})
            setApiDeleteError('')
            setApiDeleteSuccess('El texto ha sido eliminado con exito.')
            setTimeout(() => {
                go(1)
            }, 2000);
        }).catch(err=>{
            setApiDeleteError('No se pudo eliminar el texto.')
            setApiDeleteSuccess('')
        })
    }
    
    const renderErrors = (errors) => {
        const keys = Object.keys(errors)
        console.log(keys)
        return (
        keys.map(k=>(
            <div>
                {errors[k].map(e=>(

                    <Alert severity="error">{k} - {e}</Alert>

                ))}
            </div>
        ))
        )
    }



    return (
        <div>
            <div style={style.contVolver}>
                <Button 
                    onClick={()=>go(1)}
                    variant='outlined' 
                    color="primary"
                    size='small'
                >
                    Volver
                </Button>
            </div>
            {!openDelete ? <div  style={{textAlign:'right'}}>
                <br></br>
                <Button 
                    onClick={()=>setOpenDelete(true)}
                    variant='contained' 
                    color="secondary"
                    size='small'
                >
                    eliminar
                </Button>
                <br></br>
                <br></br>
            </div>: null}
            {openDelete ? <div >
                <br></br>
                <Alert severity='error'>¿Está segura que desea eliminar el elemento de texto y su contenido?
                
                {apiDeleteError ? 
                    <div style={{margin: '10px 0 10px 0'}}>
                        <Alert severity='error'>{apiDeleteError}</Alert>
                     </div> :
                     null    
                    }
                    {apiDeleteSuccess ? 
                    <div style={{margin: '10px 0 10px 0'}}>
                        <Alert severity='success'>{apiDeleteSuccess}</Alert>
                     </div> :
                     null    
                    }
                
                <div style={{display:'flex', margin: '10px 0 0 0'}}>

                <Button 
                    onClick={()=>setOpenDelete(false)}
                    variant='outlined' 
                    color="primary"
                    size='small'
                >
                    Cancelar
                </Button>
                <Button 
                    style={{margin: '0 0 0 10px'}}
                    onClick={()=>deleteTexto(texto.id)}
                    variant='contained' 
                    color="secondary"
                    size='small'
                >
                    eliminar
                </Button>
                </div>
                </Alert>
                <br></br>
                <br></br>
            </div>: null}
            <div>
                <TextoForm texto={newTexto} sendTexto={t=>setNewTexto(t)} />
            </div>
            <div style={{textAlign:'center'}}>
            
                <br></br>

                {apiError ? renderErrors(apiError): null}
                {apiSuccess ?  <Alert severity="success">{apiSuccess}</Alert>: null}

                <br></br>

                <Button 
                    onClick={()=>updateTexto(newTexto, texto.id)}
                    variant='contained' 
                    color="primary"
                    size='small'
                >
                    Guardar
                </Button>
            </div>
        </div>
    )
}

export default TextoEdit;