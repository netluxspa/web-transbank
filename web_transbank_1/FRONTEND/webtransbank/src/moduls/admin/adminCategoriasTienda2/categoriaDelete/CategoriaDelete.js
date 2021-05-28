import React from 'react';
import Modal from '../../../../components/modal/Modal'
import history from '../../../../history'
import api from '../../../../api'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './CategoriaDelete.css'


class CategoriaDelete extends React.Component {

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

    deleteCategoria(id){
        api.delete('/commerce/categoria/' + id,
            {headers: {'content-type': 'application/json', 'site': localStorage.getItem('site'), 'adminkey': localStorage.getItem('adminkey')}}
        ).then(res=>{
            history.push('/admin/categorias-tienda')
        }).catch(err=>{
            console.log(err)
        })
    }

    renderCategoriaDelete = (categoria) => {

        if (categoria){
            return(
                <div className='contDeleteCategoria'>
                    <div>
                        <Typography align="center" style={{marginLeft:'20px'}}  color="textPrimary" >
                            ¿Esta seguro que desea eliminar la categoria <b> { categoria.titulo } </b>?
                        </Typography>
                    </div>
                    <br></br>
                    <br></br>
                    <div>
                        <Button onClick={()=>this.deleteCategoria(categoria.id)} className='smallText' style={{marginRight:'10px'}} variant="contained" size="small" color="secondary">
                            Eliminar
                        </Button>
                        <Button onClick={()=>history.push(`/admin/categorias-tienda`)} className='smallText'  variant="outlined" size="small" color="primary">
                                Cancelar
                        </Button>
                    </div>
                </div>
            )
        }else{
            return 'loading'
        }

        
    }

    render() {
        const {categoria} = this.state;
        return(
            <Modal 
                component={this.renderCategoriaDelete(categoria)} 
                titulo='Eliminación de categoria' 
                ondismiss={()=>history.push('/admin/categorias-tienda')}
            />
        )
    }


}

export default CategoriaDelete;