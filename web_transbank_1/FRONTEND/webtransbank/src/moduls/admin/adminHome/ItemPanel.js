import history from '../../../history';


const ItemPanel = ({title, path}) => {
    return (
        <div
            onClick={()=>history.push(path)}
        >
            <div>
                {title}
            </div>
        </div>
    )
}

export default ItemPanel;