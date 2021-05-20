import {  Route, Redirect } from 'react-router-dom';
import AdminHome from './AdminHome'
import AdminTienda from './adminTienda/adminTienda'
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