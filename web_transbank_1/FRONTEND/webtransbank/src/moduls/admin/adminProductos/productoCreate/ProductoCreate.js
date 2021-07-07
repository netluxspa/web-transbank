import React from 'react';
import Modal from '../../../../components/modal/Modal'
import history from '../../../../history'
import ProductoForm from '../productoForm/ProductoForm'
import api from '../../../../api';

class ProductoCreate extends React.Component {

    state = {errors: null}

    createProducto(producto){
        api.post('/commerce/producto/',
            producto,
            {headers: {'content-type':'application/json', 'site': localStorage.getItem('site'), 'adminkey': localStorage.getItem('adminkey')}}
        ).then(res=>history.goBack())
        .catch(err=>{
            if (err && err.response && err.response.data){
                this.setState({errors: err.response.data});
            }
        })
    }



    renderCategoriaCreate = () => {
        return (
            <ProductoForm submitProducto={(producto)=>this.createProducto(producto)} categoria={null} errors={this.state.errors} />
        )
        
    }

    render(){
        return  (
            <Modal 
                component={this.renderCategoriaCreate()} 
                titulo='Crear nuevo producto' 
                ondismiss={()=>history.goBack()}
            />
        )
    }
}

export default ProductoCreate;