import { useState, useEffect } from "react";
import { connect } from 'react-redux';

import { Typography, Button } from "@material-ui/core";

import PositionForm from "./PositionForm";

import Alert from "@material-ui/lab/Alert";

import Modal from "../../../../../components/modal/Modal";
import history from "../../../../../history";
import api from "../../../../../api";







const PositionCreate = ({tienda, sendData}) => {

    const [validData, setValidData] = useState({
                                    pais:'chile',
                                    calle: '',
                                    numCalle: '',
                                    detalle: '',
                                    ciudad: null, 
                                    lat: null,
                                    lng: null,
                                    address: '', 
                                })
    const [errorApi, setErrorApi] = useState('')
    const [sucessApi, setSuccessApi] = useState('')

    const [errorDesconocio, setErrorDesconocido] = useState('')




    const recibeValidData = (data) => {
        var newValidData = {...validData};
        const keys = Object.keys(data)
        for (let index = 0; index < keys.length; index++) {
            const key = keys[index];
            newValidData = {...newValidData, [key]:data[key]}
        }
        setValidData(newValidData)
        
    }


    const renderErrors = (errors) => {
        const keys = Object.keys(errors)
        console.log(keys)
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


    const resultsApi = (
        <div  style={{textAlign:'center'}}>
        {errorApi ||  sucessApi ? 
            <div style={{margin:'10px 0 10px 0'}}>
                {errorApi ? renderErrors(errorApi): null}
                {sucessApi ?  <Alert severity="success">{sucessApi}</Alert>: null}
            </div>: 
        null}
    </div>
    )

    const renderInvitationToValidate = (validData) => {
        return(
                <div style={{padding:'20px', border: 'solid rgba(160,160,160,0.5) 1px', borderRadius: '4px'}}>
                    <div style={{border: 'solid 1px transparent', borderRadius: '4px', padding: '10px 0'}}>
                            <Typography  variant='h6' style={{fontWeight:'500'}} color='colorPrimary'>Verifica y guarda</Typography>
                    </div>
                    <div style={{borderBottom: 'solid 1px rgba(160,160,160,1)'}}>
                        <Typography style={{fontSize:'0.75em', margin:'0 0 7px 0'}} color='textSecondary'>
                            dirección
                        </Typography>
                        <Typography  color='textPrimary'>
                            {validData.address}
                        </Typography>
                    </div>

                    {resultsApi}

                    <br></br>
                    <Button 
                        onClick={()=>{
                            var  newValidData = {...validData};
                            delete newValidData.lat;
                            delete newValidData.lng;
                            delete newValidData.address;
                            setValidData(newValidData)
                        }}
                        style={{margin:'10px 0 0 20px'}}  variant='outlined' size='small' color='primary'>Modificar</Button>
                    <Button
                        onClick={()=>save()}
                        style={{margin:'10px 0 0 20px'}} variant='contained' size='small' color='primary'>Guardar cambios</Button>
                </div>
        )
    }



    const save = () => {
        const {address, lat, lng, ciudad, pais, calle, numCalle } = validData;
        const body = {
            tienda: tienda.id,
            lng: lng, 
            lat: lat,
            address: address,
            starken_origen_code: ciudad.code_dls,
            starken_origin_name: ciudad.name,
            ciudad: ciudad.name,
            calle: calle,
            numCalle: numCalle, 
            pais: pais
        }
        api.post('/commerce/config-logistica/',
            body, 
            {headers: {'content-type': 'application/json', 'site':localStorage.getItem('site'), 'adminkey': localStorage.getItem('adminkey')}}
        ).then(res=>{
            if (res && res.data){
                setSuccessApi('Datos almacenados con exito')
                setTimeout(() => {
                    sendData(res.data)
                    setSuccessApi('')
                }, 2000);

            }
        }).catch(err=>{
            console.log(err.response.data)
            if (err && err.response && err.response.data){
                setErrorApi(err.response.data)
                console.log('setErrorApi', errorApi)
                setTimeout(() => {
                    setErrorApi('')
                }, 2000);
            }
        })
    }





    return (
            <div>
            {
                validData && validData.ciudad && validData.lat && validData.lng && validData.address ?
                renderInvitationToValidate(validData)
                :
                <PositionForm 
                    data={validData}
     
                    sendValidData={d=>{
                        console.log(d);
                        recibeValidData(d)}}  
                />
            }
            </div>
           
  

                
    )
}

const mapStateToProps = state => {
    return {
        tienda: state.tienda
    }
}

export default connect(mapStateToProps, {})(PositionCreate);