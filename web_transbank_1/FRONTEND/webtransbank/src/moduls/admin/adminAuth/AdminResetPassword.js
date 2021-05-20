import React from 'react';

import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import VerifyEmail from './verifyEmail/VerifyEmail'
import api from '../../../api';

import { connect } from 'react-redux';
import { getAdmin } from '../../../actions/adminPagina';

const AdminResetPassword = ({getAdmin}) =>{

    const [email, setEmail] = React.useState('')
    const [emailError, setEmailError] = React.useState('')

    const [openVerifyEmail, setOperVerifyEmail] = React.useState(false)
    const [openResetPassword, setOpenResetPassword] = React.useState(false)

    const [password, setPassword] = React.useState('')
    const [password2, setPassword2] = React.useState('')

    const [passwordError, setPasswordError] = React.useState('')
    const [passwordSuccess, setPasswordSuccess] = React.useState('')


    const [apiPasswordError, setApiPasswordError] = React.useState('')
    const [apiPasswordSuccess, setApiPasswordSuccess] = React.useState('')




    const verifyPassword2 = (e) => {
        setPassword2(e)
        if (!e){
            setPasswordSuccess('')
            setPasswordError('')
        } else {
          if (password){
            if (password !== e){
                setPasswordSuccess('')
                setPasswordError('Las contraseñas no coinciden')
            } else {
                setPasswordError('')
                setPasswordSuccess('Las contraseñas conciden')
            }
          }
        }
        
       
    
      }
    
    const verifyPassword = (e) => {
        setPassword(e);
        if (!e){
            setPasswordSuccess('')
            setPasswordError('')
        } else {
            if (password2){
            if (password2 == e){
                setPasswordError('')
                setPasswordSuccess('Las contraseñas coinciden')
            } else {
                setPasswordSuccess('')
                setPasswordError('Las contraseñas no coinciden')
            }
            }
        }


    }



    const resetPassword = () => {
    
        const body = {
          password: password
        }
    
        api.post('pagina/reset-password-admin/',
          body,
          {headers: {'content-type': 'application/json', 'site': localStorage.getItem('site'), 'adminkey': localStorage.getItem('adminkey')}}
        ).then(res=>{
            if (res && res.data && res.data.message){
                setApiPasswordSuccess(res.data.message);
                setTimeout(() => {
                    getAdmin();
                }, 3000);
            }
        }).catch(err=>{
          if (err && err.response && err.response.data && err.response.data.error){
            setApiPasswordError(err.response.data.error)
          }else {
            setApiPasswordError('Ha ocurrido un error inesperado. Comprueba tu conexión a internet')
          }
        });
      }
    

    const sendVerifyCode = () => {
        const body = {
            email: email
        }
        api.post('/pagina/try-reset-password-admin/',
            body,
            {headers: {"content-type": "application/json", "site": localStorage.getItem('site')}}
        ).then(res=>{
            setOperVerifyEmail(true)
        }).catch(err=>{
            if (err && err.response && err.response.data && err.response.data.error){
                const {error} = err.response.data;
                setEmailError(error)
            }else{
                setEmailError('Ha ocurrido un error inesperado. Comprueba tu conexión a internet.')
            }
        })
    }

    const renderEmailForm = () => {
        return (
            <div className='contFormBox'>
                <div>
                    <Typography component="h1" variant="h6"  align="center" color="textSecondary" paragraph>
                    Recuperación de contraseña Admin 
                    </Typography>
                </div>
                <div>
                    <TextField
                        label="email"
                        id="outlined-size-normal"
                        variant="outlined"
                        value = {email}
                        onChange = {e=>setEmail(e.target.value)}
                    />
                </div>
               { emailError ?  
                    <div>
                        <div>
                            <Alert severity="error">{emailError}</Alert>
                        </div>
                    </div> : null }
                
                <div>
                    <div style={{display:"flex", justifyContent:'center'}}>
                        <Button disabled={email ? false : true} onClick={()=>sendVerifyCode()}  variant='contained' color="primary">
                            Continuar
                        </Button>
                    </div>
                </div>

       </div>
        )
    }

    const renderPasswordForm = () => {
        return (
            <div className='contFormBox'>
                <div>
                    <Typography component="h1" variant="h6"  align="center" color="textSecondary" paragraph>
                    Recuperación de contraseña Admin 
                    </Typography>
                </div>
                <div>
                    <TextField
                        label="Ingrese contraseña"
                        id="outlined-size-normal"
                        variant="outlined"
                        type='password'
                        value = {password}
                        onChange = {e=>verifyPassword(e.target.value)}
                    />
                </div>
                <div>
                    <TextField
                        label="Repita contraseña"
                        id="outlined-size-normal"
                        variant="outlined"
                        type='password'
                        value = {password2}
                        onChange = {e=>verifyPassword2(e.target.value)}
                    />
                </div>
               { passwordError ?  
                    <div>
                        <div>
                            <Alert severity="error">{passwordError}</Alert>
                        </div>
                    </div> : null }

                { passwordSuccess ?  
                <div>
                    <div>
                        <Alert severity="success">{passwordSuccess}</Alert>
                    </div>
                </div> : null }
                
                <div>
                    <div style={{display:"flex", justifyContent:'center'}}>
                        <Button disabled={password && password2 && password === password2 ? false: true}  onClick={()=>resetPassword()}  variant='contained' color="primary">
                            Guardar cambios
                        </Button>
                    </div>
                </div>

                { apiPasswordError ?  
                <div>
                    <div>
                        <Alert severity="error">{apiPasswordError}</Alert>
                    </div>
                </div> : null }
                { apiPasswordSuccess ?  
                <div>
                    <div>
                        <Alert severity="success">{apiPasswordSuccess}</Alert>
                    </div>
                </div> : null }
       </div>
        )
    }



    if (!openVerifyEmail && !openResetPassword){
        return renderEmailForm();
    } else if (openVerifyEmail && !openResetPassword){
        return <VerifyEmail sendAdminKey={()=>{setOpenResetPassword(true)}} email={email} />;
    } else {
        return renderPasswordForm()
    }
        

}

export default  connect(null, { getAdmin })(AdminResetPassword);