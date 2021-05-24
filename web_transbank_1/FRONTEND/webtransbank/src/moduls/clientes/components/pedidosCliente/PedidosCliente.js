import React from 'react';
import api from '../../../../api'

class PedidosCliente extends React.Component {

    constructor(props){
        super(props)
        
    }

    componentDidMount() {
        const {user} = this.props
        console.log(user)
        this.getPedidosUser(user)
    }

    getPedidosUser(user){
        const headers = {headers: {"content-type": 'application/json', 'site': localStorage.getItem('site'), 'userkey':localStorage.getItem('userkey')}}
        api.get('/commerce/pedido/?userPagina=' + user.id , 
            headers
        ).then(res=>console.log(res))
    }

    render(){
        return (
            <div>PedidosCliente</div>
        )
    }

}

export default PedidosCliente;