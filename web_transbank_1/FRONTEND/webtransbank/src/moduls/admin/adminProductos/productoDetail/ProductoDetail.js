
import { connect, useDispatch } from 'react-redux';
import {  Route } from 'react-router-dom';


import { SELECT_ADMIN_PRODUCT_OPTION } from '../../../../actions/types';
import { SELECT_ADMIN_PRODUCT } from '../../../../actions/types';

import Modal from '../../../../components/modal/Modal';
import history from '../../../../history';

import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';


import ProductoMain from './producto/ProductoMain'
import ImagenesProducto2 from './imagenes/ImagenesProducto2';
import TextosProducto from './textos/TextosProducto';
import FormatoEnvio from './envio/FormatoEnvio';

import api from '../../../../api';
import AdminHeaders from '../../../../globalComponents/adminHeaders.js/AdminHeaders';


import { useState, useEffect } from 'react';
import './ProductoDetail.css';



const ProductoDetail = ({producto, match, optionSelected}) => {

    const dispatch = useDispatch();

    const options = [
        {
            id: 0,
            label: 'Producto',
            component: <ProductoMain producto={producto} />
        },
        {
            id: 1,
            label: 'Imagenes',
            component: <ImagenesProducto2 producto={producto} />
        },
        {
            id: 2,
            label: 'Textos',
            component: <TextosProducto />
        },
        {
            id: 3,
            label: 'Envío',
            component: <FormatoEnvio producto={producto} id={match.params.id} />
        }
    ]

    const [selected, setSelected] = useState(options[0])

    const [productoActual, setProductoActual] = useState(null)


    useEffect(()=>{
        if (optionSelected){
            setSelected(optionSelected)
        } 

    },[optionSelected])


    useEffect(()=> {
        const productoProps = producto;
        const { id } = match.params;
        if (!productoProps){
            getProducto(id)
            
        } else {
            setProductoActual(productoProps)
        }
    });



    const getProducto = (id) => {
        const headers = AdminHeaders();
        api.get('/commerce/producto/' + id + '/', 
            headers
        ).then(res=>{
            setProductoActual(res.data);
            dispatch({type: SELECT_ADMIN_PRODUCT, payload: res.data})
        })
    }


    // useEffect(()=>{
    //         return (()=>{
    //             dispatch({type: SELECT_ADMIN_PRODUCT_OPTION, payload: null})
    //         })
    //     },[])

    const renderHeader = (producto) => {
        return (
            <div className='outlined '>
                <div className='grid grid-3col header'>
                    <div className='small-text'> 
                        <Typography style={{fontSize: '1em'}} color="textSecondary">
                            ítem
                        </Typography>
                    </div>
                    <div className='small-text'> 
                        <Typography style={{fontSize: '1em'}} color="textSecondary">
                            categoria
                        </Typography>
                    </div>
                    <div className='small-text'> 
                        <Typography style={{fontSize: '1em'}} color="textSecondary">
                            precio
                        </Typography>
                    </div>
                </div>
                <div className='grid grid-3col data'>
                    <div className='small-text'>
                        <Typography style={{fontSize: '1em'}} color="textPrimary">
                            {producto.titulo}
                        </Typography>
                    </div>
                    <div className='small-text'>
                        <Typography style={{fontSize: '1em'}} color="textPrimary">
                            { producto.categoria_detail ?  producto.categoria_detail.titulo : 'No'}
                        </Typography>
                    </div>
                    <div className='small-text'>
                        <Typography style={{fontSize: '1em'}} color="textPrimary">
                            {producto.precio}
                        </Typography>
                    </div>
                   
                </div>
            </div>
        )
    }


    const renderOptions = (options, selected) => {

        return (
            <div className='-f -f-c  padd-20-0-20-0'>
                {options.map(o=>(
                    <div className='padd-0-10'>
                        <Button  key={o.id}
                            onClick={()=>{setSelected(o); dispatch({type: SELECT_ADMIN_PRODUCT_OPTION, payload: o})}}
                            variant={
                                o.id === selected.id ?
                                'contained' :
                                'outlined'
                            }  
                            size="small" color="primary"
                        >
                            {o.label}
                        </Button>
                    </div>
                ))}
            </div>
        )
        
    }

    const renderContent = (selected) => {
        return selected.component
    }



    const renderReturn = () => {
        console.log(window.innerWidth)
        return (
            <div className={`${window.innerWidth > 760 ? 'padd-20-30':'padd-10-30'}`}>
                {productoActual ?  renderHeader(productoActual) : null}
           
         
                {selected ? renderOptions(options, selected): null}
                <br></br>
                
                {selected ? renderContent(selected): null}
            </div>
        )
    }

    return (
        <Modal 
            component={renderReturn()} 
            titulo='Edicion de detalles del producto' 
            ondismiss={()=>history.goBack()}
        />
    )
}

const mapStateToProps = (state) => {
    return {
        producto: state.productoAdmin,
        optionSelected: state.optionProductoAdmin
    }
}




export default connect(mapStateToProps, {})(ProductoDetail);