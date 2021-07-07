import { connect } from 'react-redux';

import GoLogin from './goLogin/GoLogin';
import DataEnvio from './dataEnvio/DataEnvio';
import PanelEnvio from './stepsBorfer/StepsBorfer';
import EnvioSteps from './envioSteps/EnvioSteps';

const DatosEnvio2 = ({user}) => {

    const isLogin = user => {
        if (user){
            return  <DataEnvio />
        } else {
            return <GoLogin />
        }
    }

    return (
        <div>
            {isLogin(user)}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user: state.userPagina
    }
}

export default connect(mapStateToProps, {})(DatosEnvio2);