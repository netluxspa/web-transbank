import { Button, Typography } from "@material-ui/core";


const ButtonLabel = ({data, open_selector}) => {

    return (
        <div style={{borderBottom: 'solid 1px rgba(160,160,160,1)', padding:'10px'}}>
            <Typography style={{fontSize:'0.75em', margin:'0 0 7px 0'}} color='textSecondary'>
                formato de envío
            </Typography>
            <div style={{display:'flex', justifyContent:'space-between'}}>
                {data && data.titulo ? <Typography  color='textPrimary'> {data.titulo}</Typography> : null}
                
                <Button onClick={()=>open_selector()} variant='outlined' color='primary' size='small'>
                    {data ? 'Cambiar formato' : 'Seleccione formato'}
                </Button>
            </div>
        </div>
    )

}

export default ButtonLabel;