import Resizer from "react-image-file-resizer";
import { useState } from 'react';
import './Uploader.css' 
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Alert from '@material-ui/lab/Alert';




const Uploader  = ({submitImage, inputShow, deleteImage}) => {


    const [show, setShow] = useState(inputShow)

    const [error, setError] = useState('')

    const [openDelete, setOpenDelete] = useState(false)


    const onFileChange = e => {
        var newFile = null;
        if (e && e.target && e.target.files && e.target.files.length > 0){
            newFile= e.target.files[0];
        } 
        
        if (newFile) {

            if (newFile.type.match(/image\/*/) == null){
                setError('El archivo cargado no es una imagen')
                setTimeout(() => {
                    setError('')
                }, 3000);
            } else {
                if (newFile.size > 200000){
                    // resize(newFile, 100).then(res=>console.log('res', res))
                    resize1(newFile, 100).then(res=>{
                        let reader = new FileReader();
                        reader.readAsDataURL(res);
                        reader.onload = (_event) => {
                            // this.msg = "";
    
                                setShow(reader.result)
                        }
                        submitImage(res)
                    })
                }else {
                    let reader = new FileReader();
                        reader.readAsDataURL(newFile);
                        reader.onload = (_event) => {
                            // this.msg = "";
    
                                setShow(reader.result)
                        }
                    submitImage(newFile)
                }
            }

            
        }
    }


    
    const resize3 = (resolve, file, q) => {
        try {
            Resizer.imageFileResizer(
                file,
                500,
                500,
                "JPEG",
                q,
                0,
                (uri) => {
                    if (uri.size > 200000) {
                        resize3(resolve, uri, q - 10)
                    } else{
                        resolve(uri)
                    }
                },
                'file',
                500,
                500
            );
          } catch (err) {
            console.log('error', err)
          }
    }

    const resize2 = (file, q) =>{
        return new Promise(resolve => {
            resize3(resolve, file, q)
        })
    }

    const resize1 = async (file, q) =>{
        const response = await resize2(file, q)
        return response;
    }


    const renderUploader = () => {
        return (
            <div className='gridUploader'>
                <div>                   
                    <div className='button_upload'>
                    <Button  
                        style={{position: 'relative', overflow: 'hidden'}}
                        variant='contained'
                        size="small" color="primary"
                    >
                        {!inputShow ? 'Cargar imagen': 'Cambiar imagen'}
                        <input style={{border: 'solid 1px red', position: 'absolute', left: '0', top: '0', bottom: '0', right: '0', opacity: '0'}} onChange={e=>onFileChange(e)} type='file' />
                    </Button>
                    {inputShow && !openDelete ? <Button  
                        onClick={()=>setOpenDelete(true)}
                        style={{margin: '0 0 0 20px'}}
                        variant='contained'
                        size="small" color="secondary"
                    >
                        Eliminar
                    </Button> : null}
                    </div>
                    {openDelete ? <div  style={{margin: '10px 0 0 0'}}>
                        <Alert severity="error">
                            <div>
                            ¿Esta seguro que quiere eliminar esta imagen y su contenido?
                            </div>
                            <div style={{margin:'10px 0 0 0'}}>
                            <Button  
                                onClick={()=>setOpenDelete(false)}
                                variant='outlined'
                                size="small" color="primary"
                            >
                                Cancelar
                            </Button>
                            <Button   
                                onClick={()=>deleteImage()}
                                style={{margin:'0 0 0 10px'}}
                                variant='contained'
                                size="small" color="secondary"
                            >
                                Eliminar
                            </Button>
                            </div>
                        </Alert>
                    </div>:null}
                </div>
                {error ?  <Alert style={{margin: '10px 0 0 0'}} severity="error">{error}</Alert>: null}

                <div className='cont_image'>
                    {show ? <img style={{width: '100%'}} src={show} /> : 
                     <div style={{width: '100%', borderRadius: '4px', border: 'solid 1px rgba(128, 128, 128, 0.24)', height:'100px', display: 'flex', justifyContent:'center', alignItems:'center'}}>
                        <Typography style={{marginLeft:'20px'}}  color="textSecondary" >
                            Cargue una imagen
                        </Typography>
                     </div>
                    }
                </div>
            </div>
        )
    } 

    return renderUploader()
}

export default Uploader;