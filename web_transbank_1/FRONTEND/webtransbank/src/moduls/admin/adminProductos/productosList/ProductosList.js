import { connect } from 'react-redux';
import { SELECT_ADMIN_PRODUCT,SELECT_ADMIN_PRODUCT_OPTION } from '../../../../actions/types'

import React from 'react';
import Modal from '../../../../components/modal/Modal'


import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import Typography from '@material-ui/core/Typography';

import MenuItem from '@material-ui/core/MenuItem';

import Menu from './Menu';



import history from '../../../../history'

import api from '../../../../api'

import './ProductosList.css'
import { positions } from '@material-ui/system';




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

    goEditProducto = p => {
        if (this.props.productoSelected && p.id !== this.props.productoSelected.id){
            this.props.dispatch({type:SELECT_ADMIN_PRODUCT_OPTION, payload: null});
        }
        this.props.dispatch({type:SELECT_ADMIN_PRODUCT, payload: p});
        history.push(`/admin/productos-tienda/detail/${p.id}`);
    }

    renderProductosList = (productos) => {
        return (
            <div className='gridProductos'>
                <div style={{display: 'flex',  position:'sticky', right:'0'}}>  
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
                                <Typography style={{textAlign:'right'}} color="textSecondary">
                                    precio
                                </Typography>
                            </div>
                            <div className='options'></div>
                        </div>
                { productos.map(p=>(
                        <div className='item' key={p.id}>
                            <div className='content'>
                                <Typography style={{fontSize:'0.9em'}} color="textPrimary">
                                    {p.titulo}
                                </Typography>
                            </div>
                            <div className='content'>
                                <Typography style={{fontSize:'0.9em'}} color="textPrimary">
                                {p.categoria_detail && p.categoria_detail.titulo ? p.categoria_detail.titulo : 'No '}
                                </Typography>
                            </div>
                            <div className='content'>
                                <Typography style={{fontSize:'0.9em', textAlign:'right'}} color="textPrimary">
                                    $ {p.precio}
                                </Typography>
                            </div>  
                            <div className='options'> 

                                <Menu 
                                    goMainEditProducto={()=>history.push(`/admin/productos-tienda/edit/${p.id}`)}
                                    goEspecificEditProducto={()=>this.goEditProducto(p) }
                                />

                                {/* <Button onClick={()=>history.push(`/admin/productos-tienda/edit/${p.id}`)} className='smallText' style={{marginRight:'10px'}} variant="outlined" size="small" color="primary">
                                    <EditIcon />
                                </Button>
                                <Button onClick={()=>this.goEditProducto(p) } className='smallText'  variant="outlined" size="small" color="secondary">
                                        <ViewComfyIcon />
                                </Button> */}
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
                return (
                    <div>
                         <div style={{display: 'flex', justifyContent:'flex-end'}}>  
                            <Button onClick={()=>history.push('/admin/productos-tienda/new')} className='smallText' variant="contained" size="small" color="primary">
                                Crear
                            </Button>
                        </div>
                        <div>
                            No hay productos creados
                        </div>
                    </div>
                )
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
                ondismiss={()=>history.goBack()}
            />
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (obj)=> dispatch(obj)
    }
};

const mapStateToProps = state => {
    return {
        productoSelected: state.productoAdmin
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductosList);



