import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';


const ParrafoList = ({parrafos, edit, go}) => {

    const renderParrafos = parrafos => {
        if (parrafos.length > 0) {
            return (
                parrafos.map(p=>(
                    <div style={{display:'flex', justifyContent:'space-between', margin:'0 0 20px 0', borderRadius:'4px', border: 'solid 1px rgba(198, 198, 198, 0.46   )', padding: '10px'}}>
                        <div style={{margin:'0 10px 0 0'}}>
                            <Typography  color="textPrimary" >
                                {p.parrafo}                
                            </Typography>
                        </div>
                        <div>
                            <Button onClick={()=>edit(p)} size='small' variant='outlined' color='primary'>
                                <EditIcon />
                            </Button>
                        </div>
                    </div>
                ))
            )
        }else{
            return <div>No hay parrafos creados para este texto</div>
        }
    } 


    return (
        <div>
            <div>
                {renderParrafos(parrafos)}
            </div>
        </div>
    )
    
    
}

export default ParrafoList;