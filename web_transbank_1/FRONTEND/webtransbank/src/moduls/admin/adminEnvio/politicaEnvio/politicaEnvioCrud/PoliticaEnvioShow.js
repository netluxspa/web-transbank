import React from "react";
import api from "../../../../../api";
import history from "../../../../../history";

import { Typography, Button } from "@material-ui/core";

class PoliticaEnvioShow extends React.Component {


    


    renderData = data => {
        return(
            <div>            
                <div style={{border: 'solid 1px rgba(128,128,128,0.6)', borderRadius:'4px', padding: '10px'}}>
                    
                    {
                        data.length ?
                        <React.Fragment>
                            <div>
                                <div>
                                    <Typography color='textSecondary' style={{fontWeight:'600'}}>{data[0].politica_detail.titulo}</Typography>    
                                </div>
                                <div>
                                <Typography style={{fontWeight:'500', fontSize: '0.8em'}}>Política de envío actual</Typography>    
                                </div>
                            </div>

                            <br></br>

                            <div>
                                <div>
                                    <Typography color='textSecondary' style={{fontWeight:'600'}}>{data[0].rango_zonal}</Typography>    
                                </div>

                                <div>
                                    <Typography style={{fontWeight:'500', fontSize: '0.8em'}}>Distancia maxima para distribución propia</Typography>    
                                </div>
                            </div>

                            <br></br>

                            <div>
                                <div>
                                    <Typography color='textSecondary' style={{fontWeight:'600'}}>{data[0].c_distancia}</Typography>    
                                </div>

                                <div>
                                    <Typography style={{fontWeight:'500', fontSize: '0.8em'}}>Pesos por kilometro de envío (en caso de distribución propia). </Typography>    
                                </div>
                            </div>

                            <br></br>

                            <div>
                                <div>
                                    <Typography color='textSecondary' style={{fontWeight:'600'}}>{data[0].c_peso}</Typography>    
                                </div>

                                <div>
                                    <Typography style={{fontWeight:'500', fontSize: '0.8em'}}>Pesos por kilo del envío (distribución propia).</Typography>    
                                </div>
                            </div>

                            <br></br>

                            <div>
                                <div>
                                    <Typography color='textSecondary' style={{fontWeight:'600'}}>{data[0].c_volumen}</Typography>    
                                </div>

                                <div>
                                    <Typography style={{fontWeight:'500', fontSize: '0.8em'}}>Pesos por centimétro cúbico de envío (distribución propia).</Typography>    
                                </div>
                            </div>

                            <br></br>

                            <div>
                                <div>
                                    <Typography color='textSecondary' style={{fontWeight:'600'}}>{data[0].c_base}</Typography>    
                                </div>

                                <div>
                                    <Typography style={{fontWeight:'500', fontSize: '0.8em'}}>Pesos base por envío (distribución propia).</Typography>    
                                </div>
                            </div>

                            <br></br>
                            <br></br>

                            <div>
                                
                                <div>
                                    <Typography style={{fontWeight:'normal', fontSize: '0.8em'}}>{data[0].politica_detail.descripcion}</Typography>    
                                </div>
                            </div>
                        </React.Fragment>
                        :
                        <React.Fragment>
                                <div>
                                    <Typography style={{fontWeight:'normal', fontSize: '0.8em'}}>Defina su política de envío</Typography>    
                                </div>
                        </React.Fragment>
                    }
                    


                    <br></br>

                    <div>
                        <Button
                            color='primary'
                            variant='outlined'
                            size='small'
                            onClick={()=>history.replace(`${data.length ? '/admin/envio/politica-envio/edit': '/admin/envio/politica-envio/create'}`)}
                        >
                            { data.length ? 'Modificar': 'Definir'}
                        </Button>
                    </div>
                </div>
        </div>
        )
    }



    render() {
        const { data } = this.props;

        return (
            <div
                style={{width:'80%', margin:'auto'}}
            >
                <div>
                    {this.renderData(data)}
                </div>
            </div>
        )
    }

}

export default PoliticaEnvioShow;