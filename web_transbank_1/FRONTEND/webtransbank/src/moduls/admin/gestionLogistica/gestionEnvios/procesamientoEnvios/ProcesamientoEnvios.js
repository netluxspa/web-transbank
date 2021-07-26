import api from '../../../../../api';
import AdminHeaders from '../../../../../globalComponents/adminHeaders.js/AdminHeaders';
import { useState, useEffect } from 'react';
import history from '../../../../../history';
import PedidosEnvioList from '../../../../../models/envio_pedido/PedidosEnvioList';
import ContainerLabel from '../../../../../globalComponents/style/containerLabel/ContainerLabel';
import { Button, Typography } from '@material-ui/core';

const ProcesamientoEnvio = ({match}) => {

    const [envio, setEnvio] = useState(null)

    const [pedidos, setPedidos] = useState(null)

    useEffect(()=>{
        getOneEnvio(match.params.id)
    }, [match.params.id])

    const getOneEnvio = id => {
        api.get('/commerce/envio/' + id + '/', 
        AdminHeaders()
        ).then(res=> {
            setEnvio(res.data)
        })
    }

    const updater_status = (
        <div style={{display:'grid', gridTemplateColumns: `${window.innerWidth > 760 ? '1fr 1fr': '1fr'}`, gap:'30px'}}>
            <div style={{padding:'20px', background:'rgba(100, 200, 20, 0.3)'}}>
                <div style={{padding:'10px'}}>
                    <Typography style={{fontSize:'0.9em'}}>
                        Si los pedidos seleccionados fueron enviados correctamente a su receptor o al transportista externo puedes finalizar su proceso.
                    </Typography>
                </div>
                <div style={{padding:'10px'}}>
                
                    <Button
                       color='primary'
                        variant='contained'
                        size='small'
                    >Finalizar</Button>
                </div>
            </div>
            <div style={{padding:'20px',background:'rgba(200, 50, 20, 0.3)'}}>
            <div style={{padding:'10px'}}>
            <Typography style={{fontSize:'0.9em'}}>
                        Si hubo problemas con el envío de los pedidos seleccionados agregalos a la lista espcial para atenderlos personalmente.
                    </Typography>
                    
                </div>
                <div style={{padding:'10px'}}>
                    <Button
                        color='secondary'
                        variant='contained'
                        size='small'
                    >Agregar a lista especial</Button>
                </div>
            </div>
        </div>
    )


    const renderReturn = (
        <div style={{display:'grid', gridTemplateColumns: '1fr', gap:'40px'}}>
            <div>
                <ContainerLabel label='Procesmiento del envío'>
                    <Typography style={{fontSize:'0.9em'}} color='textPrimary'>
                        Envio Nº: {envio ? envio.id : null}
                    </Typography>
                    <Typography style={{fontSize:'0.9em'}} color='textPrimary'>
                        Fecha envío: {envio ? envio.fecha : null}
                    </Typography>
                    <br></br>
                    <Typography style={{fontSize:'0.9em'}} color='textPrimary'>
                        Actualiza el estado de los pedidos pendientes. En caso que el pedido tenga un transportista externo, deberás ingresar su codigo de seguimiento para actualizar su estado.
                    </Typography>
                    <br></br>
                    <Typography style={{fontSize:'0.9em'}} color='textPrimary'>
                        Selecciona los pedidos y actualiza su estado.
                    </Typography>
                </ContainerLabel>
            </div>
            <div>
               {updater_status}
            </div>
            <div style={{overflow:'auto'}}>
                <PedidosEnvioList
                selectors={true}
                    filters={{
                        envio: match.params.id
                    }}
                    sendPedidos = {d=>setPedidos(d.map(p=>({...p, checked: false})))}
                    pedidos={pedidos}
                    sendData={p=>setPedidos()}
                />
            </div>
        </div>

    )


    return renderReturn



}

export default ProcesamientoEnvio;