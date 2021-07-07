import history from "../../../../history"

import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Typography } from "@material-ui/core";

import Modal from "../../../../components/modal/Modal";
import './style.css';

const options = [
    {title: 'Determinar posición del centro de distribución',
    path: '/admin/envio/config-logistica'
    },
    {title: 'Determinar tipo de logística',
    path: '/admin/envio/politica-envio'
    },
    {title: 'Definir tamaños de cajas',
    path: '/admin/envio/cajas'
    },
]

const renderOptions = (options) => {
    return (
        options.map(o=>(
            <div
            className='hover'
                onClick={()=>history.push(o.path)}
            >
                <div style={{display:'flex', alignItems:'center'}}>
                <ArrowForwardIosIcon  />
                <Typography style={{margin:'0 0 0 10px'}} variant='span' color='textPrimary'>
                    {o.title}
                </Typography>
                </div>
            </div>
        ))
    )
}


const renderAdminEnvio = (options) => {
    return (
        <div>
            {renderOptions(options)}
        </div>
    )
}


const renderReturn = (options) => {
    return (
        <Modal 
        component={renderAdminEnvio(options)} 
        titulo={'Configuraciones de envío'} 
        ondismiss={()=>history.goBack()}

        />
    )
}




const OptionsEnvio = () => {
    return (renderReturn(options))
}

export default OptionsEnvio;