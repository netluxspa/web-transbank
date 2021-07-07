import React from 'react';
import { connect } from 'react-redux';

import api from '../../../../../api';
import history from '../../../../../history';

import Alert from '@material-ui/lab/Alert';

import { Typography, Button } from '@material-ui/core';


import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import CajaForm from "./CajaForm";


class CajaCreate extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            data: {
                titulo: '',
                tienda:  `${this.props.tienda && this.props.tienda.id ? this.props.tienda.id : null}`,
                alto: '',
                ancho: '',
                largo: ''
            },

            errorApi: null,
            successApi: '',
            error500: ''

        }
    }


    recibeData = (data) => {
        var newData = {...this.state.data};
        const keys = Object.keys(data);
        for (let index = 0; index < keys.length; index++) {
            const key = keys[index];
            newData = {...newData, [key]:data[key]}
        }
        this.setState({data: newData})
    }


    save = () => {
        const adminkey = localStorage.getItem('adminkey');
        const site = localStorage.getItem('site');
        const data = this.state.data;
        const { sendData } = this.props;
        api.post('/commerce/caja/', 
            data,
            {headers: {'content-type':'application/json', 'site': site, 'adminkey': adminkey}}
        ).then(res=>{
            sendData(res.data)
            this.setState({successApi:'Los cambios se han guardado con éxito'})
            setTimeout(() => {
                this.setState({successApi:''})
            }, 3000);
        }).catch(err=>{
            if (err && err.response && err.response.data){
                this.setState({errorApi: err.response.data})
                setTimeout(() => {
                    this.setState({errorApi: null})
                }, 3000);
            } else {
                this.setState({error500: 'Compruebe conexión a internet...'});
                this.setState({error500:''})
            }
        })
    }

    renderErrors = (errors) => {
        const keys = Object.keys(errors)
        console.log(keys)
        return (
            keys.map((k, i)=>(
                <div key={i}>
                    {errors[k].map(e=>(

                        <Alert severity="error">{k} - {e}</Alert>

                    ))}
                </div>
            ))
        )
    }

    resultsApi = () => {
        const { errorApi, successApi } = this.state; 
        return (
            <div  style={{textAlign:'center'}}>
            {
                errorApi ||  successApi 
                ? 
                <div style={{margin:'10px 0 10px 0'}}>
                    {
                        errorApi ? 
                    
                        this.renderErrors(errorApi)
                        : 
                        null
                    }
                    {
                        successApi 
                        ?  
                        <Alert severity="success">{successApi}</Alert>
                        : 
                        null
                    }
                </div>: 
                null
            }
        </div>
        )
        
    }




    render() {

        const { data } = this.state;

        return(
            <div>
               <div
                    style={{display:'flex', alignItems: 'center', marginBottom: '30px'}}
                >
                    <ArrowBackIosIcon 
                        onClick={()=>history.push('/admin/envio/cajas/list/')}
                        style={{cursor: 'pointer', color:' rgba(80, 80, 80, 0.9)'}}
                    />
                    <Button
                        style={{margin: '0 0 0 20px'}}
                        color='primary'
                        variant='contained'
                        size='small'
                        onClick={()=>this.save()}
                    >
                        Guardar
                    </Button>
                   
                </div>
                <div
                    style={{margin: '20px 0 0 0'}}
                >
                    {this.resultsApi()}
                </div>
                <div>
                    <CajaForm data={data} sendData={d=>this.recibeData(d)} />
                </div>
              
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {        
            tienda:state.tienda
         }    

}

export default connect(mapStateToProps,{})(CajaCreate);