import React from 'react';
import Modal from '../../../../components/modal/Modal'
import api from '../../../../api'
import history from '../../../../history'
import CategoriaForm from '../categoriaForm/CategoriaForm'


class CategoriaEdit extends React.Component {

    constructor(props){
        super(props)
        this.state = {categoria: null}
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        this.getCategoria(id)
    }

    getCategoria(id){
        api.get('/commerce/categoria/' + id,
            {headers: {'content-type': 'application/json'}}
        ).then(res=>{
            this.setState({categoria: res.data})
        })
    }


    updateCategoria(newCategoria){
        console.log('categoria a crear', newCategoria)

        api.patch('/commerce/categoria/' + newCategoria.id +'/',
            newCategoria,
            {headers: {'content-type':'application/json', 'site': localStorage.getItem('site'), 'adminkey': localStorage.getItem('adminkey')}}
        ).then(res=>history.push('/admin/categorias-tienda'))
    }


    renderCategoriaEdit = (categoria) => {
        if (categoria){
            return (
                <CategoriaForm submitCategoria={(newCategoria)=>this.updateCategoria(newCategoria)} categoria={categoria} />
            )
        } else {
            return 'loading';
        }

        
    }


    render(){
        const {categoria} = this.state;
        return (
            <Modal 
                component={this.renderCategoriaEdit(categoria)} 
                titulo='Actualizar una categoria' 
                ondismiss={()=>history.push('/admin/categorias-tienda')}
            />
        )
    }
}

export default CategoriaEdit;