import React from 'react';

import { connect } from 'react-redux';

import Modal from '../../../../../components/modal/Modal';
import history from '../../../../../history';
import api from '../../../../../api';



import { Typography, Button } from '@material-ui/core';



class PositionShow extends React.Component {

    constructor(props){
        super(props);
    }

    showData = (e) => {
        const data = e[0];
        return (
            <div>
                {data.address}
            </div>
        )
    }

    notData = () => {
        return (
            <div>
                <Typography color='textPrimary'>No hay una ubicación definida.</Typography>
                
            </div>
        )
    }



    renderReturn = () => {

        var { data } = this.props;
        if (!data.length){
            data = null
        }

        return (

            <div>
                <div>
                    <Button 
                        color='primary'
                        variant='contained'
                        size='small'
                        onClick={()=>{
                        history.push(
                            `${ data ? '/admin/envio/config-logistica/edit' : '/admin/envio/config-logistica/create' }`
                            );
                        }}>

                        { !data ? 'Definir ubicación' : 'Cambiar ubicación' }
                    </Button>
                </div>
                <br></br>
                <div>
                   { data ? this.showData(data) : this.notData() }
                </div>
            </div>

        )
    }

    render() {
        return (
            this.renderReturn()
        )
    }

}

const mapStateToProps = state => {
    return {
        tienda: state.tienda
    }
}

export default connect(mapStateToProps, {})(PositionShow);