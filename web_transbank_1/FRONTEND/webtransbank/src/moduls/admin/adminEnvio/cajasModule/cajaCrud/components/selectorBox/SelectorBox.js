import React, { useState, useEffect } from 'react';
import BoxList from './BoxList';
import ButtonLabel from './ButtonLabel';

const SelectorBox = ({sendData, data}) => {


    const [boxes, setBoxes] = useState(null)
    const [boxSelected, setBoxSelected] = useState(data)

    const [listOpen, setListOpen] = useState(false)




    return (
        <div>
            {
                listOpen ?
                <BoxList 
                    data={boxes} 
                    sendData={d=>setBoxes(d)} 
                    sendSelected={s=>{setBoxSelected(s); setListOpen(false); sendData(s)}}
                    open_selector={()=>{ listOpen === listOpen ? setListOpen(false) : setListOpen(false)}} 
                />
                :
                <ButtonLabel 
                    data={boxSelected} 
                    open_selector={()=>{ listOpen === listOpen ? setListOpen(true) : setListOpen(false)}} 
                />
            }
        </div>
    )

}



export default SelectorBox;