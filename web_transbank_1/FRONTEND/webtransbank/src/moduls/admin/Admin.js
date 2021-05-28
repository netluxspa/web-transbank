import {  Route, Redirect } from 'react-router-dom';

import AdminHome from './AdminHome'
import AdminTienda from './adminTienda/adminTienda'
import AdminCategoriasTienda2 from './adminCategoriasTienda2/AdminCategoriasTienda2'
import AdminProductos from './adminProductos/AdminProductos'
import AdminAuth from './adminAuth/AdminAuth';


import React from 'react';
import { connect } from 'react-redux';




const Admin = ({admin}) => {
    
    return (
        <div>
            {!admin ?  
            <React.Fragment>
                <Route  path="/admin"><Redirect to="/admin/auth/login" /></Route>
                <Route path='/admin/auth'  component={AdminAuth} />
            </React.Fragment>
            : 
            <React.Fragment>
                <Route path='/admin/home' exact component={AdminHome} />
                <Route path='/admin/auth'><Redirect to="/admin/home" /></Route>
                <Route path='/admin/tienda' exact component={AdminTienda} />
                <Route path='/admin/categorias-tienda'  component={AdminCategoriasTienda2} />
                <Route path='/admin/productos-tienda'  component={AdminProductos} />
            </React.Fragment>
            }
        </div>
    )
}

const mapStateToPros = (state) => {
    return {
        admin: state.adminPagina
    }
}

export default connect(mapStateToPros, {})(Admin);