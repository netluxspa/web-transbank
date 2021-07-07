import { Typography, Button } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useState } from 'react';
import api from '../../../../../../api';
import FormatoEnvioForm from './FormatoEnvioForm';
import AdminHeaders from '../../../../../../globalComponents/adminHeaders.js/AdminHeaders';

const FormatoEnvioEdit = ({go, producto, sendData}) => {

    const [data, setData] = useState(
        {
            producto: producto.id,
            id: producto.formato_envio.id,
            sobre: producto.formato_envio.sobre,
            peso: producto.formato_envio.peso,
            unidades_caja: producto.formato_envio.unidades_caja,
            caja: producto.formato_envio.caja,
            solo_zona: producto.formato_envio.solo_zona,
            caja_detail: producto.formato_envio.caja_detail
        }
    )

    const [apiResilts, setApiResults] = useState(
        {
            successApi: null,
            errorApi: null,
            error505: null
        }
    )

    const [customError, setCustomError] = useState('')



    const customValidate = data => {
        if (data){
            if (!data.sobre){
                if (!data.peso || !data.caja || !data.unidades_caja){
                    return false

                } else {
                    return true
                }
            } else {
                return true
            }
        }
    }


    const recibeData = d =>{
        var newData = {...data}
        const keys = Object.keys(d);
        for (let index = 0; index < keys.length; index++) {
            const key = keys[index];
            newData = {...newData, [key]:d[key]}
        }
        setData(newData)
    }


    const preSave = () => {
        if (customValidate(data)){
            save()
        } else {
            setCustomError('Debe definir un formato de envío')
            setTimeout(() => {
                setCustomError('')
            }, 3000);
        }
    }

    const save = () => {
        const headers = AdminHeaders();
        api.patch('/commerce/formato-envio/' + data.id + '/', 
        data,
        headers
        ).then(
            res=>{
                setApiResults({
                    successApi: true,
                    errorApi: null,
                    error505: null
                })
                sendData(res.data)
            }
        ).catch(err=>{
            if (err && err.response && err.response.data){
                setApiResults({
                    successApi: null,
                    errorApi:  err.response.data,
                    error505: null
                })
            } else {
                setApiResults({
                    successApi: null,
                    errorApi: null,
                    error505: true
                })
            }
            setTimeout(() => {
                setApiResults({
                    successApi: null,
                    errorApi: null,
                    error505: null
                })
            }, 3000);
        })
    }

    const renderErrors = (errors) => {
        const keys = Object.keys(errors)
        return (
            keys.map((k, i)=>(
                <div key={i}>
                    {errors[k].map(e=>(

                        <Alert severity="error">{k} - {e}</Alert>

                    ))}
                </div>
            ))
        )
    }

    const resultsApi = () => {
        const { errorApi, successApi, error505 } = apiResilts; 
        return (
            <div  style={{textAlign:'center'}}>
            {
                errorApi ||  successApi || error505 || customError
                ? 
                <div style={{margin:'10px 0 10px 0'}}>

                    {
                        (()=>{
                            if (errorApi){
                                return(
                                    renderErrors(errorApi)
                                )
                            } else if (error505){
                                return (
                                    <Alert severity="error">Compruebe conexión a internet</Alert>
                                )
                            } else if (successApi){
                                return (
                                    <Alert severity="success">Datos registrados con éxito</Alert>
                                )
                            } else if (customError){
                                return (
                                    <Alert severity="error">{customError}</Alert>
                                )
                            }
                        })()
                    }
                </div>: 
                null
            }
        </div>
        )
        
    }


    const renderButtons = () => {
        return (
            <div
                style={{display:'flex', alignItems: 'center', marginBottom: '30px'}}
            >
                <ArrowBackIosIcon 
                    onClick={()=>go(1)}
                    style={{cursor: 'pointer', color:' rgba(80, 80, 80, 0.9)'}}
                />
                <Button
                    style={{margin: '0 0 0 20px'}}
                    color='primary'
                    variant='contained'
                    size='small'
                    onClick={()=>preSave()}
                >
                    Guardar
                </Button>
               
                
            </div>
        )
        
    }

    const renderRetrun = () => {
        return (
            <div>
                <div>
                    { renderButtons() }
                </div>
                <div
                    style={{margin: '20px 0 0 0'}}
                >
                    {resultsApi()}
                </div>
                <div>
                    <FormatoEnvioForm data={data} sendData={d=>recibeData(d)}/>
                </div>
            </div>
        )
    }


    return (
        renderRetrun()
    )
}

export default FormatoEnvioEdit;