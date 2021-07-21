import React from 'react'
import { connect } from 'react-redux';
import './carritoStyles.css'
import ProductoCarrito from './productoCarrito/ProductoCarrito'
import DatosEnvio from './datosEnvio/DatosEnivo'
import ResumenPago from './resumenPago/ResumenPago'
import logoTransbank from '../../../assets/web_pay.png'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import DatosEnvio2 from './datosEnvio2/DatosEnvio2';

import history from '../../../history'

import api from '../../../api'

import AutoSendFormTbk from './autoSendForm/AutoSendFormTbk'




class Carrito extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            url: null,
            token: null,
            errorEnvio: '',
            errorsPago: {},
            errorsApiPagar: {}
        }
        window.scrollTo(0, 0);
    }


    verificarLogin = () => {
        const token = localStorage.getItem('token')
        if (!token){
            return false;
        }
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

    validateEnvio = (adress) => {
        var new_errors_pago = {};
        if (!adress.validAdress){
            new_errors_pago.direccion = ['Debe ingresar y validar una dirección de entrega.']
        }
        if (!adress.dataForm.numContacto){
            new_errors_pago.numero = ['Debe ingresar un número de contacto asociado a la entrega.'];
        }
        if (!adress.dataForm.nombreReceptor){
            new_errors_pago.receptor = ['Debe ingresar un receptor asociado a la entrega.'];
        }
        this.setState({
            errorsPago: new_errors_pago
        })

        if (adress.validAdress && adress.dataForm.numContacto){
            return true
        }else{
            return false
        }


    }

    verificateDoTransaction = () =>{
        if (this.props.userPagina) {
            if (this.validateEnvio(this.props.adress)){
                this.createTransaction()
            } else {
                this.setState({errorEnvio: 'Debe completar los datos del envio para pagar.'})
                setTimeout(() => {
                    this.setState({errorEnvio: ''})
                }, 3000);
            }
            // 
        }else{
            history.push('/auth/register')
        }
    }


    createTransaction = () => {
       var productos = this.props.productos;

       const envio = {
        valid_address:  this.props.adress.validAdress,
        destino_starken : this.props.adress.dataForm.ciudad.code_dls,
        lat:  this.props.adress.lat,
        lng:  this.props.adress.lng,
        numContact: this.props.adress.dataForm.numContacto,
        nombreReceptor: this.props.adress.dataForm.nombreReceptor,
       }
       productos = productos.map(p=>{
           return {producto: p.producto, cantidad: p.cantidad}
       })
       const body = {
            tienda: this.props.tiendaId,
            productos: productos,
            envio: envio,
       }
        const headers = {headers: {"Content-Type":"application/json", "site":localStorage.getItem('site'), "userkey": localStorage.getItem('userkey')}}
        api.post('/commerce/pagar/', 
            body,
            headers
        ).then(res=>{
            if (res.data){
                const {url, token} = res.data
                this.setState({url, token})
            }
            
        }).catch(err=>{
            console.log(err.response)
            if (err && err.response && err.response.data){
                this.setState({errorsApiPagar: err.response.data})
            }
        })
    }

    renderTotal = () => {
        const { productos } =this.props
        var total = 0;
        for (let index = 0; index < productos.length; index++) {
            const element = productos[index];
            total += element.precio * element.cantidad
        }
        return total;
    }

    renderProductos = () => {
            return (
                <React.Fragment>
                    <div className='carritoTitulo'>
                        <Typography variant="h5"  color="textPrimary" paragraph>
                            Tu carrito de compras
                        </Typography>
                        <Typography   color="textSecondary" paragraph>
                            Éstos son los productos que vas a comprar. Puedes modificar su cantidad, volver a ver su detalle o quitarlos del carrito.
                        </Typography>
                    </div>
                   { this.props.productos.map((p,i)=>(
                        <div className='contProductosCarrito' key={p.producto}><ProductoCarrito producto={p} /></div>
                    ))}
                </React.Fragment>
            )
    } 

    renderReturn = () => {
        const {userPagina} = this.props;
        if (this.props.productos.length > 0){
            return (
                <div className='container'>
                    <div className='productos'>
                        {this.renderProductos()}
                    </div>
                    <div className='pagar'>
                        <div>
                            <ResumenPago />
                          
                            <div style={{marginTop: "20px"}}>
                                { this.renderErrors(this.state.errorsPago) } 
                            </div>
                            <div style={{marginTop: "20px"}}>
                                { this.renderErrors(this.state.errorsApiPagar) } 
                            </div>
                            <div className='botonPagar'>

                            <Button onClick={()=>this.verificateDoTransaction()} style={{width: "100%"}}
                                variant='contained' 
                                color="primary">

                                 { userPagina  ? `Pagar ${this.renderTotal()}`: `Identificarme y pagar` }
                            </Button>
                            <br />
                            <br />
                            <img style={{width: '100%'}} src={logoTransbank} alt='boton de pago' />
                            </div>
                        </div>
        
                    </div>
                    <div className='envio'>
                        {/* <DatosEnvio /> */}
                        <DatosEnvio2 />
                    </div>
                </div>
            )
        } else {
            return 'No hay productos en el carrito'
        }

    }



    render() {
        const {token, url} = this.state;
        return (
            <React.Fragment>
                {this.renderReturn()}
                {token && url ? <AutoSendFormTbk token={token} url={url} />: null}
            </React.Fragment>
            )
    }

}

const mapStateToProps = state => {
    return {
        productos: Object.values(state.carrito),
        userPagina: state.userPagina,
        adress: state.adress,
    }
}


export default connect(mapStateToProps, {})(Carrito)