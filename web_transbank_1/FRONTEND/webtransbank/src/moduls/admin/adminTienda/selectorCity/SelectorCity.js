import React from 'react';
import api from '../../../../api';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';



class SelectorCity extends React.Component  {

    constructor(props){
        super(props);
        this.state = {citys: null, cityError: null}
    }


    componentDidMount() {
        if (!this.props.ciudades){
            this.getCitys();
        } else {
            this.setState({citys: this.props.ciudades})
        }
    }

    getCitys = () => {
        api.get('/commerce/get-city/', 
        {headers: {'content-type': 'application/json'}}
        ).then(res=>{
            console.log(res)
            if (res && res.data && res.data.citys) {
                this.setState({citys: res.data.citys})
                this.props.sendCitys(res.data.citys)
            }
        }).catch(err=>{
            if (err && err.response && err.response.data ){
                this.setState({cityError: err.response.data})
            } else {
                this.setState({cityError: {'error': 'Compruebe conexión a internet'}})
            }
        })
    }

    returnSelector = (citys) => {

        return (
                
                    citys.map(c=>(
                        <div style={{display:'grid', gridTemplateColumns:'20fr 1fr', gap:'10px', padding: '5px', borderRadius:'4px', borderBottom: 'solid 1px rgba(128, 128, 128, 0.36)', marginBottom:'5px'}}>
                                                  <div key={c.code_dls}>
                                <Typography  color="textPrimary" >
                                    {c.name}
                                </Typography>
                            </div>
                           <div>
                                <Button onClick={()=>this.props.emitData(c)} variant='outlined' size='small' color='primary'>Seleccionar</Button>
                            </div>
     
                        </div>
                        ))


        ) 

        
        
        
    } 

    renderReturn = (citys, error) => {
        if (!citys && !error){
            return 'loading'
        } else if (error && !citys){
            return 'Error'
        } else if(citys && !error ){
            if (citys.length > 0){
                return (
                    <div style={{display:'block'}}>
                        <div style={{display:'flex', alignItems:'center'}}>
                            <Button onClick={()=>this.props.close()} variant='outlined' color='primary' size='small'>Volver</Button>
                            <span style={{fontSize:'11px', marginLeft:'20px'}}>{this.props.label}.</span>
                        </div>
                    <div style={{padding:'10px', display:'block', height: '300px', overflow:'auto', borderRadius:'4px', border: 'solid 1px rgba(128, 128, 128, 0.36)' }}>
                    {this.returnSelector(citys)}
                    </div>
                    </div>
                )
            }else{
                return 'No hay ciudades disponibles'
            }
        }

    }

    render() {
        const {citys, errorCity} = this.state;
        return this.renderReturn(citys, errorCity)
    }
}

export default SelectorCity;