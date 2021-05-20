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

import history from '../../history'
import api from '../../api'
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

export default function SignUp() {
  const classes = useStyles();
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [password2, setPassword2] = React.useState('')
  const [error, setError] = React.useState('')
  const [openVerifiEmail, setOperVerifyEmail] = React.useState(false);
  const [openResetPassword, setOperResetPassword] = React.useState(false);

  const [errorPassword, setErrorPassword] = React.useState('');
  const [successPassword, setSuccessPassword] = React.useState('');

  const [succesApiPassword, setsuccesApiPassword] = React.useState('')
  const [errorApiPassword, seterrorApiPassword] = React.useState('')

  const sendVerifyCode = (e) => {
        const body = {
            email: email
        }
        e.preventDefault()
        api.post('/pagina/try-reset-password/',
            body,
            {headers: {"content-type": "application/json", "site": localStorage.getItem('site')}}
        ).then(res=>{
            setOperVerifyEmail(true)
        }).catch(err=>{
            if (err && err.response && err.response.data && err.response.data.error){
                const {error} = err.response.data;
                setError(error)
            }else{
                setError('Ha ocurrido un error inesperado. Comprueba tu conexión a internet.')
            }
        })
  }

  const handleUserKey = (e) => {
    setOperResetPassword(true)
  }


  const verifyPassword2 = (e) => {
    setPassword2(e)
    if (!e){
      setSuccessPassword('')
      setErrorPassword('')
    } else {
      if (password){
        if (password !== e){
          setSuccessPassword('')
          setErrorPassword('Las contraseñas no coinciden')
        } else {
          setErrorPassword('')
          setSuccessPassword('Las contraseñas conciden')
        }
      }
    }
    
   

  }

  const verifyPassword = (e) => {
    setPassword(e);
    if (!e){
      setSuccessPassword('')
      setErrorPassword('')
    } else {
      if (password2){
        if (password2 == e){
          setErrorPassword('')
          setSuccessPassword('Las contraseñas coinciden')
        } else {
          setSuccessPassword('')
          setErrorPassword('Las contraseñas no coinciden')
        }
      }
    }


  }

  const resetPassword = (e) => {
    e.preventDefault();

    const body = {
      password: password
    }

    api.post('pagina/reset-password/',
      body,
      {headers: {'content-type': 'application/json', 'site': localStorage.getItem('site'), 'userkey': localStorage.getItem('userkey')}}
    ).then(res=>{
        if (res && res.data && res.data.message){
          setsuccesApiPassword(res.data.message);
          setTimeout(() => {
              history.push('/tienda/caja')
          }, 3000);
        }
    }).catch(err=>{
      if (err && err.response && err.response.data && err.response.data.error){
        seterrorApiPassword(err.response.data.error)
      }else {
        seterrorApiPassword('Ha ocurrido un error inesperado. Comprueba tu conexión a internet')
      }
    });
  }

  const retrunResetPassword = (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Recuperación de contraseña
            </Typography>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    type="password"
                    id="firstName"
                    label="Nueva contraseña"
                    autoFocus
                    onChange={(e)=>verifyPassword(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={12}>
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    type="password"
                    required
                    fullWidth
                    id="firstName"
                    label="Repita contraseña"
                    autoFocus
                    onChange={(e)=>verifyPassword2(e.target.value)}
                    change={()=>console.log('work change')}
                  />
                </Grid>

              </Grid>
              {errorPassword ? <Alert severity="error">{errorPassword}</Alert>: null}
              {successPassword ? <Alert severity="success">{successPassword}</Alert>: null}
              <Button
                onClick={(e)=>resetPassword(e)}
                disabled = {successPassword ? false : true}
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Continuar
              </Button>
              {errorApiPassword ? <Alert severity="error">{errorApiPassword}</Alert>: null}
              {succesApiPassword ? <Alert severity="success">{succesApiPassword}</Alert>: null}
              
            </form>
          </div>
      </Container>
  )

  if (!openVerifiEmail && !openResetPassword){
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Recuperación de contraseña
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="Correo"
                  autoFocus
                  onChange={(e)=>setEmail(e.target.value)}
                />
              </Grid>
  
            </Grid>
            {error ? <Alert severity="error">{error}</Alert>: null}
            <Button
              onClick={(e)=>sendVerifyCode(e)}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Continuar
            </Button>
  
          </form>
        </div>
  
      </Container>
    );
  } else if (openVerifiEmail && !openResetPassword){
    return <VerifyEmail sendUserKey={(e)=>handleUserKey(e)} email={email} />
  } else {
    return (retrunResetPassword)
  }


}