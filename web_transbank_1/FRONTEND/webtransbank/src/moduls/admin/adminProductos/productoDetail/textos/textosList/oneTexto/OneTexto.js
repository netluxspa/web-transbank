
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';



const style = {
    contTexto:{
        borderRadius: '4px',
        border: 'solid 1px rgba(128, 128, 128, 0.36)',
        padding: '5px 10px',
        display: 'flex',
        justifyContent: 'space-between'
    }
}

const OneTexto = ({texto, edit, goDetail}) => {

    return (
        <div style={style.contTexto}>
            <div>
                <Typography component="h5" variant="h5"  color="textPrimary" >
                    {texto.texto}
                </Typography>
            </div>
            <div style={{whiteSpace:'nowrap'}}>
                <Button onClick={()=>edit(texto)} variant='outlined' 
                    color="primary"
                    size='small'>
                    <EditIcon />
                </Button>
                <Button style={{margin:'0 0 0 10px'}} onClick={()=>goDetail(texto)} variant='outlined' 
                    color="primary"
                    size='small'>
                        <ViewComfyIcon />
                </Button>
            </div>

        </div>
        )
}

export default OneTexto;