import React from "react";
import { connect } from 'react-redux';
import {  Route, Redirect  } from 'react-router-dom';

import Modal from "../../../../components/modal/Modal";
import history from "../../../../history";
import api from "../../../../api";




import CajaList from "./cajaCrud/CajaList";
import CajaEdit from "./cajaCrud/CajasEdit";
import CajaCreate from "./cajaCrud/CajaCreate";
import CajaShow from "./cajaCrud/CajaShow";


import './cajaCrud/style.css'


class CajasModule extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            data: null,
            selectedData: null
        }
    }

    recibeList = (data) => {
        this.setState({data: data})
    }


    recibeData = (data) => {

        if (this.state.data){
            const newData = [...this.state.data];
            const beforeData = newData.find(d=>d.id === data.id);
            if (beforeData){
                newData[newData.indexOf(beforeData)] = data;
            }else {
                newData.push(data)
            }
            this.setState({data: newData});
        }
        this.setState({selectedData: data});
        setTimeout(() => {
            history.push('/admin/envio/cajas/show/' + data.id);
        }, 3000);
    }


    removeData = (data) => {
        console.log('work', data)
        this.setState({selectedData: null});
        if (this.state.data){
            var newData = [...this.state.data];
            newData = newData.filter(d=>d.id !== data.id);
            this.setState({data: newData});
        }

        history.push('/admin/envio/cajas/list/');

    }


    renderReturn = () => {
        const { data, selectedData } = this.state;
        const windowsWidth = window.innerWidth; 
        return (
            <div style={{padding:'20px', width:`${ windowsWidth > 760 ? '80%':'' }`, margin:'auto'}}>
                    <Route path='/admin/envio/cajas' exact>
                        <Redirect to="/admin/envio/cajas/list" />
                    </Route>
                    <Route  path='/admin/envio/cajas/list' exact >
                        <CajaList 
                            data={data}
                            selectData = {d=>{this.setState({selectedData:d}); history.push(`/admin/envio/cajas/show/${d.id}`)}}
                            sendData={d=>this.recibeList(d)} 
                        />
                    </Route>
                    <Route  path='/admin/envio/cajas/create' exact >
                        <CajaCreate 
                            sendData={d=>this.recibeData(d)} 
                        />
                    </Route>
                    <Route  path='/admin/envio/cajas/edit/:id' exact 
                        render={(props)=><CajaEdit 
                                                {...props}
                                                data={selectedData}
                                                sendData={d=>this.recibeData(d)} 
                                            />}
                    />

                    <Route  path='/admin/envio/cajas/show/:id' exact 
                                            render={(props)=><CajaShow 
                                                {...props}
                                                dataInit={selectedData}
                                                sendDelete={d=>this.removeData(d)} 
                                            />}
                    />

            </div>
        )
    }

    render(){
        return (
            <Modal 
                component={this.renderReturn()} 
                titulo={'Tamaños de cajas'} 
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

export default connect(mapStateToProps, {})(CajasModule);
