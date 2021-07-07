import React from 'react';
import api from '../../api';

import { Button, Typography } from "@material-ui/core";


class CityList extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            ciudades: this.props.ciudades,
            errorDesconocido: null
        }
    }

    componentDidMount() {
        const { ciudades } = this.state;
        if (!ciudades) {
            this.getStarkenCitys();
        } 
    }

    getStarkenCitys = () =>{
        const { send_citys } = this.props;
        api.get('/commerce/get-city/', 
        {headers: {'content-type': 'application/json'}}
        ).then(res=>{
            if (res && res.data && res.data.citys){
                this.setState({ciudades: res.data.citys});
                send_citys(res.data.citys);
            }   
        }).catch(err=>{
            this.setState({errorDesconocido: true})
        })
    }



    returnList = (citys) => {
        return (
            citys.map(c=>(
                <div style={{display:'grid', gridTemplateColumns:'20fr 1fr', gap:'10px', padding: '5px', borderRadius:'4px', borderBottom: 'solid 1px rgba(128, 128, 128, 0.36)', marginBottom:'5px'}}>
                                            <div key={c.code_dls}>
                        <Typography  color="textPrimary" >
                            {c.name}
                        </Typography>
                    </div>
                    <div>
                        <Button onClick={()=>this.props.select_ciudad(c)} variant='outlined' size='small' color='primary'>Seleccionar</Button>
                    </div>
                </div>
                ))
        )   
    } 


 ContReturn = (children) => {
        return (
            <div style={{display:'block'}}>
                <div style={{display:'flex', alignItems:'center'}}>
                    <Button onClick={()=>this.props.close(false)} variant='outlined' color='primary' size='small'>Volver</Button>
                    <span style={{fontSize:'11px', marginLeft:'20px'}}>{this.props.label}.</span>
                </div>
                <div style={{padding:'10px', display:'block', height: '300px', overflow:'auto', borderRadius:'4px', border: 'solid 1px rgba(128, 128, 128, 0.36)' }}>
                   {children}
                </div>
            </div>
        )
    }



    render(){
        const { ciudades, errorDesconocido } = this.state;

        if (errorDesconocido) {
            return (
                this.ContReturn(
                    <Typography  color="textPrimary" >
                        Compruebe conexión a internet ...
                    </Typography>
                )
                
            )
        }

        if (ciudades && ciudades.length > 0){
            return (

                this.ContReturn(this.returnList(ciudades))
            )
        }else{
            return (
                <div>
                    <Typography  color="textPrimary" >
                       Cargando ciudades ...
                    </Typography>
                </div>
            )
        }
    }

}

export default CityList;