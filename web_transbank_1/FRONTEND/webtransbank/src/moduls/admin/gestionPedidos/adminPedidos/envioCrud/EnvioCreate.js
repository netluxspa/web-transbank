import EnvioForm from "./EnvioForm";
import { useState } from "react";
import { Button } from "@material-ui/core";
import { Typography } from "@material-ui/core";

import api from "../../../../../api";
import AdminHeaders from "../../../../../globalComponents/adminHeaders.js/AdminHeaders";
import { Alert } from "@material-ui/lab";
import history from "../../../../../history";

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



const EnvioCreate = ({match}) => {

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
        api.post('/commerce/envio/',
        data, 
        AdminHeaders()
        ).then(res=>{
            setApiRresults(
                { 
                    apiSuccess: 'Envio guardado con éxito.',
                    apiErrors: null,
               })
               setTimeout(() => {
                    history.replace(`/admin/envio-module/show/${res.data.id}`)
                }, 3000);
              
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
                    {errors[k].map(e=>(
                        <Alert align='center' severity="error">{k} - {e}</Alert>
                    ))}
                </div>
            ))
        )
    }

    const resultsApi = () => {
        const { apiSuccess, apiErrors } = apiResults; 
        return (
            <div  style={{textAlign:'center'}}>
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
        <div style={{ margin:'auto', border: 'solid 1px rgba(128,128,128,0.5)', position: 'relative', borderRadius: '4px', padding: '20px 0 50px 0 '}}>
            <div
                style={{background: 'white', position: 'absolute', top: '-0.7em', left: '0.7em'}}
            >
                <Typography 
                    style={{fontSize:'0.8em'}}
                    color='textSecondary'
                >Nuevo envío</Typography>
            </div>
            <div>
                <EnvioForm data={data} sendData={d=>recibeData(d)} />
            </div>
            <br></br>
            <div
                    style={{margin: '20px auto 0 auto', width:`${window.innerWidth > 760 ? '60%' : ''}`, padding: '10px 20px'}}
                >
                    {resultsApi()}
                </div>
            <div style={{display:'flex', justifyContent:'center'}}>
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