import OneTexto from './oneTexto/OneTexto';
import Button from '@material-ui/core/Button';


const style = {
    contCreate : {
        display: 'flex',
        justifyContent: 'flex-end',
        borderBottom: 'solid 1px rgba(128, 128, 128, 0.36)',
        padding: '0 0 10px 0'
    },
    contTextos: {
        padding:'10px 20px'
    }
}


const TextosList = ({go, producto, edit, goDetail}) => {


    const renderTextos = (textos) => {
        return (
            textos.map(t=>(
                <div>
                    <br></br>
                    <OneTexto  edit={t=>edit(t)} texto={t} goDetail={t=>goDetail(t)} />
                </div>
            ))
        )
    }

    return (
        <div>
            <div style={style.contCreate}>
                <Button 
                    onClick={()=>go(2)}
                    variant='contained' 
                    color="primary"
                    size='small'
                >
                    Crear
                </Button>
            </div>

            <div style={style.contTextos}>
                {
                    producto && producto.textos.length > 0 ?
                    renderTextos(producto.textos):
                    'No hay textos creados'
                }
            </div>
        </div>
    )
}

export default TextosList;