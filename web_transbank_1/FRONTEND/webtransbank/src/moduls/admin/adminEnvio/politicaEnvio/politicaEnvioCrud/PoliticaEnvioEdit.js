import React from "react";

import api from "../../../../../api";
import history from "../../../../../history";

import { Typography, Button } from '@material-ui/core';

import Alert from "@material-ui/lab/Alert";

import PoliticaEnvioForm from "./PoliticaEnvioForm";

class PoliticaEnvioEdit extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            data: null,
            errorData: null,

            errorApi: null,
            successApi: null, 
            error505: null,

        }
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        const pagina_codigo = localStorage.getItem('site');
        const adminkey = localStorage.getItem('adminkey');
        api.get('/commerce/politica-envio/?tienda__pagina__codigo=' + pagina_codigo, 
        {headers: {'content-type':'application/json', 'site':pagina_codigo, 'adminkey': adminkey}}
        ).then(res=> {
            this.setState({data: res.data[0]})
            console.log('DADA', res.data[0])
        }).catch(err=>{
            this.setState({error: true})
        })
    }


    recibeData = (data) => {
        var newData = {...this.state.data};
        const keys = Object.keys(data);
        for (let index = 0; index < keys.length; index++) {
            const key = keys[index];
            newData = {...newData, [key]:data[key]}
        }
        this.setState({data: newData})
    }

    save = () => {
        const { sendData } = this.props;
        const { data } = this.state;
        const adminkey = localStorage.getItem('adminkey')
        const site = localStorage.getItem('site')
        api.patch('/commerce/politica-envio/' + data.id + '/', 
        data,
        {headers : { 'content-type': 'application/json', 'site': site, 'adminkey':adminkey } }
        ).then(res=>{
            this.setState({successApi:'Cambios realizados con éxito.'});
            setTimeout(() => {
                this.setState({successApi:''});
                sendData(res.data);
            }, 2000);
            
        }).catch(err=>{
            if (err.response && err.response.data){
                this.setState({errorApi: err.response.data})
                setTimeout(() => {
                    this.setState({errorApi: ''})
                }, 2000);
            } else {
                this.setState({error505:'Compruebe conexión a internet.'})
                setTimeout(() => {
                    this.setState({error505:''})
                }, 2000);
            }
        });
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

    
    render() {
        const { data, error } = this.state;
        if (error){
            return (
                <Typography>Error al cargar los datos.</Typography>
            )
        } else {
            if (data){
                return (
                    <div >
                        <div
                            style={{borderBottom:'solid 1px rgba(128,128,128,0.4)'}}
                        >
                            <Button
                                onClick={()=>history.replace('/admin/envio/politica-envio')}
                                color='primary'
                                size='small'
                                variant='outlined'
                                style={{margin:'0 0 10px 0'}}
                            >
                                Volver
                            </Button>
                            
                            <Typography 
                                style={{margin:'0 0 5px 5px'}}
                                color='textSecondary'
                            >Actualice políticas de envío</Typography>
                        </div>

                        <div style={{width:'80%', margin: '30px auto'}}>
                            <div >
                                <PoliticaEnvioForm
                                    sendData={d=>this.recibeData(d)}
                                    data={data} 
                                />
                            </div>


                            {this.resultsApi()}


                            <div style={{display: 'flex', justifyContent:'center'}}>
                                    <Button
                                        onClick={()=>this.save()}
                                        color='primary'
                                        variant='contained'
                                        size='small'
                                    >
                                        Guardar cambios
                                    </Button>
                            </div>
                        </div>
                    </div>
                )
            } else {
                return (
                    <Typography>Cargando ...</Typography>
                )
            }
        }


    }
    

}

export default PoliticaEnvioEdit;