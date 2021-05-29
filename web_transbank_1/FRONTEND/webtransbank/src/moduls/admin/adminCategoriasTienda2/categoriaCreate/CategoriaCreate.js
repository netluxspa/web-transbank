import React from 'react';
import Modal from '../../../../components/modal/Modal'
import history from '../../../../history'
import CategoriaForm from '../categoriaForm/CategoriaForm'
import api from '../../../../api';

class CategoriaCreate extends React.Component {


    createCategoria(newCategoria){
        console.log('categoria a crear', newCategoria)

        api.post('/commerce/categoria/',
            newCategoria,
            {headers: {'content-type':'application/json', 'site': localStorage.getItem('site'), 'adminkey': localStorage.getItem('adminkey')}}
        ).then(res=>history.goBack())
    }



    renderCategoriaCreate = () => {
        return (
            <CategoriaForm submitCategoria={(newCategoria)=>this.createCategoria(newCategoria)} categoria={null} />
        )
        
    }

    render(){
        return  (
            <Modal 
                component={this.renderCategoriaCreate()} 
                titulo='Crear nueva categoría' 
                ondismiss={()=>history.goBack()}
            />
        )
    }
}

export default CategoriaCreate;