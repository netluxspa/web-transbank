    import { Button, Typography } from "@material-ui/core";


const ButtonLabel = ({ciudad, open_selector}) => {

    return (
        <div style={{borderBottom: 'solid 1px rgba(160,160,160,1)', padding:'10px'}}>
            <Typography style={{fontSize:'0.75em', margin:'0 0 7px 0'}} color='textSecondary'>
                ciudad
            </Typography>
            <div style={{display:'flex', justifyContent:'space-between'}}>
                {ciudad && ciudad.name ? <Typography  color='textPrimary'> {ciudad.name}</Typography> : null}
                
                <Button onClick={()=>open_selector(true)} variant='outlined' color='primary' size='small'>
                    {ciudad ? 'Cambiar ciudad' : 'Seleccione ciudad'}
                </Button>
            </div>
        </div>
    )

}

export default ButtonLabel;