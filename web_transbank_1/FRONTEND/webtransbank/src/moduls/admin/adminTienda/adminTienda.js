import Modal from '../../../components/modal/Modal'
import history from '../../../history'
import api from '../../../api'
import './adminTiendaStyle.css'
import { useState, useEffect } from 'react';

import Alert from '@material-ui/lab/Alert';

import Button from '@material-ui/core/Button';


import TextField from '@material-ui/core/TextField';




const AdminTienda = () => {

    const [tienda, setTienda] = useState(null)
    const [titulo, setTitulo] = useState('')
    const [descripcion, setDescripcion] = useState('')

    const [error, setError] = useState('')
    const [exito, setExito] = useState('')
    
    

    useEffect(()=>{
        if (!tienda){
            getTienda(localStorage.getItem('site'))
        }
    }, [tienda])

    const getTienda = (pagina) =>{
        api.get('/commerce/tienda/',
            {params: {
                pagina: pagina
            }},
            {headers: {'content-type': 'application/json'}}
        ).then(res=>{
            setTienda(res.data[0])
            setTitulo(res.data[0].titulo)
            setDescripcion(res.data[0].descripcion)
        })
    }

    const applyEdición = (titulo, descripcion) => {
        const body = {
            titulo: titulo,
            descripcion: descripcion
        }
        api.patch('/commerce/tienda/' + tienda.id + '/',
            body, 
            {headers: {'content-type': 'application/json'}}
        ).then(res=>{
            setExito('Los cambios se han realizado con éxito')
        }).catch(err=>{
            setError('Ha ocurrido un error al aplicar los cambios')
        })
    }

    const renderAdminTienda = (tienda) => {
        return (
            <div className='adminTiendaGrid'>
                <div>
                    <TextField
                        label="Titulo de la tienda"
                        id="outlined-size-normal"
                        value={titulo}
                        onChange={(e)=>setTitulo(e.target.value)}
                        variant="outlined"
                    />
                </div>
                <div>
                <TextField
                    label="Descripción de la tienda"
                    id="outlined-size-normal"
                    value={descripcion}
                    onChange={(e)=>setDescripcion(e.target.value)}
                    variant="outlined"
                    multiline
                    rows={4}
                    />
                </div>
                <div>
                    {error ? <div ><Alert severity="error">{error}</Alert></div>: null}
                    {exito ? <div ><Alert severity="success">{exito}</Alert></div>: null}
                </div>
                <div>
                    <div>
                        <Button onClick={()=>applyEdición(titulo, descripcion)} variant='contained' color="primary">
                            Guardar cambios
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

    if (tienda){
        return (
            <Modal 
                tienda={tienda}
                component={renderAdminTienda(tienda)} 
                titulo='Edición de información de tienda' 
                ondismiss={()=>history.push('/tienda')}
            />
            )
    }else {
        return null
    }

    
    
}

export default AdminTienda