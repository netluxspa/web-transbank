import { useState } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Alert from '@material-ui/lab/Alert';



import { useDispatch } from 'react-redux';

import { 
    ADMIN_ADD_PARRAFO_TEXTO_PRODUCTO
} from '../../../../../../../actions/types'

import api from '../../../../../../../api';

import ParrafoForm from '../parrafoForm/ParrafoForm';




const ParrafoCreate = ({go, texto}) => {

    const dispatch = useDispatch();

    const [parrafo, setParrafo] = useState('')

    const [successApi, setSuccessApi] = useState(null)
    const [errorApi, setErrorApi] = useState(null)

    const createParrafo = () => {

        const body = {
            texto: texto.id, 
            parrafo: parrafo
        }

        api.post('/commerce/parrafo/', 
        body, 
        {headers: {"content-type":"application/json", "site":localStorage.getItem("site"), "adminkey": localStorage.getItem("adminkey")}}
        ).then(res=>{
            dispatch({
                type: ADMIN_ADD_PARRAFO_TEXTO_PRODUCTO,
                payload: res.data
            })
            setSuccessApi('Párrafo creado con exito')
            setErrorApi(false)
            setTimeout(() => {
                go(1)
            }, 2000);
        }).catch(err=>{
            // setSuccessApi(false)
            console.log(err.response)
            if(err && err.response && err.response.data){
                setErrorApi(err.response.data)

            } else {
                setErrorApi({'error_inesperado': ['Compruebe conexión a internet']})
            }
            setTimeout(() => {
                console.log('wooooooooooork')
                setErrorApi(null)
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
            <div>
                <ParrafoForm sendParrafo={p=>setParrafo(p)} />
            </div>
            {   errorApi || successApi ? 
                <div style={{margin:'20px 0'}}>
                    {errorApi ? renderErrors(errorApi):null}
                     {successApi ?
                        <Alert severity='success'>{successApi}</Alert>
                        :
                        null
                    }
                </div>
                :
                null

            }
            <div style={{margin:'20px 0', textAlign:'center'}}>
                <Button size='small' color='primary' variant='contained' onClick={()=>createParrafo()}>Guardar</Button>
            </div>
        </div>
    ) 
    
}

export default ParrafoCreate;