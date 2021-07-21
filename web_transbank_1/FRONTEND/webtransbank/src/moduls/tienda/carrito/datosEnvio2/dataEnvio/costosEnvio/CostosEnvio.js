import React , { useState, useEffect } from "react";
import { connect } from "react-redux";

import Alert from "@material-ui/lab/Alert";


import api from '../../../../../../api';

import getDistance from 'geolib/es/getDistance';

class CostosEnvio extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            distance: null,
            starken_cost: null,

            errorApi: null, 
            error505: null
        }
    }

    componentDidMount(){
        const { tienda, envio, carrito } = this.props;
        if (tienda && 
            tienda.config_logistica && 
            tienda.config_logistica.lat && 
            tienda.config_logistica.lng &&
            envio && envio.lat && envio.lng && carrito && carrito.length
            ) {

                const newDistance = getDistance(
                    { latitude: tienda.config_logistica.lat, longitude: tienda.config_logistica.lng  },
                    { latitude: envio.lat, longitude: envio.lng }
                )
                this.setState({
                    distance:  newDistance
                })

                const productos = carrito
                this.getStarkenCosto(
                    tienda.config_logistica.starken_origen_code,
                    envio.dataForm.ciudad.code_dls,
                    productos,
                    newDistance,
                    envio.lat,
                    envio.lng
                )
            }
    }

    getStarkenCosto = (init, finish, productos, distance, lat, lng) => {
        const body = {
            lat: lat,
            lng: lng,
            distance: distance,
            init: init,
            finish: finish,
            productos: productos,
            site: localStorage.getItem('site')
        }
        api.post('/commerce/get-envio-cost/', 
        body, 
        {headers: {'content-type':'application/json'}}
        ).then(res=> {
            if (res && res.data){
                this.setState({starken_cost: res.data})
            }
        }
        ).catch(err=>{
            if (err && err.response && err.response.data){
                this.setState({errorApi: err.response.data.error})
            } else {
                this.setState({error505: 'Compruebe conexión a internet.'})
            }
        })
    }


    renderErrors = (errors) => {
        const keys = Object.keys(errors)
        return (
        keys.map(k=>(
            <div key={k}>
                {errors[k].map(e=>(

                    <Alert severity="error">{k} - {e}</Alert>

                ))}
            </div>
        ))
        )
    }


    render(){

        const { tienda, envio } = this.props;
        const {distance, errorApi, starken_cost, error505} = this.state;

        return (
            <div>
                <div
                    style={{display:'grid', gridTemplateColumns:'1fr 1fr'}}
                >
                    <div>Starken init</div>
                    <div>{tienda.config_logistica.starken_origen_code}</div>
                    <div>Starken finish</div>
                    <div>{envio.dataForm.ciudad.code_dls}</div>
                    <div>lat tienda</div>
                    <div>{tienda.config_logistica.lat}</div>
                    <div>lng tienda</div>
                    <div>{tienda.config_logistica.lng}</div>
                    <div>lat envio</div>
                    <div>{envio.lat}</div>
                    <div>lng envio</div>
                    <div>{envio.lng}</div>
                    <div>Distancia máxima</div>
                    <div>{tienda.politica_envio.rango_zonal}</div>
                    <div>Distancia actual</div>
                    <div>{distance}</div>
                </div>
            
                <br></br>
                <br></br>


                <div>

                    {
                        (()=>{
                            if (!errorApi && !error505 && !starken_cost){
                                return 'Loading'
                            } else if(errorApi){
                                return this.renderErrors(errorApi);
                            } else if (error505){
                                return error505;
                            } else if (starken_cost){
                                return starken_cost.precio 
                            }
                        })()
                    }

                </div>
            
            </div>

        )
    }

}

const mapStateToPros = state => {
    return {
        tienda: state.tienda,
        envio: state.adress,
        carrito: Object.values(state.carrito)
    }
}

export default connect(mapStateToPros, {})(CostosEnvio);