import React from 'react';

import { TextField, Checkbox, Typography } from "@material-ui/core";
import SelectorBox from "../../../../adminEnvio/cajasModule/cajaCrud/components/selectorBox/SelectorBox";

const FormatoEnvioForm = ({data, sendData}) => {

    const form = data =>  {
        return (
            <div
                style= {{display: 'grid', gap: '20px', gridTemplateColumns:'1fr'}}
            >
                 <div 
                    style={{display: 'flex', alignItems:'center'}}
                 >
                     <div>
                        <Checkbox
                            checked={data.sobre}
                            onChange={e=>sendData({sobre:!data.sobre})}
                            color="primary"
                        />
                    </div>
                    <div>
                        <Typography>
                            ¿Este producto se envía en un sobre y su peso es despreciable?
                        </Typography>
                    </div>

                </div>

                <div 
                    style={{display: 'flex', alignItems:'center'}}
                 >
                     <div>
                        <Checkbox
                            checked={data.solo_zona}
                            onChange={e=>sendData({solo_zona:!data.solo_zona})}
                            color="primary"
                        />
                    </div>
                    <div>
                        <Typography>
                            ¿Este producto se envía sólo en el radio local?
                        </Typography>
                    </div>

                </div>

                <React.Fragment>
                    {
                        data && !data.sobre ?
                        <React.Fragment>
                            <div>
                                <TextField 
                                    style={{width:'100%'}}
                                    size='small'
                                    label='peso [kg]'
                                    variant='outlined'
                                    value={data.peso}
                                    onChange={e=>sendData({peso: e.target.value})}
                                />
                            </div>
                            <div>
                                <TextField 
                                    style={{width:'100%'}}
                                    size='small'
                                    label='unidades por caja'
                                    variant='outlined'
                                    value={data.unidades_caja}
                                    onChange={e=>sendData({unidades_caja: e.target.value})}
                                />
                            </div>
                            <div>
                                <SelectorBox data={data && data.caja_detail ? data.caja_detail : null} sendData={d=>sendData({caja:d.id})} />
                            </div>
                        </React.Fragment>
                        :
                        null
                    }

                   

                </React.Fragment>


            </div>
        )
    }


    return (
        <div>
            {
                data ?
                form(data)
                :
                null
            }
        </div>
    );
}

export default FormatoEnvioForm;