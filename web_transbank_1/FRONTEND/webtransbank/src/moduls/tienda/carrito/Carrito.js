import React from 'react'
import { connect } from 'react-redux';
import './carritoStyles.css'
import ProductoCarrito from './productoCarrito/ProductoCarrito'

class Carrito extends React.Component {

    constructor(props){
        super(props)
    }

    renderProductos = () =>{
        if (this.props.productos.length > 0){
            return (
                this.props.productos.map((p,i)=>(
                    <div className='contProductosCarrito' key={i}><ProductoCarrito producto={p} /></div>
                ))
            )
        } else {
            return null
        }

    } 

    renderReturn = () => {
        return (
            <div className='container'>
                <div className='productos'>
                    {this.renderProductos()}
                </div>
                <div className='pagar'>
                    <div>pagar</div>
                </div>
                <div className='envio'>envio</div>
            </div>
        )
    }

    render() {
        return this.renderReturn()
    }

}

const mapStateToProps = state => {
    return {
        productos: Object.values(state.carrito)
    }
}


export default connect(mapStateToProps, {})(Carrito)