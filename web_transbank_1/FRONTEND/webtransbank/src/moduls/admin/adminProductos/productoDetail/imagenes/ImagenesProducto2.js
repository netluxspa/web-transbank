import ImagenesList from './imagenesList/ImagenesList';
import ImagenCreate from './imagenCreate/ImagenCreate'
import ImagenEdit from './imagenEdit/ImagenEdit';
import ImagenDelete from './imagenDelete/ImagenDelete';
import { useState } from 'react';


const ImagenesProducto2 = ({producto}) => {

 

    const [selectedImage, setSelectedImage] = useState(null)

    const options = [
        {
        id: 1,
        component: <ImagenesList editImage={i=>{setSelectedImage(i); setSelected(options[2])}} emitSelected={(s)=>setSelected(options[s])}  />
        },
        {
        id: 2,
        component: <ImagenCreate emitSelected={(s)=>setSelected(options[s])} producto={producto} />
        },
        {
        id: 3,
        component: <ImagenEdit emitSelected={(s)=>setSelected(options[0])} imagen={selectedImage} deleteImagen={(i)=>setSelected(options[3])} />
        },
        {
        id: 4,
        component: <ImagenDelete />
        }
    ]

    const [selected, setSelected] = useState(options[0])



    const renderContent = (selected) => {
        return selected.component
    }

    return renderContent(selected);
}

export default ImagenesProducto2;