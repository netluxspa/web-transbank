import React from 'react';
import api from '../../../../../api';
import history from '../../../../../history';

import { Typography, Button } from '@material-ui/core';

import Alert from "@material-ui/lab/Alert";


import PositionForm from './PositionForm';

class PositionEdit extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            data: null,
            error: null,

            errorApi: null,
            successApi: null, 
            error505: null,

            is_valid_to_save: false
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        const pagina_codigo = localStorage.getItem('site');
        const adminkey = localStorage.getItem('adminkey');
        api.get('/commerce/config-logistica/?tienda__pagina__codigo=' + pagina_codigo, 
        {headers: {'content-type':'application/json', 'site':pagina_codigo, 'adminkey': adminkey}}
        ).then(res=> {
            this.setState({data: res.data[0]})
        }).catch(err=>{
            this.setState({error: true})
        })
    }


    recibeData = (data) => {
        var newData = {...this.state.data};
        const keys = Object.keys(data);
        if (keys.includes('lat', 'lng', 'address')){
            this.setState({is_valid_to_save: true})
        } else {
            this.setState({is_valid_to_save: false})
        }
        for (let index = 0; index < keys.length; index++) {
            const key = keys[index];
            newData = {...newData, [key]:data[key]}
        }
        this.setState({data: newData})
        
    }



    renderInvitationToValidate = (validData) => {
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

                    {this.resultsApi()}

                    <br></br>
                    <Button 
                        onClick={()=>{
                            this.setState({is_valid_to_save: false})
                        }}
                        style={{margin:'10px 0 0 20px'}}  variant='outlined' size='small' color='primary'>Modificar</Button>
                    <Button
                        onClick={()=>this.save()}
                        style={{margin:'10px 0 0 20px'}} variant='contained' size='small' color='primary'>Guardar cambios</Button>
                </div>
        )
    }



    renderErrors = (errors) => {
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



    resultsApi = () => {
        const { errorApi, successApi } = this.state;
        return (
            <div  style={{textAlign:'center'}}>
                {errorApi ||  successApi ? 
                    <div style={{margin:'10px 0 10px 0'}}>
                        {errorApi ? this.renderErrors(errorApi): null}
                        {successApi ?  <Alert severity="success">Cambios guradados con éxito</Alert>: null}
                    </div>: 
                null}
            </div>
            )
    }
    


    save = () => {
        console.log('data', this.state.data)
        const {id, tienda, address, lat, lng, ciudad, pais, calle, numCalle } = this.state.data;
        const body = {
            tienda: tienda,
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
        api.patch('/commerce/config-logistica/' + id + '/',
            body, 
            {headers: {'content-type': 'application/json', 'site':localStorage.getItem('site'), 'adminkey': localStorage.getItem('adminkey')}}
        ).then(res=>{
            if (res && res.data){
                this.setState({successApi:true})
                setTimeout(() => {
                    this.props.sendData(res.data)
                    this.setState({successApi:false})
                }, 2000);

            }
        }).catch(err=>{
            console.log(err.response.data)
            if (err && err.response && err.response.data){
                this.setState({errorApi: err.response.data})
                setTimeout(() => {
                    this.setState({errorApi: null})
                }, 2000);
            }
        })
    }




    renderReturn = (data, is_valid_to_save) => {
        if (!is_valid_to_save){
            return (
                <PositionForm 
                sendValidData={d=>{
                    this.recibeData(d)
                    }
                }  
                data={data}   
        
            />
            )
        }else {
            return (
                this.renderInvitationToValidate(data)
            )
        }

    }



    render() {

        var { data, error, is_valid_to_save } = this.state;
       
        if (error){
            return 'Error al obtener los datos'
        } else {
            if (!data){
                return 'Cargando ...'
            } else {
                data.ciudad = {code_dls: data.starken_origen_code, name: data.starken_origin_name}
                return this.renderReturn(data, is_valid_to_save);
 
            }
        }

    }
}

export default PositionEdit;