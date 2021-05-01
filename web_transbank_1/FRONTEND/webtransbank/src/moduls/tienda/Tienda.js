import React from 'react';
import { Route } from 'react-router-dom';
import api from './../../api'
import CategoriasList from './CategoriasList'
import ProductosList from './ProductoList'
import ProductoDetail from './ProductoDetail'
import history from '../../history'

class Tienda extends React.Component {

    constructor(props){
        super(props)
        this.pagina = props.pagina
        this.state = {
          tienda: null, 
          error: null, 
          categoriaSelected: null, 
          productos : null,
          productoSelected: null,
          categorias: []
        }
    }

    componentDidMount(){
        this.getTienda();
    }
    
    getTienda = () =>{
        api.get(`/commerce/tienda/`,
            {params: {pagina: this.pagina}},
            {headers: {"Content-Type": "application/json"}}
        ).then(res =>{
          if (res && res.data.length > 0){
            this.setState({tienda: res.data[0]});
            this.getProductos();
            this.getCategorias();
          }
        }).catch(err=>{this.setState({error: "Tienda no encontrada"})})
    }

    getCategorias = () => {
      api.get('/commerce/categoria/',
          {params: {tienda:this.state.tienda.id},},
          {headers: {"Content-Type": "application/json"},}
      ).then(res=>{
          this.setState({categorias: res.data})
      })
  }

    getProductos = () => {
        api.get('/commerce/producto/',
            {params: {tienda: this.state.tienda.id},},
            {headers: {"Content-Type": "application/json"}}
        ).then(res=>{
            if (res && res.data){
                this.setState({productos: res.data})
            }
        }).catch(err=>{this.setState({error: 'Error al cargar los productos', loading: false})})
    }

    onCategoriaSelected = (categoriaSelected) =>{
        this.setState({categoriaSelected: categoriaSelected})
        history.push(`/tienda`);
    }

    onProductoClick = (p) =>{
      this.setState({productoSelected: p});
      history.push(`/tienda/producto/${p.url}`);
    }

    renderReturn = (tienda) => {
      const { categoriaSelected, productos, productoSelected } = this.state;
        if (tienda && productos){
            return (
                <div>      
                  {productoSelected ? 'Producto Selected' : null}             
                    <Route path="/tienda/" exact component={
                      ()=><ProductosList 
                        productos={this.state.productos} 
                        categorias={this.state.categorias} 
                        onProductoClick={(p)=>this.onProductoClick(p)} 
                        selectCategoria={(c)=>this.setState({categoriaSelected: c})}
                        categoriaSelectedId={ categoriaSelected ? categoriaSelected.id : null}/>
                      } />
                    <Route path="/tienda/producto/:url_producto" exact component={ProductoDetail} /> 
                </div>
                )
        } else {
            return null
        }
    } 

    render() {
        const {tienda, error} = this.state;
        if (!tienda && !error){
          return <div>Loading ...</div>
        }else if (error){
          return <div>{error}</div>
        } else {
          return (
            this.renderReturn(tienda)
          );
        }
    }

}

export default Tienda;