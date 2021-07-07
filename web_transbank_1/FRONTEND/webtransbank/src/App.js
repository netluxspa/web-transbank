import './App.css';
import { connect } from 'react-redux';
import history from './history'
import api from './api'
import { Router, Route, Redirect } from 'react-router-dom';
import Tienda from './moduls/tienda/Tienda'

import Clientes from './moduls/clientes/Clientes'

import React from 'react'
import Nav from './components/Nav'

import Admin from './moduls/admin/Admin'

import Auth from './moduls/auth/Auth'
import { ADD_PAGINA, ADD_USER_PAGINA, ADD_ADMIN_PAGINA ,REMOVE_USER_PAGINA } from './actions/types';
import { getUser } from './actions/userPagina';
import { createMuiTheme, ThemeProvider } from "@material-ui/core";



class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      pagina: null,
      error: null,
      theme: null
    }
  }

  componentDidMount(){
    this.verificarSitio();
    this.getColor();
    
  }



  getUser = () =>{
    const userkey = localStorage.getItem('userkey')
    if (userkey){
      api.get('/pagina/get-user/', 
      {headers: {"content-type": "application/json", "site": localStorage.getItem('site'), 'userkey': localStorage.getItem('userkey')}}
      ).then(res=>{
          if (res && res.data) {
              this.props.dispatch({type: ADD_USER_PAGINA, payload: res.data})
          }
      }).catch(()=> this.props.dispatch({type: REMOVE_USER_PAGINA}))
    }else{
      this.props.dispatch({type: REMOVE_USER_PAGINA})
    }
  }


  getAdmin = () =>{
    const userkey = localStorage.getItem('adminkey')
    if (userkey){
      api.get('/pagina/get-admin/', 
      {headers: {"content-type": "application/json", "site": localStorage.getItem('site'), 'adminkey': localStorage.getItem('adminkey')}}
      ).then(res=>{
          if (res && res.data) {
              this.props.dispatch({type: ADD_ADMIN_PAGINA, payload: res.data})
          }
      }).catch(()=>this.props.dispatch({type: ADD_ADMIN_PAGINA, payload: false}))
    }
  }

  

  verificarSitio = () =>{
    const host = window.location.host;
    api.get(`/pagina/pagina/${host}`,
      {headers: {"Content-Type": "application/json"}}
    ).then(res =>{
      if (res && res.data){
        this.setState({pagina: res.data.codigo});
        localStorage.setItem('site',res.data.codigo)
        this.getUser();
        this.getAdmin();
        this.props.dispatch({type: ADD_PAGINA, payload: res.data})
      }
    }).catch(err=>{this.setState({error: "Sitio no encontrado"})})
  }

  getColor = () => {
    const host = window.location.host;
    api.get(`/commerce/tienda/?pagina__codigo=${host}`,
      {headers: {"Content-Type": "application/json"}}
    ).then(res =>{
      if (res && res.data.length > 0 && res.data[0].color_primary && res.data[0].color_secondary ){
        const theme = createMuiTheme({
          palette: {
             primary: {
                main: res.data[0].color_primary // This is an orange looking color
                       },
             secondary: {
                main: res.data[0].color_secondary //Another orange-ish color
                        }
                   },
            // fontFamily: font // as an aside, highly recommend importing roboto font for Material UI projects! Looks really nice
            });
            this.setState({theme: theme})
            console.log(this.state.theme)
      }
    })
  }




  renderReturn = () =>{
      return (
      <ThemeProvider theme={this.state.theme }>
          <div>
            <div style={{position: "sticky", top: "0", zIndex: "1000"}}>
              <Nav  />
            </div>
            <Router history={history}>
              <Route exact  path="/">
                  <Redirect to="/admin" />
              </Route>
              <Route path='/auth' component={Auth}></Route>
              <Route path='/clientes' component={Clientes}></Route>


              
              <Route path='/admin' component={Admin}></Route>
              <Route  path="/tienda" component={()=><Tienda pagina={this.state.pagina} />} />
            </Router>
          </div>
        </ThemeProvider>)
  }

  render() {
    const {pagina, error} = this.state;
    if (!pagina && !error){
      return <div>Loading ...</div>
    }else if (error){
      return <div>{error}</div>
    } else {
      return (
        this.renderReturn()
      );
    }

  }
 
}


const mapDispatchToProps = (dispatch) => {
  return {
      dispatch: (obj)=> dispatch(obj),
  }
};


export default connect(null, mapDispatchToProps)(App);
