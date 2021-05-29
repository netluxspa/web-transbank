
import { connect } from 'react-redux';

import Modal from '../../../../components/modal/Modal';
import history from '../../../../history';

import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';


import ProductoMain from './producto/ProductoMain'
import ImagenesProducto from './imagenes/ImagenesProducto';
import TextosProducto from './textos/TextosProducto';
import { useState } from 'react';
import './ProductoDetail.css';



const ProductoDetail = ({producto}) => {


    const options = [
        {
            id: 0,
            label: 'Producto',
            component: <ProductoMain producto={producto} />
        },
        {
            id: 1,
            label: 'Imagenes',
            component: <ImagenesProducto producto={producto} />
        },
        {
            id: 2,
            label: 'Textos',
            component: <TextosProducto producto={producto} />
        }
    ]

    const [selected, setSelected] = useState(options[0])


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
                            {producto.categoria_detail.titulo}
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
                            onClick={()=>setSelected(o)}
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
                {renderHeader(producto)}
           
         
                {renderOptions(options, selected)}
                <br></br>
                
                {renderContent(selected)}
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
        producto: state.productoAdmin
    }
}




export default connect(mapStateToProps, {})(ProductoDetail);