import React from 'react'

import { connect } from 'react-redux';

import api from '../../../../api'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import './productoCarritoStyle.css'
import { ADD_CARRITO, REMOVE_CARRITO } from '../../../../actions/types'
import history from '../../../../history'


class ProductoCarrito extends React.Component {

    constructor(props){
        super(props);
        this.state = {producto: null, cantidad: this.props.producto.cantidad}
    }

    componentDidMount(){
        this.getProducto();

    }

    getProducto = () => {
        api.get('/commerce/producto/' + this.props.producto.producto)
        .then(res=>{
            if (res.data){
                console.log(res.data)
                this.setState({producto: res.data})
            }
        })
    }

    addItem = () =>{
        this.setState({cantidad: this.state.cantidad + 1})
        this.props.dispatch({type: ADD_CARRITO, payload: {producto: this.state.producto.id, titulo: this.state.producto.titulo, precio: this.state.producto.precio, cantidad: this.state.cantidad +1}})
    }


    removeItem = () => {
        if (this.state.cantidad > 1){
            this.setState({cantidad: this.state.cantidad -1})
            console.log(this.state)
            this.props.dispatch({type: ADD_CARRITO, payload: {producto: this.state.producto.id, titulo: this.state.producto.titulo, precio: this.state.producto.precio, cantidad: this.state.cantidad -1}})
        }
    }


    quitarDelCarro = () => {
        this.setState({producto: null, cantidad: null})
        this.props.dispatch({type: REMOVE_CARRITO, payload: this.state.producto.id})
    }

    renderReturn = () =>{
        const {producto, cantidad} = this.state;
        if (producto){
            return (
                <div className='productoCarritoCont'>
                    <div className='imagen'>
                        <img style={{width:"40px", height: "40px"}} src={producto.imagenes[0].imagen} alt='asd' />
                    </div>
                    <div className='titulo'>
                        <span>
                            {producto.titulo}
                        </span>
                    </div>
                    <div className='precio'>
                        <span style={{padding: "0 10px", whiteSpace: "nowrap"}}>
                            CLP $ {producto.precio}
                        </span>
                    </div>
                    <div className='cantidad'>
                        <RemoveCircleIcon  color={`${this.state.cantidad > 1 ? 'action': 'disabled'}`} onClick={()=>this.removeItem()} />
                            <p style={{padding:"0 10px", whiteSpace: "nowrap"}}>{cantidad}</p>
                        <AddCircleIcon  color="action" onClick={()=>this.addItem()} />
                    </div>
                    <div className='ver'>
                        <VisibilityIcon onClick={()=>history.push(`/tienda/producto/${producto.url}`)} color='action' />
                    </div>
                    <div className='remove'>
                        <DeleteIcon onClick={()=>this.quitarDelCarro()} color='action' />
                    </div>
                </div>
            )
        }else {
            return null;
        }
    }

    render(){
        return this.renderReturn()
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (obj)=> dispatch(obj)
    }
};


export default connect(null, mapDispatchToProps)(ProductoCarrito);