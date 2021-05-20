import { Route } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import PedidoFounded from '../pedidoFounded/PedidoFounded'
import './seguimientoPedidosStyle.css'



const SeguimientoPedidos = () => {
    console.log('work seguiiento')
    return (
        <div>
            <br></br>
            <br></br>
            <div className='contSeguimientoSearch'>

                <div className='titulo'>
                <Typography variant="h5" color="textPrimary" paragraph>
                    Seguimiento de pedidos
                </Typography>
                <Typography  color="textSecondary" paragraph>
                    Ingresa el código de seguimiento para encontrar tu pedido
                </Typography>
                </div>

                <div className='searchBox'>
                    <TextField
                        label='Codigo de seguimiento'
                        multiline
                        rowsMax={4}
                        variant="outlined"
                    />
                </div>

                <div className='goSearch'>
                    <Button 
                        variant='contained'
                        color="primary"
                    >
                        Buscar
                    </Button>
                </div>
            </div>
            <Route path="/tienda/seguimiento/:codigo_seguimiento" exact component={PedidoFounded} />
            
        </div>
    )
}

export default SeguimientoPedidos;