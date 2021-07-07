import React from 'react';
import api from '../../../../../../api';

import { Button, Typography } from "@material-ui/core";


class PoliticaEnvioList extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            politicas: this.props.politicas,
            errorDesconocido: null
        }
    }

    componentDidMount() {
        const { politicas } = this.state;
        if (!politicas) {
            this.getPoliticas();
        } 
    }

    getPoliticas = () =>{
        const { send_politicas } = this.props;
        api.get('/commerce/politica-global/', 
        {headers: {'content-type': 'application/json'}}
        ).then(res=>{
                this.setState({politicas: res.data});
                send_politicas(res.data);
        }).catch(err=>{
            this.setState({errorDesconocido: true})
        })
    }



    returnList = (politicas) => {
        return (
            politicas.map(c=>(
                <div style={{display:'grid', gridTemplateColumns:'20fr 1fr', gap:'10px', padding: '5px', borderRadius:'4px', borderBottom: 'solid 1px rgba(128, 128, 128, 0.36)', marginBottom:'5px'}}>
                                            <div key={c.code_dls}>
                        <Typography  color="textPrimary" >
                            {c.titulo}
                        </Typography>
                    </div>
                    <div>
                        <Button onClick={()=>this.props.select_politica(c)} variant='outlined' size='small' color='primary'>Seleccionar</Button>
                    </div>
                </div>
                ))
        )   
    } 


 ContReturn = (children) => {
        return (
            <div style={{display:'block'}}>
                <div style={{display:'flex', alignItems:'center'}}>
                    <Button onClick={()=>this.props.close(false)} variant='outlined' color='primary' size='small'>Volver</Button>
                    <span style={{fontSize:'11px', marginLeft:'20px'}}>{this.props.label}.</span>
                </div>
                <div style={{padding:'10px', display:'block', height: '300px', overflow:'auto', borderRadius:'4px', border: 'solid 1px rgba(128, 128, 128, 0.36)' }}>
                   {children}
                </div>
            </div>
        )
    }



    render(){
        const { politicas, errorDesconocido } = this.state;

        if (errorDesconocido) {
            return (
                this.ContReturn(
                    <Typography  color="textPrimary" >
                        Compruebe conexión a internet ...
                    </Typography>
                )
                
            )
        }

        if (politicas && politicas.length){
            return (

                this.ContReturn(this.returnList(politicas))
            )
        }else{
            return (
                <div>
                    <Typography  color="textPrimary" >
                       Cargando políticas ...
                    </Typography>
                </div>
            )
        }
    }

}

export default PoliticaEnvioList;