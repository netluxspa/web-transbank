
import React from 'react';
import '../ProductoDetail.css'

const ImagenesProducto = ({producto}) => {

    const renderImagenes = (imagenes) => {
        return (
            <div style={{display: 'grid', gridTemplateColumns:'1fr 1fr 1fr'}} className="grid grid-3cols">

                {imagenes.map(i=>(
                    <React.Fragment>
                        <div  className='m-w-100'>
                            <img style={{maxHeight: '200px', borderRadius:'4px'}} className='m-w-100' src={i.imagen} />
                        </div>
                        
                    </React.Fragment>
                ))}

            </div>
        )
      
    }


    return (
        renderImagenes(producto.imagenes)
    )
}

export default ImagenesProducto;