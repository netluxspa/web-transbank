import EnvioList from '../../../../../models/envio/EnvioList'
import { useEffect, useState } from 'react';
import api from '../../../../../api';
import AdminHeaders from '../../../../../globalComponents/adminHeaders.js/AdminHeaders';
import ContainerLabel from '../../../../../globalComponents/style/containerLabel/ContainerLabel';
import { Typography } from '@material-ui/core';
import history from '../../../../../history';


const SelectorEnvioProcesamiento = ({match}) => {

    const [envios, setEnvios] = useState(null)



    return(
        <div>
            <div>
                <ContainerLabel label='Envios en proceso'>
                    <Typography style={{fontSize:'0.9em'}} color='textPrimary' >
                       Estos son los envíos en proceso. Para finalizarlos debes actualizar el estado de sus pedidos.
                    </Typography>
                </ContainerLabel>
            </div>
            <div>
                <EnvioList 
                    envios={envios}
                    filters={{ 
                        tienda__pagina__codigo: localStorage.getItem('site'),
                        // nochecked: true,
                        pedidos__pedido__transaction__response_code: '0'
                    }}
                    sendEnvios={d=>setEnvios(d)}
                    selectOne={d=>history.push(match.path + '/' + d.id)}
                />
            </div>
        </div>
    )
}

export default SelectorEnvioProcesamiento;