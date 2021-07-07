import React from 'react';

import { Typography, Button } from '@material-ui/core';

import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';



import api from '../../../../../api';

import history from '../../../../../history';


class CajaList extends React.Component {


    constructor(props){
        super(props);
        this.state = {
            data: null,
            error: false
        }
    }


    componentDidMount() {
        const { data } = this.props;
        if (data) {
            this.setState({data:data})
        } else {
            this.getData();
        }

      }
  
      getData = () => {
        const { sendData } = this.props;
        const site = window.location.host
        if (site){
            api.get('/commerce/caja/?tienda__pagina__codigo=' + site, 
            {headers: {'content-type':'application/json', 'site':localStorage.getItem('site'), 'adminkey': localStorage.getItem('adminkey')}}
        ).then(res=>{
            sendData(res.data)
        }).catch(()=>this.setState({error: true}))
        }
      }


    renderCajas = (data, selectData) => {
        return (
            <div className='contCajasList'>

                
                    <div className='contCajasList_headers'>
                        <Typography color='textSecondary'> Etiqueta </Typography>
                    </div>
                    <div className='textRight contCajasList_headers'>
                        <Typography color='textSecondary'> Largo [cm]</Typography>
                    </div>
                    <div className='textRight contCajasList_headers'>
                        <Typography color='textSecondary'> Ancho [cm]</Typography>
                    </div>
                    <div className='textRight contCajasList_headers'>
                        <Typography color='textSecondary'> Alto [cm]</Typography>
                    </div>
                    <div className='contCajasList_headers'></div>
                    <div
                        style={{gridColumn:'1/6', height: '1px', background:'rgba(128,128,128,0.4)', padding:'0'}}
                    ></div>
            

                {
                    data.map(d=>(
                            <React.Fragment key={d.id}>
                                <div>
                                    <Typography color='textPrimary'> {d.titulo} </Typography>
                                </div>
                                <div className='textRight'>
                                    <Typography color='textPrimary'> {d.largo}  </Typography>
                                </div>
                                <div className='textRight'>
                                    <Typography color='textPrimary'> {d.ancho}  </Typography>
                                </div>
                                <div className='textRight'>
                                    <Typography color='textPrimary'> {d.alto}  </Typography>
                                </div>
                                <div
                                    style={{textAlign:'center'}}
                                >
                                    <ArrowForwardIosIcon
                                        style={{color:'rgba(80,80,80,0.9', cursor:'pointer'}}
                                        onClick={()=>selectData(d)}
                                    >
                                    </ArrowForwardIosIcon>
                                </div>
                            </React.Fragment>
                    ))
                }
            </div>
        )
    }


    render() {
        const { data, selectData } = this.props;
        return(
            <div>                
                <div>
                    <Button
                        color='primary'
                        variant='outlined'
                        size='small'
                        onClick={()=>history.push('/admin/envio/cajas/create')}
                    >
                        Crear
                    </Button>
                </div>
                <div 
                    style={{overflow:'auto'}}
                >
                    { (() => { 
                        if (data){
                            if (data.length){
                                return (
                                    this.renderCajas(data, selectData)
                                )
                            } else {
                                return (
                                    <Typography
                                        color='textSecondary'
                                        style={{margin:'20px 0 0 10px'}}
                                    >
                                        No hay cajas creadas.
                                    </Typography>
                                )
                            }
                        } 
                        })() }
                </div>
            </div>
        );
    }
}


export default CajaList;