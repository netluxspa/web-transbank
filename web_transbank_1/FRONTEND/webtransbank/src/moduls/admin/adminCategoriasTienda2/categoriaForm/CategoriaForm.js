import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import api from '../../../../api';

import './CategoriaForm.css'

class CategoriaForm extends React.Component {

    constructor(props){
        super(props)
        const {categoria} = this.props;
        if (categoria) {
            this.state = {id: categoria.id, titulo: categoria.titulo, tienda: categoria.tienda}
        } else {
            this.state = {titulo: '', tienda: null}
        }
    }

    componentDidMount() {
        this.getTienda();
    }

    getTienda(){
        api.get('/commerce/tienda/?pagina__codigo=' + localStorage.getItem('site'),
            {headers: {'content-type':'application/json'}}
        ).then(res=>this.setState({tienda: res.data[0].id}))
    }

    renderForm = () => {
        const {titulo}=this.state;
        return(
            <div className='contFormCategoria'>

                <div>
                    <TextField
                        label="Titulo de la categoria"
                        variant="outlined"
                        onChange={e=>this.setState({titulo: e.target.value})} 
                        value={titulo}
                    />
                </div>
    
                <br></br>
                <br></br>

                <div>
                    <div>
                        <Button onClick={()=>this.props.submitCategoria(this.state)}  variant='contained' color="primary">
                            Guardar
                        </Button>
                    </div>

                </div>
            </div>
        )
    }

    render(){
        return this.renderForm()
    }
}

export default CategoriaForm;