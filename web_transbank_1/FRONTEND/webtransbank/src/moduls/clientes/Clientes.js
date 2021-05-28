import React from 'react'
import { Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

import history from '../../history'
import api from '../../api'

import PedidosCliente from './components/pedidosCliente/PedidosCliente'





class Clientes extends React.Component {

    constructor(props){
        super(props)
    }

    renderReturn = () => {
        const {userPagina} = this.props;
        console.log(userPagina)
        if (userPagina && userPagina.hasOwnProperty('id')){
            return (
                <React.Fragment>
                    <Route exact path="/clientes">
                        <Redirect to="/clientes/pedidos" />
                    </Route>
                    <Route path='/clientes/pedidos' component={PedidosCliente} />
                </React.Fragment>
            )
        }else if (userPagina == null) {
            history.push('/auth')
            return 'null'
        } else{
            return 'loading'
        }
       
    }

    render(){
        return (this.renderReturn())
    }
}


const mapStateToProps = (state) => {
    return {
        userPagina: state.userPagina
    }
}


export default connect(mapStateToProps, {})(Clientes);