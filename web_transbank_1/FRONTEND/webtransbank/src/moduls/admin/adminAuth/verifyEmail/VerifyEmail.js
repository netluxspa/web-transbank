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
import { getAdmin } from '../../../../actions/adminPagina'
import history from '../../../../history'

import api from '../../../../api'

import {useState} from 'react';


import './verifiEmailStyles.css'



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

function VerityEmail({email, sendAdminKey}) {
  const classes = useStyles();

  const [numero1, setNumero1] = useState(null);
  const [numero2, setNumero2] = useState(null);
  const [numero3, setNumero3] = useState(null);
  const [numero4, setNumero4] = useState('');

  const [numFocus, setNumFocus] = useState(1)

  const [error, setError] = useState(null)

  const setAnyNumber = (e, num) => {
    const re = /^[0-9\b]+$/;
    
      if (num === 1){
        if (e.target.value === '' || re.test(e.target.value)) {
          if (e.target.value.length > 1){
            setNumero1(e.target.value[e.target.value.length -1])
            setNumFocus(2)
          }else {
            setNumero1(e.target.value)
            setNumFocus(2)
          }
        } else {
          setNumero1('')
        }
      }else if(num===2){
        if (e.target.value === '' || re.test(e.target.value)) {
          if (e.target.value.length > 1){
            setNumero2(e.target.value[e.target.value.length -1])
            setNumFocus(3)
          }else {
            setNumero2(e.target.value)
            setNumFocus(3)
          }
        } else {
          setNumero2('')
        }
      }else if(num==3){
        if (e.target.value === '' || re.test(e.target.value)) {
          if (e.target.value.length > 1){
            setNumero3(e.target.value[e.target.value.length -1])
            setNumFocus(4)
          }else {
            setNumero3(e.target.value)
            setNumFocus(4)
          }
        } else {
          setNumero3('')
        }
      }else{
        if (e.target.value === '' || re.test(e.target.value)) {
          if (e.target.value === '' || re.test(e.target.value)) {
            if (e.target.value.length > 1){
              setNumero4(e.target.value[e.target.value.length -1])
            }else {
              setNumero4(e.target.value)
            }
          } else {
            setNumero4('')
          }
      }
    }
  }

  const isValidToSend = () =>{
    if (numero1 && numero2 && numero3 && numero4){
      return false
    }else{
      return true
    }
  }

  const sendCode = (e) => {
    e.preventDefault();
    const body = {
      code: numero1 + numero2 + numero3 + numero4,
      email: email
    }
    api.post('/pagina/verify-code-admin/',
      body,
      {headers: {'content-type': 'application/json'}}
    ).then(res=>{
      if (res && res.data && res.data.adminkey){
        const adminkey = res.data.adminkey;
        localStorage.setItem('adminkey', adminkey)
        
        sendAdminKey(res.data.adminkey);
      }
    }).catch(err=>{
      if (err && err.response && err.response.data && err.response.data.error){
        setError(err.response.data.error)
        setTimeout(() => {
          setError('')
        }, 4000);
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
          Ingrese código de verificación
        </Typography>
        <br></br>
        <Typography >
          Hemos enviado un código de 4 números al correo  <b>{email}</b>.
        </Typography>
        <form className={classes.form} noValidate>
         
            <div className='contVerifiEmailInputs'>
                <div>
                  <TextField
                    focused = {numFocus === 1 ? true : false}
                    inputProps={{min: 0, style: { textAlign: 'center' }}}
                    id="outlined-multiline-flexible"
                    multiline
                    rowsMax={4}
                    type='number'
                    variant="outlined"
                    onChange={(e)=>setAnyNumber(e,1)}
                    value={numero1}
                  />
                </div>
                <div>
                  <TextField
                      focused = {numFocus === 2 ? true : false}
                      inputProps={{min: 0, style: { textAlign: 'center' }}}
                      id="outlined-multiline-flexible"
                      multiline
                      rowsMax={4}
                      variant="outlined"
                      onChange={(e)=>setAnyNumber(e,2)}
                      value={numero2}
                    />
                </div>
                <div>
                  <TextField
                      
                      focused = {numFocus === 3 ? true : false}
                      inputProps={{min: 0, style: { textAlign: 'center' }}}
                      id="outlined-multiline-fleible"
                      multiline
                      rowsMax={4}
                      variant="outlined"
                      onChange={(e)=>setAnyNumber(e,3)}
                      value={numero3}

                    />
                </div>
                <div>
                  <TextField
                      focused = {numFocus === 4 ? true : false}
                      inputProps={{min: 0, style: { textAlign: 'center' }}}
                      id="outlined-multiline-flexble"
                      multiline
                      rowsMax={4}
                      variant="outlined"
                      onChange={(e)=>setAnyNumber(e,4)}
                      value={numero4}

                    />
                </div>
            </div>
            {error ? <Alert severity="error">{error}</Alert>: null}
          <Button
            disabled = {isValidToSend()}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e)=>sendCode(e)}
          >
            Continuar
          </Button>
        </form>
      </div>

    </Container>
  );
}



export default connect(null, )(VerityEmail)