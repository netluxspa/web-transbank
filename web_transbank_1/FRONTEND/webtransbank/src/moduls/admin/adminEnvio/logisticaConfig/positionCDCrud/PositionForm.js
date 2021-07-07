
import React from 'react';
import { connect } from 'react-redux';


import FormDataEvio from '../../../../../moduls/tienda/carrito/datosEnvio2/dataEnvio/formDataEnvio/FormDataEnvio';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import { Typography } from '@material-ui/core';


import SelectorStarkenCity from '../../../../../globalComponents/selectorStarkenCity/SelectorStarkenCity';
import ValidAddress from './ValidAddress';


const YOUR_GOOGLE_MAPS_API_KEY = 'AIzaSyBZRkvxQdA_wOsVZeeyCjuQBKZzCia4LZk';



class PositionForm extends React.Component {



    constructor(props){
        super(props);
        this.state = {
            open_valid_address: false,
        }
    }


form = (ciudad, calle, numCalle, detalle) => {
    const { data, sendValidData } = this.props;
    return   (
            <div>
                <div style={{margin:'0 0 20px 0'}}>
                    <Typography color='textPrimary'>
                        {
                            !data ? 
                            'Ingrese dirección de su centro de distrubución':
                            'Actualice dirección de su centro de distrubución'
                        }
                    </Typography>
                </div>
                <div style={{margin:'0 0 20px 0'}}>
                    <SelectorStarkenCity 
                        ciudad={ciudad}
                        select_ciudad={e=>{this.setState({ciudad: e}); sendValidData({ciudad: e})}}
                    />
                </div>
                <div style={{margin:'0 0 20px 0'}}>
                    <TextField 
                        style={{width:'100%'}}
                        label='Calle'
                        value={calle}
                        onChange={e=>{this.setState({calle: e.target.value}); sendValidData({calle: e.target.value})}}
                    />
                </div>
                <div style={{margin:'0 0 20px 0'}}>
                    <TextField 
                        style={{width:'100%'}}
                        label='Nº'
                        value={numCalle}
                        onChange={e=>{this.setState({numCalle: e.target.value}); sendValidData({numCalle: e.target.value})}}
                    />
                </div>
                <div style={{margin:'0 0 20px 0'}}>
                    <TextField 
                        style={{width:'100%'}}
                        label='Detalle (opcional)'
                        value={detalle}
                        onChange={e=>{this.setState({detalle: e.target.value}); sendValidData({detalle: e.target.value})}}
                    />
                </div>
            </div>
    )
}


renderInvitationToValidate = (address) => {
    return(
            <div style={{padding:'20px', border: 'solid rgba(160,160,160,0.5) 1px', borderRadius: '4px'}}>
                <div style={{border: 'solid 1px transparent', borderRadius: '4px', padding: '10px 0'}}>
                        <Typography  variant='h6' style={{fontWeight:'500'}} color='colorPrimary'>Valida tu dirección para continuar</Typography>
                </div>
                <div style={{borderBottom: 'solid 1px rgba(160,160,160,1)'}}>
                    <Typography style={{fontSize:'0.75em', margin:'0 0 7px 0'}} color='textSecondary'>
                        dirección
                    </Typography>
                    <Typography  color='textPrimary'>
                        {address}
                    </Typography>
                </div>
                <br></br>
                <Button onClick={()=>this.setState({open_valid_address:true})} variant='outlined' size='small' color='primary'>Validar dirección</Button>
            </div>
    )
}


valid_address = (ciudad, calle, numCalle, detalle, pais, open_valid_address) => {
    if (ciudad && calle && numCalle){
        var address = calle.toUpperCase() + ' ' 
                    + numCalle.toUpperCase() + ' ' 
                    + detalle.toUpperCase() + ' '
                    + ciudad.name.toUpperCase() +  ' '
                    + pais.toUpperCase()
        
        if (open_valid_address){
            return(
                <ValidAddress 
                    address={address} 
                    close={()=>this.setState({open_valid_address:false})}
                    validate={v=>{
                        this.props.sendValidData(
                        {
                            ciudad: ciudad,
                            lng:v.lng,
                            lat: v.lat,
                            address: v.address
                        }
                    )}}
                />
            )
        } else {
            return(
                this.renderInvitationToValidate(address)
            )
        }
        
    } else {
        return (
            <Typography color='textPrimary'>Completa los datos para continuar</Typography>
        )
    }

}








render() {
    const {  open_valid_address } = this.state;
    const { ciudad, calle, numCalle, detalle, pais } = this.props.data;
    return (

        <div>
            {
                !open_valid_address ?
                <div>
                    {this.form(ciudad, calle, numCalle, detalle)}
                    <br></br>
                    <br></br>
                </div>
                :
                null
            }
            <div>
                { this.valid_address(ciudad, calle, numCalle, detalle, pais, open_valid_address) }
            </div>

        </div>
    )
}

}





const mapStateToProps = state => {
    return {
        tienda: state.tienda
    }
}

export default connect(mapStateToProps, {})(PositionForm);