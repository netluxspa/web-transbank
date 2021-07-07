import { Button, Typography } from "@material-ui/core";


const ButtonLabel = ({politica, open_selector}) => {

    return (
        <div style={{borderBottom: 'solid 1px rgba(160,160,160,1)', padding:'10px'}}>
            <Typography style={{fontSize:'0.75em', margin:'0 0 7px 0'}} color='textSecondary'>
                política de envío
            </Typography>
            <div style={{display:'flex', justifyContent:'space-between'}}>
                {politica && politica.titulo ? <Typography  color='textPrimary'> {politica.titulo}</Typography> : null}
                
                <Button onClick={()=>open_selector(true)} variant='outlined' color='primary' size='small'>
                    {politica ? 'Cambiar política' : 'Seleccione política'}
                </Button>
            </div>
        </div>
    )

}

export default ButtonLabel;