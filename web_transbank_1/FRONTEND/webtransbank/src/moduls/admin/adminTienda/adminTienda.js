import Modal from '../../../components/modal/Modal'
import history from '../../../history'
import api from '../../../api'
import './adminTiendaStyle.css'
import { useState, useEffect } from 'react';

import Typography from '@material-ui/core/Typography';


import Alert from '@material-ui/lab/Alert';

import Button from '@material-ui/core/Button';


import TextField from '@material-ui/core/TextField';

import SelectorCity from './selectorCity/SelectorCity';




const AdminTienda = () => {

    const [tienda, setTienda] = useState(null)
    const [titulo, setTitulo] = useState('')

    const [color, setColor] = useState('')


    const [descripcion, setDescripcion] = useState('')

    const [error, setError] = useState('')
    const [exito, setExito] = useState('')

    const [openSelectorCity, setOpenSelectorCity] = useState(false)
    const [citySelected, setCitySelected] = useState(null)
    
    

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
            console.log(res)
            setTienda(res.data[0])
            setTitulo(res.data[0].titulo)
            setDescripcion(res.data[0].descripcion)
        })
    }

    const applyEdición = (titulo, descripcion) => {
        var body = {}
        if (citySelected){ 
             body = {
                titulo: titulo,
                descripcion: descripcion,
                color: color,
                starken_origen_code: citySelected.code_dls,
                starken_origin_name:  citySelected.name
            }
        } else {
             body = {
                titulo: titulo,
                descripcion: descripcion,
                color_primary: color,
            }
        }

        api.patch('/commerce/tienda/' + tienda.id + '/',
            body, 
            {headers: {'content-type': 'application/json', 'site': localStorage.getItem('site'), 'adminkey': localStorage.getItem('adminkey')}}
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
                { openSelectorCity ?
                    <div>
                        <SelectorCity  
                        emitData={d=>{setCitySelected({code_dls: d.code_dls, name: d.name}); setOpenSelectorCity(false)}} 
                        close={()=>setOpenSelectorCity(false)} 
                        label='Seleccione ciudad de su centro de distribución.'
                        />
                    </div> 
                    :
                    <div>
                        <div style={{display:'block'}}>
                            {tienda.starken_origen_code ?
                            <div style={{display:'grid',padding:'5px', gridTemplateColumns:'1fr 1fr',borderRadius:'4px', border: 'solid 1px rgba(128, 128, 128, 0.36)'}}>
                                <div style={{padding:'5px', fontWeight: '600'}}>
                                    <Typography style={{fontWeight: '600'}}  color="textPrimary" >
                                        Ciudad
                                    </Typography>
                                </div>
                                <div style={{padding:'5px'}}>
                                    <Typography  color="textPrimary" >
                                        {tienda.starken_origin_name}
                                    </Typography>
                                </div>
                            </div>
                            :
                            null
                        }
                            <div  > 
                            <Button 
                                onClick={()=>setOpenSelectorCity(true)}
                                variant='outlined' 
                                size='small' 
                                color='primary'
                            >
                                {(tienda && tienda.starken_origen_code) || citySelected ? 'Cambiar centro de distribución' : 'Definir centro de distribución'}
                            </Button>
                            </div>
                            <br></br>
                            <div>
                                {citySelected ? 

                                <div style={{display:'grid',padding:'5px', gridTemplateColumns:'1fr 1fr',borderRadius:'4px', border: 'solid 1px rgba(128, 128, 128, 0.36)'}}>
                                    <div style={{padding:'5px', fontWeight: '600'}}>
                                        <Typography style={{fontWeight: '600'}}  color="textPrimary" >
                                            Ciudad
                                        </Typography>
                                    </div>
                                    <div style={{padding:'5px'}}>
                                        <Typography  color="textPrimary" >
                                            {citySelected.name}
                                        </Typography>
                                    </div>
                                </div>
                                
                                // `name: ${citySelected.name} - code_dls: ${citySelected.code_dls}` 
                                : 
                                null }
                            </div>
                        </div>
                    </div>
                }
                                
                <div>
                    <TextField
                        label="Código color de la tienda"
                        id="outlined-size-normal"
                        value={color}
                        onChange={(e)=>setColor(e.target.value)}
                        variant="outlined"
                    />
                    <div style={{margin:'10px 0 0 0',textAlign:'left'}}>
                        <span>Puede revisar códigos de colores <a target="_blank" href='https://htmlcolorcodes.com/color-chart/material-design-color-chart/'>aquí</a> </span>
                    </div>
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
                ondismiss={()=>history.goBack()}
            />
            )
    }else {
        return null
    }

    
    
}

export default AdminTienda