
import React from 'react';
import Button from '@material-ui/core/Button';

import '../ProductoDetail.css'

const ImagenesProducto = ({producto}) => {

    const renderImagenes = (imagenes) => {
        return (
            <div style={{width: '100%'}}>
                <div style={{display: 'flex', flexDirection:'column', alignItems:'flex-end', borderBottom: 'solid 1px rgba(128, 128, 128, 0.26)'}}>  
                    <div>
                    <Button className='smallText ' variant="contained" size="small" color="primary">
                        Agregar
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

export default ImagenesProducto;