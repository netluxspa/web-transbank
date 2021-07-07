import Uploader from '../../../../../../globalComponents/uploader/Uploader'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { useState, useEffect } from 'react';

import { connect } from 'react-redux';

import './ImagenForm.css';

const ImagenForm = ({volver, title, submitImage, imagen, deleteImagen}) => {

    const [file, setFile] = useState(null)

    const [descripcion, setDescripcion] =  useState('')



    useEffect(()=>{
        if (imagen && imagen.descripcion){
            setDescripcion(imagen.descripcion)
        }
    }, [imagen])


 

    const setFileaAndSend = (f) => {
        setFile(f)
        submitImage({imagen: f, descripcion})
    } 

    const setDescriptionAndSend = (d) => {
        setDescripcion(d)
        submitImage({imagen :file, descripcion: d})
    }

    return (
            <div className='gridForm'>
                <div className='headers'>
                    <div>
                        <Button  
                            onClick={()=>volver()}
                            variant='outlined'
                            size="small" color="primary"
                        >
                            Volver
                        </Button>
                    </div>
                    <div>
                    <Typography style={{marginLeft:'20px'}}  color="textSecondary" >
                        {title}
                    </Typography>
                    </div>
                </div>
                <div className='grid_imagen_create'>
                    <div>
                        <Uploader deleteImage={()=>deleteImagen()} inputShow={imagen?imagen.imagen:''} submitImage={f=>setFileaAndSend(f)} />
                    </div>
                    <div style={{margin: '40px 0 0 0'}}>
                        <TextField style={{width: '100%'}}
                            label="Descripción de la imagen"
                            id="outlined-size-normal"
                            value={descripcion}
                            onChange={e=>setDescriptionAndSend(e.target.value)}
                            variant="outlined"
                            multiline
                            rows={10}
                        />
                    </div>
                </div>
            </div>
    )
}

const mapStateToPros = state => {
    return {
        imagen: state.imagenProductoAdmin
    }
}

export default connect(mapStateToPros, {})(ImagenForm);