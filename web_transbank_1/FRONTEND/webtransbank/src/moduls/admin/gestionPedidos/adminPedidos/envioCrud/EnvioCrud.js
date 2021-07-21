import Modal from "../../../../../components/modal/Modal";
import history from "../../../../../history";
import {  Route, Redirect } from 'react-router-dom';


import EnvioCreate from "./EnvioCreate";
import EnvioShow from "./EnvioShow";


const EnvioCrud = ({match}) => {


    const renderReturn = () => {
        const {path} = match; 
        return (
            <div>
                <Route path={path + '/create'} component={EnvioCreate} />
                <Route path={path + '/show/:id'} component={EnvioShow} />
            </div>
        )
    }


    return (
        <Modal 
            component={renderReturn()} 
            titulo={'Módulo de envíos'} 
            ondismiss={()=>history.goBack()}
        />
        )
}

export default EnvioCrud;