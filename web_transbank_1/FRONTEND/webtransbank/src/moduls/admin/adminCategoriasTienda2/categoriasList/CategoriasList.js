import Modal from '../../../../components/modal/Modal'

import history from '../../../../history'

import api from '../../../../api'

import { useState, useEffect } from 'react';

import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import './CategoriasList.css'







const CategoriasList = () =>{


    const [categorias, setCategorias] = useState(null)



    useEffect(()=>{
        if (!categorias){
            getCategorias(localStorage.getItem('site'))
        }
    }, [categorias])


    const getCategorias = (pagina) => {
        api.get('/commerce/categoria',
        {params: {
            tienda__pagina: pagina
        }},
        {headers: {'content-type': 'application/json'}}
        ).then(res=>{
            setCategorias(res.data)
        })
    }
    

    const renderCategoriasList = (categorias) =>{
        return(
            <div className='gridCategoriasTienda'>
                <div style={{display: 'flex', justifyContent:'flex-end'}}>  
                    <Button onClick={()=>history.push('/admin/categorias-tienda/new')} className='smallText' variant="contained" size="small" color="primary">
                        Crear
                    </Button>
                </div>

                {categorias.map(c=>(
                    <div className='item' key={c.id}>
                        <div className='content'>{c.titulo}</div>
                        <div className='options'> 
         
                            <Button onClick={()=>history.push(`/admin/categorias-tienda/edit/${c.id}`)} className='smallText' style={{marginRight:'10px'}} variant="outlined" size="small" color="primary">
                                <EditIcon />
                            </Button>
                            <Button onClick={()=>history.push(`/admin/categorias-tienda/delete/${c.id}`)} className='smallText'  variant="outlined" size="small" color="secondary">
                                 <DeleteIcon />
                            </Button>
                        </div>
                    </div>
                ))}

                { categorias.length == 0 ? <div>No hay categorias creadas</div> : null }

            </div>
        )
    }


    if (!categorias){
        return 'loading'
    } else {
        return (
            <Modal 
                component={renderCategoriasList(categorias)} 
                titulo='Edición de categorias de la tienda' 
                ondismiss={()=>history.push('/tienda')}
            />
        )
    }

}

export default CategoriasList;