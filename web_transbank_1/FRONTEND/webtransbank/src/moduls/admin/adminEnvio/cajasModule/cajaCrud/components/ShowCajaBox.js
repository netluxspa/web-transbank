import { Typography } from "@material-ui/core";



const ShowCajaBox = ({data}) => {
    var showData = {...data};
    delete showData.id;
    delete showData.tienda;
    return (
        <div
            style={{display:'grid', gridTemplateColumns:'1fr', gap: '20px'}}
        >
            {
                Object.keys(showData).map(k=>(
                    <div
                        key={k}
                        style={{border: 'solid 1px rgba(128,128,128,0.5)', position: 'relative', borderRadius: '4px', padding: '6px 10px'}}
                    >
                        <div
                            style={{background: 'white', position: 'absolute', top: '-0.7em', left: '0.7em'}}
                        >
                            <Typography 
                                style={{fontSize:'0.8em'}}
                                color='textSecondary'
                            >{ k === 'titulo' ? 'etiqueta' : k }</Typography>
                        </div>
                        <div>
                            <Typography color='textPrimary'>{showData[k]}</Typography>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default ShowCajaBox;