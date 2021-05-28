import React from 'react';
import Modal from '../../../../components/modal/Modal'
import history from '../../../../history'
import ProductoForm from '../productoForm/ProductoForm'
import api from '../../../../api';

class ProductoCreate extends React.Component {


    createCategoria(newCategoria){
        api.post('/commerce/categoria/',
            newCategoria,
            {headers: {'content-type':'application/json', 'site': localStorage.getItem('site'), 'adminkey': localStorage.getItem('adminkey')}}
        ).then(res=>history.push('/admin/categorias-tienda'))
    }



    renderCategoriaCreate = () => {
        return (
            <ProductoForm submitCategoria={(newCategoria)=>this.createCategoria(newCategoria)} categoria={null} />
        )
        
    }

    render(){
        return  (
            <Modal 
                component={this.renderCategoriaCreate()} 
                titulo='Crear nuevo producto' 
                ondismiss={()=>history.push('/admin/productos-tienda')}
            />
        )
    }
}

export default ProductoCreate;