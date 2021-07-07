
import React from 'react';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import '../../ProductoDetail.css'
import { useDispatch } from 'react-redux';
import { SELECT_ADMIN_PRODUCT_IMAGE } from '../../../../../../actions/types'
import { connect } from 'react-redux';;

const ImagenesProducto = ({producto, emitSelected, editImage}) => {

    const dispatch = useDispatch();

    const renderImagenes = (imagenes) => {
        return (
            <div style={{width: '100%'}}>
                <div style={{display: 'flex', flexDirection:'column', alignItems:'flex-end', borderBottom: 'solid 1px rgba(128, 128, 128, 0.26)'}}>  
                    <div>
                    <Button onClick={()=>emitSelected(1)} className='smallText ' variant="contained" size="small" color="primary">
                        Agregar {imagenes.length}
                    </Button>
                    </div>
                    <div style={{height: '10px'}}></div>
                </div>
                <div style={{height: '30px'}}></div>
                <div style={{display: 'grid', gridTemplateColumns:'1fr 1fr 1fr'}} className="grid grid-3cols">
 
                    {imagenes.map(i=>(
                        <React.Fragment>
                            <div  className='m-w-100'>
                                <img style={{maxHeight: '200px', borderRadius:'4px'}} className='m-w-100' src={i.imagen} />
                                <div>
                                <Button 
                                    onClick={()=>{dispatch({type: SELECT_ADMIN_PRODUCT_IMAGE, payload: i}); emitSelected(2)}} 
                                    className='smallText ' variant="outlined" size="small" color="primary">
                                    
                                    <EditIcon />
                                </Button>
                                </div>
                            </div>
                            
                        </React.Fragment>
                    ))}

                </div>
            </div>
        )
      
    }


    return (
        renderImagenes(producto.imagenes)
    )
}

const mapStateToProps = state => {
    return {
        producto: state.productoAdmin
    }
}

export default connect(mapStateToProps, {})(ImagenesProducto);