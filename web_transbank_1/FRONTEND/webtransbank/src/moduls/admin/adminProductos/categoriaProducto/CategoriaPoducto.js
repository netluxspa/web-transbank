import React from 'react';

import './CategoriaPoducto.css'

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import api from '../../../../api'
import  history from '../../../../history'





class CategoriaProducto extends React.Component {

    constructor(props){
        super(props);
        this.state = {categorias: null}
    }

    componentDidMount() {
        this.getCategorias();
    }

    getCategorias = () => {
        api.get('/commerce/categoria/?tienda__pagina=' + localStorage.getItem('site'),
            {headers: {'content-type': 'application/json'}}
        ).then(res=>this.setState({categorias: res.data}))
    }

    renderCategorias = categorias =>{
        return categorias.map(c=>(
            <MenuItem key={c.id} value={c.id}>{c.titulo}</MenuItem>
        ))
    }


    renderReturn = (categorias) => {
        const {categoriaSelected} = this.props;
        return (
            <div className='gridCategoriaProducto'>
                <div>
                {
                    categorias.length > 0 ?
                    <FormControl style={{width: '100%'}}>
                        <InputLabel style={{width: '100%', marginLeft:'10px', padding:'3px'}}>
                            categoría
                        </InputLabel>
                        <Select variant='outlined'  style={{width: '100%'}}
    
                            value={ categoriaSelected }
                            onChange={(e)=>this.props.submitCategoria(e.target.value)}
                            >
                            <MenuItem value={null}>
                                <em>Ninguna</em>
                            </MenuItem>
                            {this.renderCategorias(categorias)}
                        </Select>
                    </FormControl> :
                    'no hay categorias creadas'

                }


                </div>
                <div style={{display:'flex', justifyContent: 'center', cursor: 'pointer'}}>
                   < AddCircleIcon color='primary' onClick={()=>history.push('/admin/categorias-tienda/new')} />
                </div>
            </div>
        )
    }

    render() {
        const {categorias} = this.state;
        if (!categorias){
            return 'loading'
        } else {
                return this.renderReturn(categorias)
            }
        }

    }

    


export default CategoriaProducto;