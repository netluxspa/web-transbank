import {  Route, Redirect } from 'react-router-dom';
import PreparacionEnvio from './gestionEnvios/preparacionEnvio/PreparacionEnvio';
import ProcesamientoEnvio from './gestionEnvios/procesamientoEnvios/ProcesamientoEnvios';
import SelectorEnvioProcesamiento from './gestionEnvios/procesamientoEnvios/SelectorEnvioProcesamiento';
import Modal from '../../../components/modal/Modal';

import history from '../../../history';

const GestionLogisticaModule = ({match}) => {

    const renderReturn = (
        <div>
            <Route path={match.path + '/preparar-envio'} exact component={()=> <PreparacionEnvio go={id=>history.push(match.path + '/procesamiento-envio/' + id)} />}></Route>
            <Route path={match.path + '/procesamiento-envio/:id'} exact component={ProcesamientoEnvio}></Route>
            <Route path={match.path + '/procesamiento-envio'} exact component={SelectorEnvioProcesamiento}></Route>
        </div>
    )

    return (
        <Modal 
            component={renderReturn}
            ondismiss={()=>history.goBack()}
            titulo='Gestión logística'
        />
    )
}

export default GestionLogisticaModule;