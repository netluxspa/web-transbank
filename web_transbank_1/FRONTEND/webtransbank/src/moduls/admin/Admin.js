import {  Route, Redirect } from 'react-router-dom';

import AdminHome from './adminHome/AdminHome'
import AdminTienda from './adminTienda/adminTienda'
import AdminCategoriasTienda2 from './adminCategoriasTienda2/AdminCategoriasTienda2'
import AdminProductos from './adminProductos/AdminProductos'
import AdminAuth from './adminAuth/AdminAuth';
import AdminEnvio from './adminEnvio/AdminEnvio';

import React from 'react';
import { connect, useDispatch } from 'react-redux';


import { ADD_TIENDA } from '../../actions/types';

import { useEffect } from 'react';

import api from '../../api';


const Admin = ({admin, tienda}) => {

    const dispatch = useDispatch();

    useEffect(()=>{
        if (!tienda){
            getTienda()
        }
    }, [tienda]);

    const getTienda = () => {
        const host = window.location.host;
        api.get(`/commerce/tienda/?pagina__codigo=${host}`,
        {headers: {"Content-Type": "application/json"}}
        ).then(res =>{
            if (res && res.data && res.data.length > 0){
                const tienda = res.data[0];
                dispatch({
                    type: ADD_TIENDA, 
                    payload: tienda
                })
            }
        });
    }
    
    return (
        <div>
            { (()=>{
                if (admin) {
                    return (
                        <React.Fragment>
                            <Route path='/admin/home'  component={AdminHome} />
                            <Route path='/admin/auth'><Redirect to="/admin/home" /></Route>
                            <Route path='/admin/tienda'  component={AdminTienda} />
                            <Route path='/admin/categorias-tienda'  component={AdminCategoriasTienda2} />
                            <Route path='/admin/productos-tienda'  component={AdminProductos} />
                            <Route path='/admin/envio'  component={AdminEnvio} />
                        </React.Fragment>
                    )
                } else if (admin == false) {
                    return (
                        <React.Fragment>
                            <Route  path="/admin"><Redirect to="/admin/auth/login" /></Route>
                            <Route path='/admin/auth'  component={AdminAuth} />
                        </React.Fragment>
                    )
                } else {
                    return (
                        'Cargando Admin'
                    )
                }
            })()}
        </div>
    )
}

const mapStateToPros = (state) => {
    return {
        admin: state.adminPagina, 
        tienda: state.tienda
    }
}

export default connect(mapStateToPros, {})(Admin);