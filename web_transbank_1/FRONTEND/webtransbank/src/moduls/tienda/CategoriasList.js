import React from 'react';
import api from './../../api'



class CategoriasList extends React.Component {

    constructor(props){
        super(props);
        this.tienda = props.tienda
        this.state = {categorias: []}
    }

    componentDidMount(){
        this.getCategorias();
    }

    getCategorias = () => {
        api.get('/commerce/categoria/',
            {params: {tienda: this.tienda},},
            {headers: {"Content-Type": "application/json"},}
        ).then(res=>{
            this.setState({categorias: res.data})
        })
    }

    onClickCategoria = (c) => {
        this.props.onCategoriaSelected(c)
    }

    renderCategorias = () => { 
        return (
            <div>
                <div onClick={()=>this.onClickCategoria(null)}>
                    Todos los productos
                </div>
               {this.state.categorias.map(c=>{
                    return <div onClick={()=>this.onClickCategoria(c)} key={c.id}>{c.titulo}</div>
                })}
            </div>
            )
    }

    render() {
        const {categorias} = this.state
        if (categorias.length > 0) {
            return this.renderCategorias()
        } else {
            return null
        }
    }
}

export default CategoriasList;