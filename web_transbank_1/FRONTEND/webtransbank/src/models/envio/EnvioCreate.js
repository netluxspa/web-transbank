import EnvioForm from "./EnvioForm";
import { useState } from "react";
import { Button } from "@material-ui/core";
import { Typography } from "@material-ui/core";

import api from "../../api";
import AdminHeaders from "../../globalComponents/adminHeaders.js/AdminHeaders";
import { Alert } from "@material-ui/lab";

const dateToString = date => {
    const transformMonth = month => {
      const number_month = Number(month) + 1;
      var string_month = number_month.toString()
      if (string_month.length < 2){
        string_month = '0' + string_month
      }
      return string_month
    }
    return date.getFullYear() + '-' + transformMonth(date.getMonth()) + '-' + date.getDate()
}



const EnvioCreate = ({match, pedidos, sendData, tiendaId}) => {

    const [data, setData] = useState(
        {
            fecha: dateToString(new Date())
        }
    )

    const  [blockSave, setBlockSave] = useState(false)

    const [apiResults, setApiRresults] = useState(
       { 
            apiSuccess: null,
            apiErrors: null,
       }
    )

    const recibeData = d => {
        var newData = {...data};
        const keys = Object.keys(d)

        for (let index = 0; index < keys.length; index++) {
            const key = keys[index];
            newData = {...newData, [key]:d[key]}
        }
        setData(newData)
    }

    const save = () => {
        setBlockSave(true)
        const body = {...data, tienda: tiendaId, pedidos: pedidos.map(p=>({pedido: p.id}))}
        api.post('/commerce/envio/',
        body,
        AdminHeaders()
        ).then(res=>{
            setApiRresults(
                { 
                    apiSuccess: 'Envio guardado con éxito.',
                    apiErrors: null,
               })
                    sendData(res.data)

              
        }).catch(err=>{
            setBlockSave(false)
            if (err && err.response && err.response.data){
                setApiRresults(
                    { 
                        apiSuccess: null,
                        apiErrors: err.response.data,
                   }
                )
                setTimeout(() => {
                setApiRresults(
                    { 
                        apiSuccess: null,
                        apiErrors: null,
                    }
                )
                }, 3000);
            }else{
                setApiRresults(
                    { 
                        apiSuccess: null,
                        apiErrors: {internet: ['Reviste su conexión a internet.']},
                   }
                )
                setTimeout(() => {
                    setApiRresults(
                        { 
                            apiSuccess: null,
                            apiErrors: null,
                        }
                    )
                }, 3000);
                
            }
        })
    }

    const renderErrors = (errors) => {
        const keys = Object.keys(errors)
        return (
            keys.map((k, i)=>(
                <div  key={i}>
                    {
                    
                    typeof errors[k] !== 'string' ?

                        errors[k].map(e=>(
                            <div>
                                {typeof e === 'string' 
                                ?
                                <Alert align='center' severity="error">{k} - {e}</Alert>
                                :
                                <div>
                                    {renderErrors(e)}
                                </div>
                             }
                            </div>
                         ))
                         :
                         <Alert align='center' severity="error">{k} - {errors[k]}</Alert>
                    }

                   
                </div>
            ))
        )
    }

    const resultsApi = () => {
        const { apiSuccess, apiErrors } = apiResults; 
        return (
            <div>
            {
                apiSuccess ||  apiErrors 
                ? 
                <div style={{margin:'10px 0 10px 0'}}>
                    {
                        apiErrors ? 
                    
                        renderErrors(apiErrors)
                        : 
                        null
                    }
                    {
                        apiSuccess 
                        ?  
                        <Alert severity="success">{apiSuccess}</Alert>
                        : 
                        null
                    }
                </div>: 
                null
            }
        </div>
        )
        
    }

    return (

        <div>
            <div>
                <EnvioForm data={data} sendData={d=>recibeData(d)} />
            </div>
            <div>
                <div
                    style={{margin: '20px 0 0 0', width:`${window.innerWidth > 760 ? '60%' : ''}`}}
                >
                    {resultsApi()}
                </div>
            </div>
            <div>
                <Button
                        disabled = {blockSave}
                        onClick={()=>save()}
                        color='primary'
                        size='small'
                        variant='contained'
                    >
                        Crear envío
                </Button>
            </div>
        </div>

        
    )
}

export default EnvioCreate;