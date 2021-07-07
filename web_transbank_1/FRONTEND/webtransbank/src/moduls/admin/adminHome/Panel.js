import './PanelStyles.css';
import history from '../../../history';

import ItemPanel from './ItemPanel';



const items = [
    {title: 'Admin Tienda', path: '/admin/tienda'},
    {title: 'Admin Productos', path: '/admin/productos-tienda'},
    {title: 'Admin Envío', path: '/admin/envio'},
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


const Panel = () => {
    return (
       PanelReturn()
    )
}

export default Panel;