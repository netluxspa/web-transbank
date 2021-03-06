import { useEffect, useState } from "react";
import api from "../../../../api";
import AdminHeaders from "../../../../globalComponents/adminHeaders.js/AdminHeaders";
import { Alert, AlertTitle } from '@material-ui/lab';
import { Button, Typography } from "@material-ui/core";

import history from "../../../../history";

const NotificationPedido = ({match}) => {

    useEffect(()=>{
        getPedidosResumen();
        
    }, [])

    const [pedidos, setPedidos] = useState(null)

    const [apiError, setApiError] = useState(null)

    const getPedidosResumen = () => {

        api.get('/commerce/get-resumen-pedido/',
        AdminHeaders()
        ).then(res=>{
            setPedidos({
                    pendientes: res.data.pendientes,
                    completados: res.data.completados,
                    erroneos: res.data.erroneos,
                    envios_pendientes: res.data.envios_pendientes,
            })
        }).catch(err=>{
            console.log(err)
        })
        // Traer len de pedidos pendientes, pedidos erroneos, pedidos entregados, 
    }


    const style = {
        container: {
            display: 'grid', 
            padding: '50px',
            gap: '50px',
            gridTemplateColumns: (
                ()=>{
                    const width = window.innerWidth
                    if (width <= 760){
                        return '1fr'
                    } else {
                        return 'repeat(auto-fit, minmax(150px, 1fr))'
                    }
                })(),
           
        },
        item: {
            borderRadius: '4px',
            width: '100%',
            display: 'flex',
            flexDirection:'column',
            justifyContent: 'space-between'
        },
       
    }


    const data = pedidos => {
        const { pendientes, envios_pendientes, erroneos, completados } = pedidos;
        return [
            {
                title: 'Pedidos pendientes', 
                len: pendientes,
                severity: (()=>{
                                if  (pendientes == 0){
                                    return 'success'
                                } else {
                                    return 'warning'
                                }
                            })(),
                messagge: (()=>{
                                if (pendientes == 0){
                                    return 'No tienes pedidos pendientes'
                                } else if(pendientes == 1){
                                    return `Tienes ${pendientes} pedido pendiente`
                                } else if (pendientes > 1) {
                                    return `Tienes ${pendientes} pedidos pendientes` 
                                }
                            })(),
                button_title: 'Preparar un env??o',
                button_status:  (()=>{
                                    if  (pendientes == 0){
                                        return true
                                    } else {
                                        return false
                                    }
                                })(),
                path: match.path + '/gestion-logistica/preparar-envio'
                    
            }, 
            {
                title: 'Envios en proceso', 
                len: envios_pendientes,
                severity: (()=>{
                                if  (envios_pendientes == 0){
                                    return 'success'
                                } else {
                                    return 'warning'
                                }
                            })(),
                messagge: (()=>{
                                if (envios_pendientes == 0){
                                    return 'No tienes envios en proceso'
                                } else if(envios_pendientes == 1){
                                    return `Tienes ${envios_pendientes} envio en proceso`
                                } else if (envios_pendientes > 1) {
                                    return `Tienes ${envios_pendientes} envios en proceso` 
                                }
                            })(),
                button_title: 'Finalizar env??os',
                button_status:  (()=>{
                                    if  (envios_pendientes == 0){
                                        return true
                                    } else {
                                        return false
                                    }
                                })(),
                path: match.path + '/gestion-logistica/procesamiento-envio'
                    
            },
            {
                title: 'Pedidos con problemas', 
                len: erroneos,
                severity: (()=>{
                                if  (erroneos == 0){
                                    return 'success'
                                } else {
                                    return 'warning'
                                }
                            })(),
                messagge: (()=>{
                                if (erroneos == 0){
                                    return 'No tienes pedidos con errores'
                                } else if(erroneos == 1){
                                    return `Tienes ${erroneos} pedido con error`
                                } else if (erroneos > 1) {
                                    return `Tienes ${erroneos} pedidos con errores` 
                                }
                            })(),
                button_title: 'Corregir pedidos',
                button_status:  (()=>{
                                    if  (erroneos == 0){
                                        return true
                                    } else {
                                        return false
                                    }
                                })(),
                path: match.path + '/envio-module'
                    
            },
            {
                title: 'Pedidos completados', 
                len: completados,
                severity: (()=>{
                                if  (completados == 0){
                                    return 'info'
                                } else {
                                    return 'success'
                                }
                            })(),
                messagge: (()=>{
                                if (erroneos == 0){
                                    return 'A??n no tienes pedidos completados'
                                } else if(erroneos == 1){
                                    return `Tienes ${erroneos} pedido completado`
                                } else if (erroneos > 1) {
                                    return `Tienes ${erroneos}  pedidos completados` 
                                }
                            })(),
                button_title: 'Ver historial',
                button_status:  (()=>{
                                    if  (erroneos == 0){
                                        return true
                                    } else {
                                        return false
                                    }
                                })(),
                path: match.path + '/envio-module'
                    
            }

        ]
    }



    const renderResumen2 = () => {
        return (
            <div style={{border: 'solid 1px rgba(128,128,128,0.5)', position: 'relative', borderRadius: '4px', padding: '6px 10px'}}>
                        <div
                            style={{background: 'white', position: 'absolute', top: '-0.7em', left: '0.7em'}}
                        >
                            <Typography 
                                style={{fontSize:'0.8em'}}
                                color='textSecondary'
                            >Notificaciones log??sticas</Typography>
                        </div>
           
            <div
                style={style.container}
            >

                {
                    data(pedidos).map((d, i)=>(
                        <div key={i} style={style.item}>
                            <Alert severity={d.severity}>
                                <AlertTitle>{d.title}</AlertTitle>
                                {d.messagge}
                            </Alert>
                            <br></br>
                            <Button
                                    onClick = {()=>history.push(d.path)}
                                    disabled={d.button_status}
                                    color='primary'
                                    size='small'
                                    variant='outlined'
                                >{d.button_title}
                            </Button>
                    </div>
                    ))
                }

                </div>

            </div>
        )
    }
    
    const renderReturn = () =>{
        if (!apiError && !pedidos) {
            return (
                'loading'
            )
        } else if (apiError){
            return (
                'error'
            )
        } else if (pedidos){
            return (
                renderResumen2()
            )
        } else {
            return 'error inesperado'
        }
    }

    return renderReturn()
}

export default NotificationPedido;