 
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Alert from '@material-ui/lab/Alert';

import { useState } from 'react'
import api from '../../api'

import { connect } from 'react-redux';
import history from '../../history'

import { getUser } from '../../actions/userPagina';

import VerifyEmail from './verifiEmail/VerifyEmail';



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));




function SignUp({getUser}) {


  const classes = useStyles();

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword]= useState('');
  const [errorEmailExiste, setErrorEmailExiste] = useState(false);
  const [openVerifiEmail, setOperVerifyEmail] = useState(false);


  const registerUser = ({nombre, email, password}, e) => {
    e.preventDefault();
    api.post('/pagina/register-user/', 
      {nombre: nombre, email: email, password: password, pagina: localStorage.getItem('site')},
      {headers: {"content-type": "application/json", "site": localStorage.getItem('site')}}
    ).then(res=>{
      if (res.status == 200){
        setOperVerifyEmail(true)
      }
    }).catch(err=> {
      if (err && err.response && err.response.data){
        const errors = Object.keys(err.response.data)
        if (errors.includes('non_field_errors')){
          setErrorEmailExiste(true);
        }
        if (errors.includes('codigo_vigente')){
          setOperVerifyEmail(true)
        }
      }
    })
  }

  const handleUserKey = (e) => {
    history.push('/tienda/caja')
  }

  if (!openVerifiEmail){
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registro de cliente
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="Ingrese su nombre"
                  autoFocus
                  onChange={e=>setNombre(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Ingrese su correo"
                  name="lastName"
                  autoComplete="lname"
                  onChange={e=>setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Ingrese su contraseña"
                  name="email"
                  type="password"
                  autoComplete="email"
                  onChange={e=>setPassword(e.target.value)}
                />
              </Grid>
              
            </Grid>
            {errorEmailExiste ? <Alert severity="error">Ya estás registrado!. Inicia sesión.</Alert>: null}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={(e)=>registerUser({nombre: nombre, email: email, password: password}, e)}
            >
              Registrar
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link onClick={()=>history.push('/auth/login')} variant="body2">
                  ¿Ya estás registrado? Inicia sesión.
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>

      </Container>
    );
  } else {
    return  <VerifyEmail sendUserKey={(e)=>handleUserKey(e)} email={email} />
  }
}

const mapStateToProps = (state) => {
  return {
    pagina: state.pagina
  }
}

export default connect( mapStateToProps, {getUser})(SignUp);