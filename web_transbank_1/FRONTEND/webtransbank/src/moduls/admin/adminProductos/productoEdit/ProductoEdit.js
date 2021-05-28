import React from 'react';
import Modal from '../../../../components/modal/Modal'
import api from '../../../../api'
import history from '../../../../history'
import ProductoForm from '../productoForm/ProductoForm'


class ProductoEdit extends React.Component {

    constructor(props){
        super(props)
        this.state = {producto: null}
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        this.getProducto(id)
    }

    getProducto(id){
        api.get('/commerce/producto/' + id,
            {headers: {'content-type': 'application/json'}}
        ).then(res=>{
            this.setState({producto: res.data})
        })
    }


    updateProducto(newProducto){
        console.log('categoria a crear', newProducto)

        api.patch('/commerce/categoria/' + newProducto.id +'/',
            newProducto,
            {headers: {'content-type':'application/json', 'site': localStorage.getItem('site'), 'adminkey': localStorage.getItem('adminkey')}}
        ).then(res=>history.push('/admin/productos-tienda'))
    }


    renderProductoEdit = (producto) => {
        if (producto){
            return (
                <ProductoForm submitCategoria={(newCategoria)=>this.updateCategoria(newCategoria)} producto={producto} />
            )
        } else {
            return 'loading';
        }

        
    }


    render(){
        const {producto} = this.state;
        return (
            <Modal 
                component={this.renderProductoEdit(producto)} 
                titulo='Actualizar un producto' 
                ondismiss={()=>history.push('/admin/productos-tienda')}
            />
        )
    }
}

export default ProductoEdit;