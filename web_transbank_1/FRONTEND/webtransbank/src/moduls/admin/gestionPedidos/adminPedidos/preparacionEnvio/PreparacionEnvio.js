import Modal from "../../../../../components/modal/Modal";
import history from "../../../../../history";
import {  Route, Redirect } from 'react-router-dom';
import { useEffect, useState } from "react";

import { connect, useDispatch } from 'react-redux';

import { CLICK_ONE_PEDIDO,  CLICK_ALL_PEDIDOS, ADD_PEDIDOS } from '../../../../../actions/types'

import PedidoList from "../pedidosCrud/PedidoList";
import ContainerLabel from "../../../../../globalComponents/style/containerLabel/ContainerLabel";

import { fromPairs } from "lodash";
import { Button, Typography } from "@material-ui/core";

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

          


import EnvioCreate from "../../../../../models/envio/EnvioCreate";

const PreparacionEnvio = ({pedidos}) => {

    useEffect(()=>{
        if (pedidos && checkedConstrain(pedidos)){
            setOpenEnvioCreate(false)
        }
    }, [pedidos])

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


    const renderReturn = () => {
        return (
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
                                        // <ArrowBackIosIcon 
                                        //     color='primary'
                                        //     onClick={()=>setOpenEnvioCreate(!openEnvioCreate)}
                                        //     style={{cursor: 'pointer', marginLeft:'20px'}}
                                        // />
                                        null
                                }
                                
                                
                                
                            </div>
                            {
                                openEnvioCreate && !checkedConstrain(pedidos) ?
                                <div>
                                    <EnvioCreate />
                                </div>
                                :
                                null
                            }
                     
                        </div>
                       
                        :
                        null
                    }
                    </ContainerLabel>
                
                   

                
                  
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
        )
    }


    return (
        <Modal 
            component={renderReturn()} 
            titulo={'Preparando un envío'} 
            ondismiss={()=>history.goBack()}
        />
    )
}

const mapStateToProps = state => {
    return {
        pedidos: state.gestionPedidos.pedidosPendientes
    }
}

export default connect(mapStateToProps, {})(PreparacionEnvio);