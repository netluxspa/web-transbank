import React from 'react';
import Modal from '../../../../components/modal/Modal'

import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';



import history from '../../../../history'

import api from '../../../../api'

import './ProductosList.css'




class ProductosList extends React.Component {

    constructor(props){
        super(props);
        this.state = {productos: null}
    }

    componentDidMount(){
        this.getProductos()
    }

    getProductos = () => {
        api.get('/commerce/tienda/?pagina__codigo=' + localStorage.getItem('site'),
        {headers: {'content-type': 'application/json'}}
        ).then(res=>{
            console.log(res)
            const tienda = res.data[0];
            api.get('commerce/producto/?tienda=' + tienda.id , 
                {headers: {'content-type': 'application/json'}}
            ).then(res=>{
                console.log(res)
                this.setState({productos: res.data})
            })
        })
    }


    renderProductosList = (productos) => {
        return (
            <div className='gridProductos'>
                <div style={{display: 'flex', justifyContent:'flex-end'}}>  
                    <Button onClick={()=>history.push('/admin/productos-tienda/new')} className='smallText' variant="contained" size="small" color="primary">
                        Crear
                    </Button>
                </div>
                <div className='item' >
                            <div className='content'>
                                <Typography color="textSecondary">
                                    ítem
                                </Typography>
                            </div>
                            <div className='content'>
                                <Typography color="textSecondary">
                                    categoría
                                </Typography>
                            </div>
                            <div className='content'>
                                <Typography color="textSecondary">
                                    precio
                                </Typography>
                            </div>
                            <div className='options'></div>
                        </div>
                { productos.map(p=>(
                        <div className='item' key={p.id}>
                            <div className='content'>{p.titulo}</div>
                            <div className='content'>{p.categoria.titulo}</div>
                            <div className='content'>{p.precio}</div>
                            <div className='options'> 
                                <Button onClick={()=>history.push(`/admin/productos-tienda/edit/${p.id}`)} className='smallText' style={{marginRight:'10px'}} variant="outlined" size="small" color="primary">
                                    <EditIcon />
                                </Button>
                                <Button onClick={()=>history.push(`/admin/categorias-tienda/delete/${p.id}`)} className='smallText'  variant="outlined" size="small" color="secondary">
                                        <DeleteIcon />
                                </Button>
                            </div>
                        </div>
                ))}
            </div>
        )
    } 


    render2= () => {
        const {productos} = this.state;
        if (productos) {
            if (productos.length == 0){
                return 'No hay productos creados'
            } else {
                return(
                   this.renderProductosList(productos)
                )
            }
        } else {
            return 'loading'
        }
    }

    render(){
        return (
            <Modal 
                component={this.render2()} 
                titulo='Edición de productos de la tienda' 
                ondismiss={()=>history.push('/tienda')}
            />
        )
    }
}


export default ProductosList;