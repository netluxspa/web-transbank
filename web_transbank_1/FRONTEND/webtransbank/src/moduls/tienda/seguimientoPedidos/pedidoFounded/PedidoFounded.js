import React from 'react';
import { connect } from 'react-redux';

import { REMOVE_ALL_CARRITO } from '../../../../actions/types'

import api from '../../../../api'

import Alert from '@material-ui/lab/Alert';

import { ErroresTransaction, ErroresAutenticacion, TiposTargeta } from './ResponsesTransbank'

import './PedidoFoundendStyles.css'


class PedidoFounded  extends React.Component {

    constructor(props){
        super(props)
        this.state = { pedido: null }
    }

    componentDidMount(){
        const {codigo_seguimiento} = this.props.match.params
        this.getPedido(codigo_seguimiento)
    }


    getPedido(codigo_seguimiento){
        api.get('/commerce/pedido/?codigo_seguimiento=' + codigo_seguimiento + '&tienda__pagina__codigo=' + localStorage.getItem('site'),
            {headers: {'content-type': 'application/json', 'site': localStorage.getItem('site'), 'userkey':localStorage.getItem('userkey')}}
        ).then(res=>{
            if (res && res.data && res.data.length > 0){
                const pedido = res.data[0]
                this.setState({pedido: pedido})
                if (this.state.pedido.transaction && this.state.pedido.transaction.main_status){
                    console.log('Limpiar carrito en localStorage y en redux')
                    localStorage.removeItem('productos')
                    this.props.dispatch({type: REMOVE_ALL_CARRITO})
                }
            }
        })
    }

    renderResumen = (transaction) => {

        if (transaction) {
            return (
                <div>
                
                    {
                        transaction && transaction.response_code == 0 
                        ?
                        <Alert severity="success">Pago realizado con exito</Alert> 
                        :
                        <Alert severity="error">El pago no fue realizado - <ErroresTransaction num={transaction.response_code} />. Puedes intentar pagar denuevo yendo al carro de compras.</Alert> 
                    }

                </div>
            )

        } else {
            return (
                <Alert severity="error">El pago no fue realizado - Probablemente estuviste más de 5 minutos en webpay. Puedes intentar pagar denuevo yendo al carro de compras.</Alert> 
            )
            
        } 

    }


    renderPedido = (pedido) => {
        return (
            <div className='contPedidosGrid contInfoPedido'>
                <div className='supraHeader supraHeaderPedido'> Información del pedido </div>
                <div className='header line_bottom'>Fecha</div>
                <div className='header line_bottom'>Nº de orden</div>
                <div className='header line_bottom'>Codigo seguimiento</div>
                <div>{pedido.fecha}</div>
                <div>{pedido.num_orden}</div>
                <div>{pedido.codigo_seguimiento}</div>
            </div>
        )

    }

    renderProdctosPedido = (productos) => {

        const total = (productos) => {
            let total = 0;
            for (let index = 0; index < productos.length; index++) {
                const element = productos[index];
                total += element.cantidad*element.precio_pedido
            }
            return total
        }

        return (
            <div className='contPedidosGrid contInfoProductos'>
               <div className='supraHeader supraHeaderProductos'> Información de productos </div>
                <div className='header line_bottom'>Producto</div>
                <div className='header line_bottom alignRight'>Precio</div>
                <div className='header line_bottom alignRight'>Cantidad</div>
                <div className='header line_bottom alignRight'>Total</div>
           
                {productos.map(p=>(
                    <React.Fragment key={p.id}>
                        <div>{p.producto.titulo}</div>
                        <div className='alignRight'>CLP $ {p.precio_pedido}</div>
                        <div className='alignRight'>{p.cantidad}</div>
                        <div className='alignRight'>CLP $ {p.precio_pedido*p.cantidad}</div>
                    </React.Fragment>
                ))}
                <div className='reverseHeader'></div>                
                <div className='reverseHeader'></div>                
                <div className='reverseHeader alignRight'>Total</div>
                <div className='reverseHeader alignRight'> CLP $ {total(productos)}</div>
            </div>
        )
    }

    renderDetallPago = (transaction) => {
        return (
            <div className='contPedidosGrid contInfoPago'>
                <div className='supraHeader supraHeaderPago'> Información del pago </div>
                <div className='header line_bottom'>Autenticación bancaria</div>
                <div className='line_bottom'><ErroresAutenticacion code={transaction.vci} /></div>
                <div className='header line_bottom'>Monto</div>
                <div className='line_bottom'>CLP ${transaction.amount}</div>
                <div className='header line_bottom'>Estado de transacción</div>
                <div className='line_bottom'>{transaction.status}</div>
                <div className='header line_bottom'>Últimos 4 dígitos de la tarjeta</div>
                <div className='line_bottom'>{transaction.card_detail}</div>
                <div className='header line_bottom'>Fecha de autorización de transacción</div>
                <div className='line_bottom'>{transaction.accounting_date}</div>
                <div className='header line_bottom'>Fecha y hora de autorización de transacción</div>
                <div className='line_bottom'>{transaction.transaction_date}</div>
                <div className='header line_bottom'>Código de autorización transbank</div>
                <div className='line_bottom'>{transaction.authorization_code}</div>
                <div className='header line_bottom'>Tipo de pago</div>
                <div className='line_bottom'> <TiposTargeta code={transaction.payment_type_code} /> </div>
                <div className='header line_bottom'>Respuesta de autorización</div>
                <div className='line_bottom'><ErroresTransaction num={transaction.response_code} /></div>
                { transaction.installments_amount 
                ? 
                <React.Fragment>
                    <div className='header line_bottom'>Monto de cuota</div>
                    <div className='line_bottom'> CLP $ {transaction.installments_amount}</div> 
                </React.Fragment>
                : 
                null }
                <div className='header'>Cantidad de cuotas</div>
                <div className=''>{transaction.installments_number}</div>
            </div>
        )
    }


    renderDatosEnvio = (pedido) => {
        return (
            <div className='contPedidosGrid contInfoPago'>
                <div className='supraHeader supraHeaderPago'> Información del envío </div>
                <div className='header line_bottom'>Dirección de entrega</div>
                <div className='line_bottom'>{pedido.valid_address}</div>
                <div className='header line_bottom'>Número de contacto</div>
                <div className='line_bottom'>{pedido.numContact}</div>
                <div className='header line_bottom'>lat</div>
                <div className='line_bottom'>{pedido.lat}</div>
                <div className='header line_bottom'>lng</div>
                <div className='line_bottom'>{pedido.lng}</div>
            </div>
        )
    }



    render() {
        const { pedido } = this.state;
        if (pedido){
            return (
                <div className='contPedidoFounded'>
                    <div>
                        {this.renderResumen(pedido.transaction)}
                        <br></br>
                        <br></br>
                        {this.renderPedido(pedido)}
                        <br></br>
                        <br></br>
                        {this.renderProdctosPedido(pedido.productos)}
                        <br></br>
                        <br></br>
                        {this.renderDatosEnvio(pedido)}
                        <br></br>
                        <br></br>
                        {pedido.transaction && pedido.transaction.main_status ? this.renderDetallPago(pedido.transaction) : null}
                    </div>
                </div>
            )
        } else {
            return <div>No hay pedidos</div>
        } 

    }
} 

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (obj)=> dispatch(obj),
    }
  };


export default connect(null, mapDispatchToProps)(PedidoFounded);
