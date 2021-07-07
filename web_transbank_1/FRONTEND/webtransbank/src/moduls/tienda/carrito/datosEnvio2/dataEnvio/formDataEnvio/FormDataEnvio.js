import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import SelectorCity from '../../../../../admin/adminTienda/selectorCity/SelectorCity';

import { useState } from 'react';
import { Typography } from '@material-ui/core';
 
const classes = {
    contForm: {
        width: '100%'
    },
    contItem: {
        padding:'0 0 5px 0',
    }
}


class FormDataEvio  extends React.Component {

    constructor(props){
        
        super(props);
        console.log(this.props)
        this.state = {
            openSelectorCity: false,
        }
    }

    sendData = (data) => {
        this.props.sendData(data)
    }

    render() {
        const { openSelectorCity} = this.state
        const {calle, numCalle, detalle, ciudad, numContacto} = this.props.data
        return (
            <div style={classes.contForm}>
                <div style={classes.contItem}>


                    {!openSelectorCity ?
                        <div>
                            { true ? 
                            <div>
                                <div style={{borderBottom: 'solid 1px rgba(160,160,160,1)'}}>
                                    <Typography style={{fontSize:'0.75em', margin:'0 0 7px 0'}} color='textSecondary'>
                                        ciudad
                                    </Typography>
                                    <div style={{display:'flex', justifyContent:'space-between'}}>
                                    {ciudad ? <Typography  color='textPrimary'>
                                            {ciudad.name}
                                        </Typography>  : ''
                                    }

                                        <Button 
                                            style={{margin:'0 0 5px 0'}}
                                            onClick={()=>this.setState({openSelectorCity:true})}
                                            size='small' 
                                            variant='outlined' 
                                            color='primary'>
                                            {ciudad ? 'Cambiar ciudad': 'Seleccione su ciudad'}
                                        </Button>
                                    </div>

                                </div>
                            </div>
                            :
                            null
                            }


                        </div>
                        :
                        <SelectorCity 
                            sendCitys = {c=>this.props.sendCitys(c)}
                            ciudades = {this.props.ciudades}
                            close={()=>this.setState({openSelectorCity:false})}
                            emitData={d=>{
                                this.setState({ciudad:{code_dls: d.code_dls, name: d.name}});
                                this.sendData({ciudad:{code_dls: d.code_dls, name: d.name}}); 
                                this.setState({openSelectorCity:false});
                            }}
                            label='Seleccione su ciudad' 
                        />           
                    }
                
                </div>
                <div style={classes.contItem}>
                    <TextField  onChange={e=>{this.sendData({calle:e.target.value})}} 
                                value={calle}
                                style={{width: '100%'}} 
                                label="ingrese calle" />
                </div>
                <div style={classes.contItem}>
                    <TextField  onChange={e=>{this.sendData({numCalle: e.target.value})}}
                                value={numCalle}
                                style={{width: '100%'}} 
                                type='number'
                                label="número calle" />
                </div>
                <div style={classes.contItem}>
                    <TextField  onChange={e=>{this.sendData({detalle: e.target.value})}}
                                value={detalle}
                                style={{width: '100%'}} 
                                label="Especificación (opcional)" />
                </div>
                <br></br>
                <br></br>

                <div style={classes.contItem}>
                    <TextField  onChange={e=>{this.sendData({numContacto: e.target.value})}}
                                value={numContacto}
                                style={{width: '100%'}} 
                                label="Número de contacto" type='number' />
                </div>

            </div>
        )
    }
}

export default FormDataEvio;