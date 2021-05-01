import './App.css';
import history from './history'
import api from './api'
import { Router, Route, Redirect } from 'react-router-dom';
import Tienda from './moduls/tienda/Tienda'
import React from 'react'
import Nav from './components/Nav'



class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      pagina: null,
      error: null
    }
  }

  componentDidMount(){
    this.verificarSitio()
  }

  verificarSitio = () =>{
    const host = window.location.host;
    api.get(`/pagina/pagina/${host}`,
      {headers: {"Content-Type": "application/json"}}
    ).then(res =>{
      if (res && res.data){this.setState({pagina: res.data.codigo})}
    }).catch(err=>{this.setState({error: "Sitio no encontrado"})})
  }

  renderReturn = (
        <div>
          <div style={{position: "sticky", top: "0", zIndex: "1000"}}>
            <Nav  />
          </div>
          <Router history={history}>
            <Route exact  path="/">
                <Redirect to="/tienda" />
            </Route>
            <Route  path="/tienda" component={()=><Tienda pagina={this.state.pagina} />} />
          </Router>
        </div>
  )

  render() {
    const {pagina, error} = this.state;
    if (!pagina && !error){
      return <div>Loading ...</div>
    }else if (error){
      return <div>{error}</div>
    } else {
      return (
        this.renderReturn
      );
    }

  }
 
}

export default App;
