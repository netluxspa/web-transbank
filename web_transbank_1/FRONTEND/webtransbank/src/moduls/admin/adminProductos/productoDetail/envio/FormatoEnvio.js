import { Typography, Button } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';

import { SELECT_ADMIN_PRODUCT } from '../../../../../actions/types';
import api from '../../../../../api';
import AdminHeaders from '../../../../../globalComponents/adminHeaders.js/AdminHeaders';

import FormatoEnvioShow from './crud/FormatoEnvioShow';
import FormatoEnvioEdit from './crud/FormatoEnvioEdit';
import FormatoEnvioCreate from './crud/FormatoEnvioCreate';






class FormatoEnvio extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            producto: null,
            selectedComponent: 1
        }
    }

    componentOptions = (producto) => {
        return {
            1: <FormatoEnvioShow producto={producto} go={o=>this.setState({selectedComponent: o})}/>,
            2: <FormatoEnvioEdit producto={producto} go={o=>this.setState({selectedComponent: o})} sendData={d=>this.recibeData(d)}/>,
            3: <FormatoEnvioCreate producto={producto} go={o=>this.setState({selectedComponent: o})} sendData={d=>this.recibeData(d)}/>,
        }
    }


    recibeData = d => {
        var newProducto = {...this.state.producto};
        newProducto.formato_envio = d;
        this.setState({producto: newProducto})
        this.props.dispatch({type: SELECT_ADMIN_PRODUCT, payload: newProducto})
        setTimeout(() => {
            this.setState({selectedComponent: 1})
        }, 3000);
    }

    componentDidMount(){
       const { producto, id} = this.props;
        if (!producto){
            this.getProducto(id)
        } else {
            this.setState({producto: producto})
        }
    }

    getProducto = (id) => {
        const headers = AdminHeaders();
        api.get('/commerce/producto/' + id + '/', 
            headers
        ).then(res=>{
            console.log(res)
        })
    }



    renderReturn = (producto) => {

        const { selectedComponent } = this.state

        return (
            <div>            
                
                {this.componentOptions(producto)[selectedComponent]}

            </div>
        )
    }


    render() {
        const { producto } = this.state;



        return (
            this.renderReturn(producto)
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (obj)=> dispatch(obj),
    }
  };
  
  
export default connect(null, mapDispatchToProps)(FormatoEnvio);

