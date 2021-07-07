import React from "react";
import { connect } from 'react-redux';
import {  Route , Redirect } from 'react-router-dom';

import Modal from "../../../../components/modal/Modal";
import history from "../../../../history";
import api from "../../../../api";

import PositionShow from "./positionCDCrud/PositionShow";
import PositionCreate from "./positionCDCrud/PositionCreate";
import PositionEdit from "./positionCDCrud/PositionEdit";



// LA FUNCION DE ESTE MODULO ES PODER REALIZAR EL CRUD DE LA TABLA CONFIGLOGISTICA DE LA TIENDA 


class LogisticaConfig extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            data: null,
            error: false
        }
    }


    componentDidMount() {
      this.getData();
    }

    getData = () => {
        const { tienda } = this.props;
        if (tienda){
            api.get('/commerce/config-logistica/?tienda=' + tienda.id, 
            {headers: {'content-type':'application/json', 'site':localStorage.getItem('site'), 'adminkey': localStorage.getItem('adminkey')}}
        ).then(res=>{
            this.setState({data: res.data})
        }).catch(()=>this.setState({error: true}))
        }
    }


    renderPosition = (data, error) => {
        if (error) {    
            return 'Error al obtener los datos';
        } else {
            if (!data) {
                return 'Cargando ...'
            } else {
                return <PositionShow data={data} />;
            }
        }
    }

    recibeData = d => {
        var newData = []
        newData.push(d)
        this.setState({data: newData})
        history.push('/admin/envio/config-logistica')
    }


    renderReturn = () => {
        const { data, error } = this.state;
        const { isExact } = this.props.match;
        return (
            <div>
                {
                    isExact ?
                    this.renderPosition(data, error)
                    :
                    <div style={{padding:'20px'}}>
                         <Route  path='/admin/envio/config-logistica/create' exact component={()=> <PositionCreate sendData={d=>this.recibeData(d)} />} />
                         <Route  path='/admin/envio/config-logistica/edit' exact component={()=> <PositionEdit sendData={d=>this.recibeData(d)} />} />
                    </div>
                }               
            </div>
        )
    }

    render(){
        return (
            <Modal 
                component={this.renderReturn()} 
                titulo={'Posición centro distribución'} 
                ondismiss={()=>history.goBack()}
            />
        
        )
    }
}

const mapStateToProps = state => {
    return {
        tienda: state.tienda
    }
}

export default connect(mapStateToProps, {})(LogisticaConfig);
