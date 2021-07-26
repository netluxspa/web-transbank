import Panel from './Panel';
import Modal from '../../../components/modal/Modal';
import history from '../../../history';
import { connect } from 'react-redux';
import NotificationPedido from '../gestionLogistica/components/NotificationPedido';

const renderReturn = (match) => {
    
    return (
        <div>
            <div>
                <NotificationPedido match={match} />
            </div>
            <br></br>
            <br></br>
            <div>
                <Panel />
            </div>
        </div>
    )
}

const AdminHome = ({admin, match}) => {
    if (admin){
        return (
        <Modal 
        component={renderReturn(match)} 
        titulo={'Administración de la tienda'} 
        ondismiss={()=>history.goBack()}
    />
        )
    }else{
        return null;
    }
}

const mapStateToProps = state => {
    return{
        admin: state.adminPagina
    }
}

export default connect(mapStateToProps, {})(AdminHome);