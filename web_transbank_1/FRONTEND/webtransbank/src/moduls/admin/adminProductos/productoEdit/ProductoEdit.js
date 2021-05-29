import React from 'react';
import Modal from '../../../../components/modal/Modal'
import api from '../../../../api'
import history from '../../../../history'
import ProductoForm from '../productoForm/ProductoForm'


class ProductoEdit extends React.Component {

    constructor(props){
        super(props)
        this.state = {producto: null, errors: null}
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


    updateProducto(producto){
        console.log(producto)
        api.patch('/commerce/producto/' + producto.id +'/',
            producto,
            {headers: {'content-type':'application/json', 'site': localStorage.getItem('site'), 'adminkey': localStorage.getItem('adminkey')}}
        ).then(res=>history.goBack())
        .catch(err=>{
            if (err && err.response && err.response.data){
                this.setState({errors: err.response.data});
            }
        })
    }


    renderProductoEdit = (producto) => {
        if (producto){
            return (
                <ProductoForm submitProducto={(producto)=>this.updateProducto(producto)} producto={producto}  errors={this.state.errors}/>
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