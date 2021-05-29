import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Alert from '@material-ui/lab/Alert';


import CategoriaProducto from '../categoriaProducto/CategoriaPoducto'

import api from '../../../../api';

import './ProductoForm.css'

class ProductoForm extends React.Component {

    constructor(props){
        super(props)
        const {producto} = this.props;
        if (producto) {
            this.state = {id: producto.id, titulo: producto.titulo, url: producto.url, precio: producto.precio, categoria:producto.categoria, tienda: producto.tienda}
        } else {
            this.state = {titulo: '', precio: '', url: '',  categoria: null, tienda: null}
        }
    }

    componentDidMount() {
        this.getTienda();
    }

    getTienda(){
        api.get('/commerce/tienda/?pagina__codigo=' + localStorage.getItem('site'),
            {headers: {'content-type':'application/json'}}
        ).then(res=>this.setState({tienda: res.data[0].id}))
    }


    renderErrors = (errors) => {
        const keys = Object.keys(errors)
        console.log(keys)
        return (
        keys.map(k=>(
            <div>
                {errors[k].map(e=>(

                    <Alert severity="error">{k} - {e}</Alert>

                ))}
            </div>
        ))
        )
    }


    renderForm = () => {
        const {titulo, precio, categoria, url}=this.state;
        const {errors} = this.props;
        console.log('errors', errors)
        return(
            <div className='contFormCategoria'>

                <div>
                    <TextField
                        label="Titulo de producto"
                        variant="outlined"
                        onChange={e=>this.setState({titulo: e.target.value})} 
                        value={titulo}
                    />
                </div>
                <div>
                    <TextField
                        label="Url de producto"
                        variant="outlined"
                        onChange={e=>this.setState({url: e.target.value})} 
                        value={url}
                    />
                </div>
                <div>
                    <TextField
                        label="Precio"
                        variant="outlined"
                        onChange={e=>this.setState({precio: e.target.value})} 
                        value={precio}
                    />
                </div>
                <div>
                    <CategoriaProducto submitCategoria={(c)=>this.setState({categoria: c})} categoriaSelected={categoria} />
                </div>
    
                <br></br>
                <br></br>

                {errors ? this.renderErrors(errors): null}

                <br></br>
                <br></br>

                <div>
                    <div>
                        <Button onClick={()=>this.props.submitProducto(this.state)}  variant='contained' color="primary">
                            Guardar
                        </Button>
                    </div>

                </div>
            </div>
        )
    }

    render(){
        return this.renderForm()
    }
}

export default ProductoForm;