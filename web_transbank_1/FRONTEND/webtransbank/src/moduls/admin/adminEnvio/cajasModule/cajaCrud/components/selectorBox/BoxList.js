import React from 'react';
import api from '../../../../../../../api'; 

import history from '../../../../../../../history'; 
import AdminHeaders from '../../../../../../../globalComponents/adminHeaders.js/AdminHeaders'


import { Typography, Button } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';


class BoxList extends React.Component {

    constructor(props){
        super(props)
    }

    componentDidMount(){
        const { data } = this.props;
        if (!data){
            this.getBoxes();
        }
    }


    getBoxes = () => {
        const { sendData } = this.props;
        const headers = AdminHeaders();
        const site = localStorage.getItem('site')
        api.get('/commerce/caja?tienda__pagina__codigo=' + site, 
            headers
        ).then(res=>{
            sendData(res.data)
        })
    }

    renderList = (data) => {
        return (
            data.map(c=>(
                <div key={c.id} style={{display:'grid', gridTemplateColumns:'20fr 1fr', gap:'10px', padding: '5px', borderRadius:'4px', borderBottom: 'solid 1px rgba(128, 128, 128, 0.36)', marginBottom:'5px'}}>
                                            <div key={c.id}>
                        <Typography  color="textPrimary" >
                            {c.titulo}
                        </Typography>
                    </div>
                    <div>
                        <Button onClick={()=>this.props.sendSelected(c)} variant='outlined' size='small' color='primary'>Seleccionar</Button>
                    </div>
                </div>
                ))
        )   
    }

    renderContent = (data) => {
        const { open_selector } = this.props;
        return (
            <div>
                <div
                    style={{display:'flex', alignItems: 'center', marginBottom: '30px'}}
                >
                    <ArrowBackIosIcon 
                        onClick={()=>open_selector()}
                        style={{cursor: 'pointer', color:' rgba(80, 80, 80, 0.9)'}}
                    />
                    <Button
                        style={{margin: '0 0 0 20px'}}
                        color='primary'
                        variant='outlined'
                        size='small'
                        onClick={()=>history.push('/admin/envio/cajas/create')}
                    >
                        Crear nuevo formato
                    </Button>
                   
                </div>


                {
                   this.renderList(data)
                }

            </div>
        )
    }


    render(){
        const { data } = this.props;
        return (
            <div>
                {data ? this.renderContent(data) : null}
            </div>
        )
    }
}

export default BoxList;