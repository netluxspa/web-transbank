


import React, { useState } from 'react';


import { connect, useDispatch } from 'react-redux';
import { ADD_ENVIO, ADD_VALID_ADRESS } from '../../../../../actions/types';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import FormDataEnvio from './formDataEnvio/FormDataEnvio';
import ValidateAdress from './validateAdress/ValidateAdress';

import CostosEnvio from './costosEnvio/CostosEnvio';


const DataEnvio = ({adressStore, validAdress}) => {

    const dispatch = useDispatch();

    const [ciudades, setCiudades] = useState(null)

    const [dataEnvio, setDataEnvio] = useState({
        calle: adressStore.calle, 
        numCalle: adressStore.numCalle, 
        detalle: adressStore.detalle, 
        ciudad: adressStore.ciudad, 
        pais: adressStore.pais,
        numContacto: adressStore.numContacto,
        nombreReceptor: adressStore.nombreReceptor,
    })

    const [openValidate, setOpenValidate] = useState(false);



    const recibeData = (data) => {
        const key = Object.keys(data)[0]
        setDataEnvio({...dataEnvio, [key]:data[key]})
        var data_dispatch = {...dataEnvio, [key]:data[key]}
        dispatch({type:ADD_ENVIO, payload: data_dispatch})
    }

    const renderInstruccion = () => {
        return (
            <div style={{border: 'solid 1px transparent', borderRadius: '4px', padding: '10px 0'}}>
                <Typography  variant='h5' style={{fontWeight:'500'}} color='colorPrimary'>Ingresa tu dirección de envío</Typography>
            </div>
        )
    }

    const validateData = () => {
        if (dataEnvio.calle && dataEnvio.numCalle && dataEnvio.ciudad && dataEnvio.pais && dataEnvio.numContacto  && dataEnvio.nombreReceptor){
            return true
        } else {
            return false
        }
    }

    const adress = () => {
        var adress = dataEnvio.calle + '  ' + 
                        dataEnvio.numCalle 

        if (dataEnvio.detalle){
            adress +=  ' ' + dataEnvio.detalle
        }

        adress += ',  ' + dataEnvio.ciudad.name + ',  ' + 
                    dataEnvio.pais
        adress = adress.toUpperCase()
        return adress
                    
    }

    const renderInvitationToValidate = () => {
        return(
                <div style={{padding:'20px', border: 'solid rgba(160,160,160,0.5) 1px', borderRadius: '4px'}}>
                    <div style={{border: 'solid 1px transparent', borderRadius: '4px', padding: '10px 0'}}>
                            <Typography  variant='h6' style={{fontWeight:'500'}} color='colorPrimary'>Valida tu dirección</Typography>
                    </div>
                    <div style={{borderBottom: 'solid 1px rgba(160,160,160,1)'}}>
                        <Typography style={{fontSize:'0.75em', margin:'0 0 7px 0'}} color='textSecondary'>
                            dirección
                        </Typography>
                        <Typography  color='textPrimary'>
                            {adress()}
                        </Typography>
                    </div>
                    <br></br>
                    <Button onClick={()=>setOpenValidate(true)} variant='outlined' size='small' color='primary'>Validar dirección</Button>
                </div>
        )
    }

    const inputState = () => {
        return (
            <div>
            <div>
                {renderInstruccion()}
            </div>
            <br></br>
            <br></br>


            <div>
                <FormDataEnvio data={dataEnvio} sendCitys={c=>setCiudades(c)} ciudades={ciudades} sendData={d=>recibeData(d)} />
            </div>
            <br></br>
            <br></br>
            <br></br>

            <div>
                {validateData() ? 
                    renderInvitationToValidate()
                : 
                renderConditions()
                }
            </div>
        </div>
        )
    }

    const renderConditions = () => {
        return (
            <div>
                <Typography color='textoSecondary' style={{fontSize:'0.8em'}}>
                    Para continuar necesitamos tu dirección y datos del receptor 
                </Typography>
            </div>
        )
    }



    const validateAdresShow = () => {
        return(
            <div>

                <div>
                    <Typography color='textPrimary' variant='h6' style={{fontWeight:'600'}}>¡Ya puedes realizar el pago!</Typography>
                </div>
                <br></br>
                <br></br>
            

            <div style={{border: 'solid 1px rgba(128,128,128,0.6)', borderRadius:'4px', padding: '10px'}}>
                <div>
                    <div>
                        <Typography color='textSecondary' style={{fontWeight:'600'}}>{validAdress}</Typography>    
                    </div>
                    <div>
                    <Typography style={{fontWeight:'500', fontSize: '0.8em'}}>Dirección de entrega</Typography>    
                    </div>
                </div>
                <br>
                </br>

                <div>
                    <div>
                        <Typography color='textSecondary' style={{fontWeight:'600'}}>{dataEnvio.numContacto}</Typography>    
                    </div>
                    <div>
                    <Typography style={{fontWeight:'500', fontSize: '0.8em'}}>Teléfono de contacto</Typography>    
                    </div>
                </div>
                <br>
                </br>

                <div>
                    <div>
                        <Typography color='textSecondary' style={{fontWeight:'600'}}>{dataEnvio.nombreReceptor}</Typography>    
                    </div>
                    <div>
                    <Typography style={{fontWeight:'500', fontSize: '0.8em'}}>Receptor</Typography>    
                    </div>
                </div>
                <br></br>
                <div>
                    <Button 
                    onClick={()=>{
                        setOpenValidate(false)
                        dispatch({type: ADD_VALID_ADRESS, payload: ''})}}
                    variant='outlined'
                    color='primary'
                    size='small'
                    style={{margin:'0 10px 0 0'}}>
                        Modificar
                    </Button>
                </div>
            </div>


            </div>






      
        )
    }



    return (
        <div>
            { validAdress ?
                <React.Fragment>
                    {validateAdresShow()}
                    <br></br>
                    <br></br>
                    <CostosEnvio />
                </React.Fragment>
                :  
                <div>
                    {
                        openValidate ?
                        <ValidateAdress close={()=>setOpenValidate(false)} adress={dataEnvio} />
                        :
                        inputState()
                    }
                </div>  
            }
            
        </div>
        )
}


const mapStateToPros = state => {
    console.log(state.adress.dataForm)
    return {
        adressStore: state.adress.dataForm ,
        validAdress: state.adress.validAdress 
    }
}

export default connect(mapStateToPros, {})(DataEnvio);