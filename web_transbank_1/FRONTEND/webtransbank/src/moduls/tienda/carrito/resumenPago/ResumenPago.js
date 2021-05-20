import React from 'react';
import { connect } from 'react-redux'
import './resumenPagoStyles.css'
import Chip from '@material-ui/core/Chip';
import history from '../../../../history'

class ResumenPago extends React.Component {
    
    renderTotal = () => {
        const { productos } =this.props
        var total = 0;
        for (let index = 0; index < productos.length; index++) {
            const element = productos[index];
            total += element.precio * element.cantidad
        }
        return total;
    }

    renderResumen = () =>{
        const { productos } =this.props
        return(
            <div className='contResumenPago'>
                    <div className='contResumenPagoHeaders'>
                        <div>Producto</div>
                        <div style={{textAlign:"right"}}>Cantidad</div>
                        <div style={{textAlign:"right"}}>Precio</div>
                    </div>
                {productos.map(p=>(
                    <div className='contResumenPagoItem' key={p.producto}>
                        <div>{p.titulo}</div>
                        <div style={{textAlign:"right"}}>{p.cantidad}</div>
                        <div style={{textAlign:"right"}}>{p.precio}</div>
                    </div>
                ))}
                                    
                <div className='total'>
                    <div>Total</div>
                    <div style={{textAlign:"right"}}>{this.renderTotal()}</div>
                </div>

            </div>
        )
    }

    renderDatosComprador = () => {
        const {userPagina} = this.props;
        if (userPagina){
            return (
                <div className='contDatosComprador'>
                    <div className='contDatosCompradorHeaders'>
                        <div>Cliente</div>
                        <div>Correo notificaciones</div>
                    </div>
                    <div className='contDatosCompradorData'>
                        <div>{userPagina.nombre}</div>
                        <div>{userPagina.email}</div>
                    </div>
                    <div className='contDatosCompradorModificar'>
                        <Chip onClick={()=>history.push('/auth/edituser')} size="small" label="Cambiar" />
                    </div>
                </div>
            )
        } else {
            return null;
        }

    }

    render(){
        const { productos } =this.props
        return(
            <React.Fragment>
                {this.renderResumen()}
                <br></br>
                <br></br>
                {this.renderDatosComprador()}
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        productos: Object.values(state.carrito),
        userPagina : state.userPagina
    }
}

export default connect(mapStateToProps, )(ResumenPago);