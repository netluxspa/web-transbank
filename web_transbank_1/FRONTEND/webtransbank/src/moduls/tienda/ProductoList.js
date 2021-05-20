import React from 'react';
import Album from '../../globalComponents/Album'


const ProductosList = ({productos, categoriaSelectedId, categorias, tienda, selectCategoria}) => {



    const renderProducts = (productos) => {
        if (!categoriaSelectedId){
            return productos
        } else {
            return productos.filter(p=>p.categoria === categoriaSelectedId)
        }
    }


    return (
        <Album 
            tienda={tienda}
            productos={renderProducts(productos)} 
            selectCategoria={(c)=>selectCategoria(c)}
            categoriaSelectedId = {categoriaSelectedId}
            categorias={categorias}
        />
        )
        
  
}

export default ProductosList;