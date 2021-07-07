import api from '../../../../../../../api';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Alert from '@material-ui/lab/Alert';

import { useState } from 'react';

import { useDispatch } from 'react-redux';


import { 
    ADMIN_UPDATE_PARRAFO_TEXTO_PRODUCTO, 
    ADMIN_REMOVE_PARRAFO_TEXTO_PRODUCTO, 
} from '../../../../../../../actions/types'


import ParrafoForm from '../parrafoForm/ParrafoForm';


const ParrafoEdit = ({go, parrafo}) => {

    const dispatch = useDispatch();

    const [newParrafo, setNewParrafo] = useState(parrafo.parrafo)

    const [openDelete, setOpenDelete] = useState(false);

    const [apiSuccess, setApiSuccess] = useState('');
    const [apiError, setApiError] = useState({});

    const [apiDeleteError, setApiDeleteError] = useState('')
    const [apiDeleteSuccess, setApiDeleteSuccess] = useState('')



    const updateParrafo = () => {

        const body = {
            parrafo: newParrafo
        }

        api.patch('/commerce/parrafo/' + parrafo.id + '/', 
        body, 
        {headers: {"content-type":"application/json", "site":localStorage.getItem("site"), "adminkey": localStorage.getItem("adminkey")}}
        ).then(res=>{
            dispatch({
                type: ADMIN_UPDATE_PARRAFO_TEXTO_PRODUCTO,
                payload: res.data
            })
            setApiSuccess('Párrafo actualizado con éxito')
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


    const deleteParrafo = () => {
        api.delete('/commerce/parrafo/' + parrafo.id + '/', 
        {headers: {"content-type":"application/json", "site":localStorage.getItem("site"), "adminkey": localStorage.getItem("adminkey")}}
        ).then(res=>{
            dispatch({
                type: ADMIN_REMOVE_PARRAFO_TEXTO_PRODUCTO,
                payload: parrafo
            })
            setApiDeleteError('')
            setApiDeleteSuccess('El parrafo ha sido eliminado con exito.')
            setTimeout(() => {
                go(1)
            }, 2000);
        })
    }


    const renderErrors = (errors) => {
        const keys = Object.keys(errors)
        console.log(keys)
        return (
        keys.map(k=>(
            <div>
                {errors[k].map((e,i)=>(

                    <Alert key={i} severity="error">{k} - {e}</Alert>

                ))} 
            </div>
        ))
        )
    }

    


    return(
        <div>
            <div style={{borderBottom:'solid 1px rgba(128, 128, 128, 0.36)', padding: '0 0 10px 0', margin:'0 0 20px 0'}}>
                <Button onClick={()=>go(1)} size='small' variant='outlined' color='primary'>Volver</Button>
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
                <Alert severity='error'>¿Está segura que desea eliminar el parrafo?
                
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
                    onClick={()=>deleteParrafo()}
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
                <ParrafoForm parrafo={newParrafo} sendParrafo={p=>setNewParrafo(p)} />
            </div>

            <div style={{textAlign:'center'}}>
                <br></br>

                {apiError ? renderErrors(apiError): null}
                {apiSuccess ?  <Alert severity="success">{apiSuccess}</Alert>: null}

                <br></br>

                <Button 
                    onClick={()=>updateParrafo()}
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

export default ParrafoEdit;