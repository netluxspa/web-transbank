import { useState } from 'react';

import TextField from '@material-ui/core/TextField';


const ParrafoForm = ({parrafo, sendParrafo}) => {

    const [currentParrafo, setCurrentParrafo] = useState(parrafo)


    return (
         <div style={{width: '100%'}}>
            <TextField style={{width: '100%'}}
                label="Parrafo del texto"
                multiline
                rows={4}
                variant="outlined"
                value={currentParrafo}
                onChange={e=>{setCurrentParrafo(e.target.value); sendParrafo(e.target.value)}}
            />
        </div>
    )
}

export default ParrafoForm;