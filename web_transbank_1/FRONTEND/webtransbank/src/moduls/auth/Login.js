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



import { connect } from 'react-redux';

import { getUser } from '../../actions/userPagina'

import { useState } from 'react'

import history from '../../history'

import api from '../../api'



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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));




function SignIn({getUser}) {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword]= useState('');
  const [error, setError]= useState('');



  const loginUser = ({email, password}, e) => {
    e.preventDefault();
    api.post('/pagina/login-user/', 
      {email: email, password: password},
      {headers: {"Content-Type": "application/json", "site":localStorage.getItem('site')}}
    ).then(res=>{
        if(res && res.data && res.data.userkey){
          const {userkey} = res.data;
          localStorage.setItem('userkey', userkey)
          getUser();
          history.push('/tienda/caja')
        }
    }).catch(err=>{
      if (err && err.response && err.response.data && err.response.data.error){
        const {error} = err.response.data;
        setError(error)
      }else{
        setError('Ocurrio un error inesperado. Porfavor revisa tu conexión a internet.')
      }
    })
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
          {error ? <Alert severity="error">{error}</Alert>: null}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e)=>loginUser({email, password}, e)}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link onClick={()=>history.push('/auth/reset-password')} variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link onClick={()=>history.push('/auth/register')} variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>

    </Container>
  );
}


export default connect(null, { getUser })(SignIn)