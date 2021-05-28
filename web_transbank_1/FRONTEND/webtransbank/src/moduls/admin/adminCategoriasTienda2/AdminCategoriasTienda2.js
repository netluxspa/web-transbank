import {  Route } from 'react-router-dom';

import CategoriasList from './categoriasList/CategoriasList'
import CategoriaDelete from './categoriaDelete/CategoriaDelete'

import CategoriaCreate from './categoriaCreate/CategoriaCreate';
import CategoriaEdit from './categoriaEdit/CategoriaEdit';

const AdminCategoriasTienda2 = () => {
    
    return (
        <div>
            <Route path='/admin/categorias-tienda' exact component={CategoriasList} />
            <Route path='/admin/categorias-tienda/delete/:id' exact component={CategoriaDelete} />
            <Route path='/admin/categorias-tienda/new' exact component={CategoriaCreate} />
            <Route path='/admin/categorias-tienda/edit/:id' exact component={CategoriaEdit} />
        </div>
    )
}

export default AdminCategoriasTienda2;