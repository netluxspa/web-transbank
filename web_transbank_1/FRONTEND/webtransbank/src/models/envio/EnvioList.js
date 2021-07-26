import { useEffect } from "react";
import api from "../../api";
import AdminHeaders from "../../globalComponents/adminHeaders.js/AdminHeaders";
import TablaEnvios from "./components/TablaEnvios";


const EnvioList = ({filters, envios, sendEnvios, selectOne}) => {

    useEffect(()=>{
        if (!envios && sendEnvios){
            getEnvios(filters)
            console.log('work')
        }
    },[])

    const getEnvios = filters => {
        api.get('/commerce/envio/', 
        {
            params: filters
        },
        AdminHeaders()
        ).then(res=>{
            console.log('res data', res.data)
            sendEnvios(res.data)
        })
    }
    return (
        <div>
            {
                envios && envios.length?
               <TablaEnvios envios={envios} selectOne={d=>selectOne(d)} />
                :
                <div>
                    No hay envios
                </div>
            }
        </div>
    )
}

export default EnvioList;