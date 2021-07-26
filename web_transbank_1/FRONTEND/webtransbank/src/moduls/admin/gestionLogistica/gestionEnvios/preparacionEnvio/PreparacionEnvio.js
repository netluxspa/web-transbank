import Modal from "../../../../../components/modal/Modal";
import history from "../../../../../history";
import {  Route, Redirect } from 'react-router-dom';
import { useEffect, useState } from "react";

import { connect, useDispatch } from 'react-redux';

import { CLICK_ONE_PEDIDO,  CLICK_ALL_PEDIDOS, ADD_PEDIDOS, REMOVE_ALL_PEDIDOS } from '../../../../../actions/types'

import PedidoList from "../../../../../models/pedido/PedidoList";
import ContainerLabel from "../../../../../globalComponents/style/containerLabel/ContainerLabel";

import { fromPairs } from "lodash";
import { Button, Typography } from "@material-ui/core";

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

          


import EnvioCreate from "../../../../../models/envio/EnvioCreate";


const PreparacionEnvio = ({pedidos, go, tiendaId}) => {

    useEffect(()=>{
        console.log(pedidos)
        if (pedidos && checkedConstrain(pedidos)){
            setOpenEnvioCreate(false)
        }
    }, [pedidos])

    const [savedEnvio, setSavedEnvio] = useState(null)

    const [openEnvioCreate, setOpenEnvioCreate] = useState(false)

    const dispatch = useDispatch()

    const addPedidosRedux = pedidos => {
        dispatch({type: ADD_PEDIDOS, payload: pedidos})
    }

    const clickOnePedidoRedux = pedido => {
        dispatch({type: CLICK_ONE_PEDIDO, payload: pedido})
    }

    const clickAllPedidosRedux = () => {
        dispatch({type: CLICK_ALL_PEDIDOS, payload: null})
    }

    const checkedConstrain = pedidos => {
        if (pedidos && pedidos.data){
            const constr = pedidos.data.filter(p=>{
                if (p.checked){
                    return p
                }
            }).length == 0

            return constr
        }

    }

    const recibeEnvioCreate = d => {
        setSavedEnvio(d);
        setTimeout(() => {
                dispatch({type:REMOVE_ALL_PEDIDOS})
                go(d.id)
            }, 3000);
        }
    




    const renderSelectorPedidosAndCreatorEnvio = (
                <div>
                    <ContainerLabel label='Creación de envío'>
                        {
                            pedidos && pedidos.data ?
                        
                            <div>
                                
                                <div>
                                    
                                    {
                                        !openEnvioCreate 
                                    ? 
                                        <div>
                                            <Typography color='textPrimary'>
                                                Selecciona pedidos pendientes para preparar un envío. 
                                            </Typography>
                                            <br></br>
                                            <Button
                                                onClick = {()=>setOpenEnvioCreate(!openEnvioCreate)}
                                                disabled={checkedConstrain(pedidos)}
                                                color='primary'
                                                size='small'
                                                variant='contained'
                                            >
                                                Crear envio
                                            </Button>
                                        </div>
                                    :
                                    <Button
                                        onClick={()=>setOpenEnvioCreate(!openEnvioCreate)}
                                        style={{margin:'0 0 10px 0'}}
                                        color='primary'
                                        size='small'
                                        variant='outlined'
                                    >
                                        <ArrowBackIosIcon 
                                                color='primary'
                                                
                                                style={{cursor: 'pointer'}}
                                            />
                                            Modificar pedidos
                                    </Button>
                                        
                                            // null
                                    }
                                    
                                    
                                    
                                </div>
                                {
                                    openEnvioCreate && !checkedConstrain(pedidos) ?
                                    <div>
                                        <EnvioCreate tiendaId={tiendaId} pedidos={pedidos.data.filter(d=>d.checked)} sendData={d=>recibeEnvioCreate(d)}  />
                                    </div>
                                    :
                                    null
                                }
                        
                            </div>
                        
                            :
                            null
                        }
                        </ContainerLabel>
                    
                    

                    
                <div style={{position:'relative'}}>
                    {
                        openEnvioCreate ?
                        <div style={{position:'absolute', left:'0', right:'0', top:'0', bottom:'0', background: 'rgba(255,255,255,0.4)', zIndex:'100'}}></div>
                        :
                        null
                    }
                    
                <PedidoList 
                        filters={{
                            tienda__pagina__codigo:localStorage.getItem('site'), 
                            transaction__response_code:0, 
                            no_envio:true
                        }} 
                        sendData={d=>clickOnePedidoRedux(d)}
                        selectors={true}
                        sendPedidos={p=>addPedidosRedux(p)}
                        pedidos={pedidos.data}
                        sellectAll={()=>clickAllPedidosRedux()}
                        allSelected={pedidos.allSelected}
                    />
                </div>

            </div>
    )






    const renderReturn = () => {
        return (
            <div>
                <div>
                    {renderSelectorPedidosAndCreatorEnvio}
                </div>
            </div>
            
        )
    }


    return (
        renderReturn()
    )
}

const mapStateToProps = state => {
    return {
        pedidos: state.gestionPedidos.pedidosPendientes,
        tiendaId: state.tienda.id
    }
}

export default connect(mapStateToProps, {})(PreparacionEnvio);