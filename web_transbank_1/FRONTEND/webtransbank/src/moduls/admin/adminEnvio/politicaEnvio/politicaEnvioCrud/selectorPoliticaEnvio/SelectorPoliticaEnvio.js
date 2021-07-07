import { useState } from "react";

import ButtonLabel from "./ButtonLabel";
import PoliticaEnvioList from "./PoliticaEnvioList";

const SelectorPoliticaEnvio = ({politica, select_politica}) => {

    const [open, setOpen] = useState(false)
    const [politicas, setPoliticas] = useState(null)
    const [politicaSelected, setPoliticaSelected] = useState(politica)


    return (
        <div>
            {
                !open ? 
                <ButtonLabel 
                    politica={politicaSelected}  
                    open_selector={o=>setOpen(o)}
                />
                :
                <PoliticaEnvioList 
                    label='Seleccione política'
                    politicas={politicas} 
                    send_politicas={p=>setPoliticas(p)}
                    close={o=>setOpen(o)}
                    select_politica= {p=>{
                                setPoliticaSelected(p); 
                                setOpen(false);
                                select_politica(p)
                            }}
                />
            }
            
       </div>
    )
}

export default SelectorPoliticaEnvio;