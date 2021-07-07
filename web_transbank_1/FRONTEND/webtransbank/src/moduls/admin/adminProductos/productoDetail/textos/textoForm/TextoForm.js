import { useState } from 'react';

import TextField from '@material-ui/core/TextField';



const TextoForm = ({sendTexto, texto}) => {

    const [currentTexto, setCurrentTexto] = useState(texto)

    return (
        <div style={{width: '100%'}}>
             <TextField style={{width: '100%'}}
                    label="Titulo del texto"
                    variant="outlined"
                    onChange={e=>{ setCurrentTexto(e.target.value); sendTexto(e.target.value)}}
                    value={currentTexto}
                />
        </div>
    )
}

export default TextoForm;