import React from 'react';

import TextField from '@material-ui/core/TextField';
import { Typography, Button} from '@material-ui/core';

import SelectorPoliticaEnvio from './selectorPoliticaEnvio/SelectorPoliticaEnvio';

class PoliticaEnvioForm extends React.Component {



    form = () => {
        const { sendData } = this.props;

        
        return   (
                <div
                    
                >

                    <div style={{margin:'0 0 20px 0'}}>
                        <SelectorPoliticaEnvio 
                            politica={
                                this.props.data && this.props.data.politica_detail ? 
                                this.props.data.politica_detail : 
                                null
                            }
                            select_politica={e=>sendData({politica_envio: e.codigo})}
                        />
                    </div>
                    <div style={{margin:'0 0 20px 0'}}>
                        <TextField 
                            style={{width:'100%', }}
                            label='Distancia máxima para distribución propia (km)'
                            value={
                                this.props.data && this.props.data.rango_zonal ? 
                                this.props.data.rango_zonal : 
                                null
                            }
                            variant='outlined'
                            onChange={e=>sendData({rango_zonal: e.target.value})}
                        />
                    </div>
                    <div style={{margin:'0 0 20px 0'}}>
                        <Typography
                            color='textSecondary'
                            style={{fontSize:'0.75em', margin:'0 0 10px 0', lineHeight:'1.1em'}}
                        >
                            Costo base por envío propio ($). En caso de ser gratis el envío en zona local colocar 0
                        </Typography>
                        <TextField 
                            style={{width:'100%', }}
                            label='costo envío base'
                            value={
                                this.props.data && this.props.data.c_base ? 
                                this.props.data.c_base : 
                                null
                            }
                            variant='outlined'
                            onChange={e=>sendData({c_base: e.target.value})}
                        />
                    </div>
                    <div style={{margin:'0 0 20px 0'}}>
                        <Typography
                            color='textSecondary'
                            style={{fontSize:'0.75em', margin:'0 0 10px 0', lineHeight:'1.1em'}}
                        >
                            Costo por kilo de envío propio ($). En caso de ser gratis el envío en zona local colocar 0
                        </Typography>
                        <TextField 
                            style={{width:'100%', }}
                            label='costo peso envío'
                            value={
                                this.props.data && this.props.data.c_peso ? 
                                this.props.data.c_peso : 
                                null
                            }
                            variant='outlined'
                            onChange={e=>sendData({c_peso: e.target.value})}
                        />
                        
                    </div>

                    <div style={{margin:'0 0 20px 0'}}>
                        <Typography
                            color='textSecondary'
                            style={{fontSize:'0.75em', margin:'0 0 10px 0', lineHeight:'1.1em'}}
                        >
                            Costo por centímetro cúbico de envío propio ($). En caso de ser gratis el envío en zona local colocar 0
                        </Typography>
                        <TextField 
                            style={{width:'100%', }}
                            label='costo volumen envío'
                            value={
                                this.props.data && this.props.data.c_volumen ? 
                                this.props.data.c_volumen : 
                                null
                            }
                            variant='outlined'
                            onChange={e=>sendData({c_volumen: e.target.value})}
                        />
                        
                    </div>


                    <div style={{margin:'0 0 20px 0'}}>
                        <Typography
                            color='textSecondary'
                            style={{fontSize:'0.75em', margin:'0 0 10px 0', lineHeight:'1.1em'}}
                        >
                            Costo por kilómetro de envío propio ($). En caso de ser gratis el envío en zona local colocar 0
                        </Typography>
                        <TextField 
                            style={{width:'100%', }}
                            label='costo distancia envío'
                            value={
                                this.props.data && this.props.data.c_distancia ? 
                                this.props.data.c_distancia : 
                                null
                            }
                            variant='outlined'
                            onChange={e=>sendData({c_distancia: e.target.value})}
                        />
                        
                    </div>

                   
                    
                </div>
        )
    }

    render() {
        return (
            this.form()
        )
    }

}

export default PoliticaEnvioForm;