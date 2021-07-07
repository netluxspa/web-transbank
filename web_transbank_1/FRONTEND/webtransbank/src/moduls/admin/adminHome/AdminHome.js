import Panel from './Panel';
import Modal from '../../../components/modal/Modal';
import history from '../../../history';
import { connect } from 'react-redux';

const AdminHome = ({admin}) => {
    if (admin){
        return (
        <Modal 
        component={<Panel />} 
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