import React from 'react';
import api from '../../../../api'
import TablaPedidosCliente2 from './TablaPedidosCliente2'
import  { connect } from 'react-redux';

class PedidosCliente extends React.Component {

    constructor(props){
        super(props)
        
        this.state = {pedidos: null}
        
    }

    componentDidMount() {
        const {userPagina} = this.props
        this.getPedidosUser(userPagina)
        
    }

    getPedidosUser(user){
        const headers = {headers: {"content-type": 'application/json', 'site': localStorage.getItem('site'), 'userkey':localStorage.getItem('userkey')}}
        api.get('/commerce/pedido/?userPagina=' + user.id , 
            headers
        ).then(res=>{
            if (res && res.data){
                this.setState({pedidos: res.data})
                console.log('this.state', res.data)
            }
        })
    }

    render(){
        const {pedidos} = this.state;

        if (pedidos){
            if (pedidos.length > 0){
               return   <TablaPedidosCliente2 pedidos={pedidos} />
            }else{
                return 'No hay pedidos en el historial'
            }
        } else {
            return 'loading'
        }

    }

}

const mapStateToProps = state => {
    return {
        userPagina: state.userPagina
    }
}

export default connect(mapStateToProps, {})(PedidosCliente);