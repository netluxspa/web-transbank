import React from 'react';
import api from '../../../../api'
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
            {headers: {'content-type': 'application/json'}}
        ).then(res=>{
            console.log(res)
            if (res && res.data && res.data.length > 0){
                const pedido = res.data[0]
                this.setState({pedido: pedido})
            }
        })
    }

    renderPedido = (pedido) => {
        return (
            <div className='contPedidosGrid contInfoPedido'>
                <div className='supraHeader supraHeaderPedido'> Información del pedido </div>
                <div className='header line_bottom'>Fecha</div>
                <div className='header line_bottom'>Codigo</div>
                <div>{pedido.fecha}</div>
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
                        <div className='alignRight'>{p.precio_pedido}</div>
                        <div className='alignRight'>{p.cantidad}</div>
                        <div className='alignRight'>{p.precio_pedido*p.cantidad}</div>
                    </React.Fragment>
                ))}
                <div className='reverseHeader'></div>                
                <div className='reverseHeader'></div>                
                <div className='reverseHeader alignRight'>Total</div>
                <div className='reverseHeader alignRight'>{total(productos)}</div>
            </div>
        )
    }

    renderDetallPago = (transaction) => {
        return (
            <div className='contPedidosGrid contInfoPago'>
                <div className='supraHeader supraHeaderPago'> Información del pago </div>
                <div className='header line_bottom'>vci</div>
                <div className='line_bottom'>{transaction.vci}</div>
                <div className='header line_bottom'>amount</div>
                <div className='line_bottom'>{transaction.amount}</div>
                <div className='header line_bottom'>status</div>
                <div className='line_bottom'>{transaction.status}</div>
                <div className='header line_bottom'>card_detail</div>
                <div className='line_bottom'>{transaction.card_detail}</div>
                <div className='header line_bottom'>accounting_date</div>
                <div className='line_bottom'>{transaction.accounting_date}</div>
                <div className='header line_bottom'>transaction_date</div>
                <div className='line_bottom'>{transaction.transaction_date}</div>
                <div className='header line_bottom'>authorization_code</div>
                <div className='line_bottom'>{transaction.authorization_code}</div>
                <div className='header line_bottom'>payment_type_code</div>
                <div className='line_bottom'>{transaction.payment_type_code}</div>
                <div className='header line_bottom'>response_code</div>
                <div className='line_bottom'> {transaction.response_code}</div>
                <div className='header'>installments_number</div>
                <div className=''>{transaction.installments_number}</div>
            </div>
        )
    }



    render() {
        const { pedido } = this.state;
        if (pedido){
            return (
                <div className='contPedidoFounded'>
                    <div>
                        {this.renderPedido(pedido)}
                        <br></br>
                        <br></br>
                        {this.renderProdctosPedido(pedido.productos)}
                        <br></br>
                        <br></br>
                        {pedido.transaction ? this.renderDetallPago(pedido.transaction) : null}
                    </div>
                </div>
            )
        } else {
            return <div>No hay pedidos</div>
        } 

    }
} 

export default PedidoFounded;