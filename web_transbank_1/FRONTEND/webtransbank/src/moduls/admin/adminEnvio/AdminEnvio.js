import React from 'react';
import {  Route,Redirect } from 'react-router-dom';
import Modal from '../../../components/modal/Modal';
import history from '../../../history';

import LogisticaConfig from './logisticaConfig/LogisticaConfig';
import OptionsEnvio from './optionsEnvio/OptionsEnvio';
import PoliticaEnvio from './politicaEnvio/PoliticasEnvio';
import CajasModule from './cajasModule/CajasModule';

const AdminEnvio = () => {




        return (
            <React.Fragment>
                <Route  path='/admin/envio/config-logistica'   component={LogisticaConfig}/>
                <Route  path='/admin/envio/politica-envio'   component={PoliticaEnvio}/>
                <Route  path='/admin/envio/cajas'   component={CajasModule}/>
                <Route  path='/admin/envio' exact  component={OptionsEnvio }/>
            </React.Fragment>
        )

    
}


export default AdminEnvio;