import React from 'react'
import { Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

import history from '../../history'
import api from '../../api'

import PedidosCliente from './components/pedidosCliente/PedidosCliente'





class Clientes extends React.Component {

    constructor(props){
        super(props)
        this.state = {user: null}
    }

    getUser = () => {
        api.get('/pagina/get-user/', 
        {headers: {"content-type": "application/json", "site": localStorage.getItem('site'), 'userkey': localStorage.getItem('userkey')}}
        ).then(res=>{
            if (res && res.data) {
                this.setState({user:res.data})
            }
        }).catch(err=>{
            history.push('/auth')
        })
    }

    componentDidMount() {
        this.getUser();
    }

    renderReturn = () => {
        return (
            <React.Fragment>
                { this.props.userPagina ?
                <React.Fragment>
                    <Route exact  path="/clientes">
                        <Redirect to="/clientes/pedidos" />
                    </Route>
                    <Route path='/clientes/pedidos' component={()=> <PedidosCliente user={this.state.user} />}></Route>
                </React.Fragment>
                :
                null
                }
               
            </React.Fragment>
        )
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