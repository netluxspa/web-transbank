import { useEffect, useState } from "react";

import api from "../../api";
import AdminHeaders from "../../globalComponents/adminHeaders.js/AdminHeaders";

import TablaPedidos from "./components/TablePedidos";


const PedidoList = ({filters, sendData, selectors, pedidos, sendPedidos, sellectAll, allSelected}) => {

    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        if (!pedidos) {
            getPedidos(filters)
        }
    }, [pedidos]);


    const getPedidos = filters => {
        setLoading(true)
        api.get('/commerce/pedido/', 
            {
                params: filters
            },
            AdminHeaders()
        ).then(res=> {
            setLoading(false)
            if (sendPedidos != undefined){
                sendPedidos(res.data)
            }
            
        }).catch(err=>{setLoading(false)})
    }


    return (
        <div>
            { 
                pedidos && pedidos.length 
                ?
                <TablaPedidos 
                    pedidos={pedidos}
                    sendData={d=>{(()=>{if(sendData !== undefined){sendData(d)}})();}} 
                    sellectAll={()=>{(()=>{if(sendData !== undefined){sellectAll()}})();}}
                    selectors={selectors}
                    allSelected={allSelected}
                 /> 
                :
                <div>
                    {
                        loading ? 
                        'Cargando ...'
                        :
                        'No hay pedidos pendientes'
                    }
                </div>
               
            }
        </div>
        
    )
}

export default PedidoList;