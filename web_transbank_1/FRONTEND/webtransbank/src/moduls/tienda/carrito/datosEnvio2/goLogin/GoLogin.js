import history from '../../../../../history';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';




const GoLogin = () => {
    return (
        <div>
            <div>
                <Typography style={{fontSize:'1.1em', fontWeight:'500'}} align="left" color="textPrimary" gutterBottom>
                    Para hacer la compra necesitamos que inicies sesión o 
                    te registres con el fin de notificarte oportunamente los estados 
                    de tu pedido después que realizes tu compra.
                </Typography>
            </div>
            <br></br>
            <div>
                <Button onClick={()=>history.push('/auth/login')} color='primary' variant='contained'>Identificarme</Button>
            </div> 
        </div>
    )
}

export default GoLogin;