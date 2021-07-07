import { useState } from "react";

import ButtonLabel from "./ButtonLabel";
import CityList from "./CityList";

const SelectorStarkenCity = ({ciudad, select_ciudad}) => {

    const [open, setOpen] = useState(false)
    const [ciudades, setCiudades] = useState(null)
    const [ciudadSelected, setCiudadSelected] = useState(ciudad)


    return (
        <div>
            {
                !open ? 
                <ButtonLabel 
                    ciudad={ciudadSelected}  
                    open_selector={o=>setOpen(o)}
                />
                :
                <CityList 
                label='Seleccione ciudad'
                    ciudades={ciudades} 
                    send_citys={c=>setCiudades(c)}
                    close={o=>setOpen(o)}
                    select_ciudad= {c=>{
                                setCiudadSelected(c); 
                                setOpen(false);
                                select_ciudad(c)
                            }}
                />
            }
            
       </div>
    )
}

export default SelectorStarkenCity;