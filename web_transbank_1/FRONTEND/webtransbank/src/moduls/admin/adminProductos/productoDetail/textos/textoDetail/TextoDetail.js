import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import ParrafoCreate from './parrafoCreate/ParrafoCreate';
import ParrafoEdit from './parrafoEdit/ParrafoEdit';
import ParrafoList from './parrafoList/ParrafoList';


const TextoDetail = ({texto, go}) => {

    const [selectedComponent, setSelectedComponent] = useState(1)

    const [parrafoSelected, setParrafoSelected] = useState(null)

    const components = {
        1: <ParrafoList 
                go={c=>setSelectedComponent(c)}
                parrafos={texto.parrafos}
                edit={p=>{setParrafoSelected(p); setSelectedComponent(3)}} 
            />,
        2: <ParrafoCreate 
                texto={texto}
                go={c=>setSelectedComponent(c)}
            />,
        3: <ParrafoEdit 
                go={c=>setSelectedComponent(c)}
                parrafo={parrafoSelected} 
            />
    }




    return (
        <div>
            <div style={{borderBottom:'solid 1px rgba(128, 128, 128, 0.36)', padding: '10px 0'}}>
                <Button onClick={()=>go(1)} size='small' variant='outlined' color='primary'>Volver</Button>
            </div>
            <div style={{padding: '10px 0', display:'flex', justifyContent:'space-between'}}>
                <div>
                    <Typography component="h5" variant="h5"  color="textPrimary" gutterBottom>
                        {texto.texto}              
                    </Typography>
                </div>
                <div>
                   {selectedComponent === 1 ? <Button onClick={()=>setSelectedComponent(2)} size='small' variant='contained' color='primary'>Crear</Button>:null}
                </div>
            </div>
            <br></br>
           
           
            <div style={{padding:'0 20px'}}>
                {components[selectedComponent]}
            </div>
        </div>
        )

        
    
}

export default TextoDetail;