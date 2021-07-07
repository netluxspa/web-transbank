import { useState } from 'react';

import Button from '@material-ui/core/Button';

import Alert from '@material-ui/lab/Alert';


import { useDispatch } from 'react-redux';

import { ADMIN_ADD_TEXTO_PRODUCTO } from '../../.././../../../actions/types';


import TextoForm from '../textoForm/TextoForm';

import api from '../../../../../../api';


const style = {
    contVolver: {
        borderBottom: 'solid 1px rgba(128, 128, 128, 0.36)',
        padding: '0 0 10px 0'
    },

}


const TextoCreate = ({go, producto}) => {


    const dispatch = useDispatch();


    const [texto, setTexto] = useState('')

    const [apiSuccess, setApiSuccess] = useState('');
    const [apiError, setApiError] = useState({});

    const createTexto = (texto) => {

        const body = {
            texto: texto,
            producto: producto.id
        }

        api.post('/commerce/texto/',
        body,
        {headers: {"content-type":"application/json", "site":localStorage.getItem("site"), "adminkey": localStorage.getItem("adminkey")}}
        ).then(res=>{
            dispatch({type: ADMIN_ADD_TEXTO_PRODUCTO, payload: res.data})
            setApiSuccess('Elemento de texto creado con éxito')
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
            <div style={{display:'flex', margin: '20px 0 0 0'}}>
                <TextoForm sendTexto={t=>setTexto(t)} />
            </div>
            <div  style={{textAlign:'center'}}>
                {apiError ||  apiSuccess ? 
                    <div style={{margin:'10px 0 10px 0'}}>
                        {apiError ? renderErrors(apiError): null}
                        {apiSuccess ?  <Alert severity="success">{apiSuccess}</Alert>: null}
                    </div>: 
                null}

                <div  style={{ margin: '20px 0 0 0'}}>
                    <Button 
                        onClick={()=>createTexto(texto)}
                        variant='contained' 
                        color="primary"
                        size='small'
                    >
                    Guardar
                </Button>
                </div>
            </div>
        </div>
    )
}

export default TextoCreate;