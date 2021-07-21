import './PanelStyles.css';
import history from '../../../history';

import ItemPanel from './ItemPanel';
import { Typography, Button } from '@material-ui/core';



const items = [
    {title: 'Admin Tienda', path: '/admin/tienda', description: 'Configuraciones generales de la tienda como su logo y presentación.'},
    {title: 'Admin Productos', path: '/admin/productos-tienda', description: 'Configuraciones asociadas a la vitrina de productos y ajustes de precios.'},
    {title: 'Admin Envío', path: '/admin/envio', description: 'Configuraciones de las politicas de envío como los costos de transporte y rango máximo de cobertura propia.'},
]


const renderItems = (items) => {
    return(
        items.map(i=>(
            <ItemPanel title={i.title} path={i.path} />
        ))
    )
} 


const PanelReturn = () => {

    return (
        <div className='contPanel'>
            {renderItems(items)}
        </div>
    )
}


const style = {
    container: {
        display: 'grid', 
        padding: '50px',
        gap: '50px',
        gridTemplateColumns: (
            ()=>{
                const width = window.innerWidth
                if (width <= 760){
                    return '1fr'
                } else {
                    return 'repeat(auto-fit, minmax(150px, 1fr))'
                }
            })(),
       
    },
    item: {
        borderRadius: '4px',
        width: '100%',
        display: 'flex',
        flexDirection:'column',
        justifyContent: 'space-between'
    },
   
}

const panelReturn2 = () => {
    return (
        <div style={{border: 'solid 1px rgba(128,128,128,0.5)', position: 'relative', borderRadius: '4px', padding: '6px 10px'}}>
                    <div
                        style={{background: 'white', position: 'absolute', top: '-0.7em', left: '0.7em'}}
                    >
                        <Typography 
                            style={{fontSize:'0.8em'}}
                            color='textSecondary'
                        >Configuraciones generales</Typography>
                    </div>
       
        <div
            style={style.container}
        >
            {
                items.map(i=>(
                    <div style={style.item}>
                        <div>
                        <Typography 
                            style={{fontSize:'0.9em'}}
                            color='textSecondary'
                        >{i.description}</Typography>
                        </div>
                        <br></br>
                        <Button
                                onClick={()=>history.push(i.path)}
                                color='primary'
                                size='small'
                                variant='outlined'
                            >{i.title}
                        </Button>
                    </div>
                ))
            }

   

            </div>

        </div>
    )
}




const Panel = () => {
    return (
        panelReturn2()
    )
}

export default Panel;