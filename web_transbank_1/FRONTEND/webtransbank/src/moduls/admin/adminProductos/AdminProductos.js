import {  Route } from 'react-router-dom';

import ProductosList from './productosList/ProductosList';
import ProductoCreate from './productoCreate/ProductoCreate';
import ProductoEdit from './productoEdit/ProductoEdit';
import ProductoDetail from './productoDetail/ProductoDetail';
// import CategoriaDelete from './categoriaDelete/CategoriaDelete'
// import CategoriaCreate from './categoriaCreate/CategoriaCreate';
// import CategoriaEdit from './categoriaEdit/CategoriaEdit';

const AdminProductos = () => {
    
    return (
        <div>
            <Route path='/admin/productos-tienda' exact component={ProductosList} />
            <Route path='/admin/productos-tienda/new' exact component={ProductoCreate} />
            <Route path='/admin/productos-tienda/edit/:id' exact component={ProductoEdit} />
            <Route path='/admin/productos-tienda/detail/:id'  component={ProductoDetail} />

            {/* <Route path='/admin/categorias-tienda/delete/:id' exact component={CategoriaDelete} />
            <Route path='/admin/categorias-tienda/new' exact component={CategoriaCreate} />
            <Route path='/admin/categorias-tienda/edit/:id' exact component={CategoriaEdit} /> */}
        </div>
    )
}

export default AdminProductos;