import React from "react";

import {  Route  } from 'react-router-dom';


import Modal from "../../../../components/modal/Modal";
import history from "../../../../history";
import api from "../../../../api";

import PoliticasEnvioCreate from './politicaEnvioCrud/PoliticaEnvioCreate';
import PoliticasEnvioShow from './politicaEnvioCrud/PoliticaEnvioShow';
import PoliticasEnvioEdit from './politicaEnvioCrud/PoliticaEnvioEdit';
import { Typography } from "@material-ui/core";

class PoliticaEnvio extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            data: null,
            error: false
        }
    }


    componentDidMount() {
        this.getData();
    }


    getData = () => {
        const site = localStorage.getItem('site')
        api.get('/commerce/politica-envio/?tienda__pagina__codigo=' + site, 
        {headers: {'content-type': 'application/json'}}
        ).then(res=>{
            this.setState({data: res.data})
        })
    }


    recibeData = d => {
        var newData = []
        newData.push(d)
        this.setState({data:newData});
        history.replace('/admin/envio/politica-envio')
    }

    renderData = (data, error) => {
        if (error) {
            return (
                <Typography>Error al obtener los datos</Typography>
            )
        } else {
            if (!data) {
                return (
                    <Typography>Cargando ...</Typography>
                )
            } else {
                return (
                    <PoliticasEnvioShow data={data}  />
                )
            }
        }
    }

    renderReturn = () => {
        const { data, error } = this.state;
        const { isExact } = this.props.match;
        return (
            <div>
                {
                    isExact ?
                    this.renderData(data, error)
                    :
                    <div style={{padding:'20px'}}>
                        <Route  path='/admin/envio/politica-envio/create' exact 
                                component={()=> <PoliticasEnvioCreate sendData={d=>this.recibeData(d)} />} 
                                />
                        <Route  path='/admin/envio/politica-envio/edit' exact 
                            component={()=> <PoliticasEnvioEdit  sendData={d=>this.recibeData(d)}/>} 
                        />
                    </div>
                }               
            </div>
        )
    }

    render() {
        return (
            <Modal 
                component={this.renderReturn()}
                titulo='Política de envío'
                ondismiss={() => history.goBack()}
            />
        )
    }

}

export default PoliticaEnvio;