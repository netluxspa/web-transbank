import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { getAdmin } from '../../../actions/adminPagina'
import api from '../../../api';
import history from '../../../history';

import { connect } from 'react-redux';
import { useState } from 'react'




import './adminAuthStyles.css';




const AdminLogin = ({getAdmin}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword]= useState('');
    const [error, setError]= useState('');


    const loginAdmin = ({email, password}) => {
        api.post('/pagina/login-admin/', 
          {email: email, password: password},
          {headers: {"Content-Type": "application/json", "site":localStorage.getItem('site')}}
        ).then(res=>{
            if(res && res.data && res.data.adminkey){
              const {adminkey} = res.data;
              localStorage.setItem('adminkey', adminkey)
              getAdmin();
              history.push('/admin/home')
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
        <div className='contFormBox'>
             <div>
             <Typography component="h1" variant="h6"  align="center" color="textSecondary" paragraph>
                Iniciar sesión Admin 
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
            <div>
                <TextField
                    label="password"
                    type='password'
                    id="outlined-size-normal"
                    variant="outlined"
                    value = {password}
                    onChange = {e=>setPassword(e.target.value)}
                />
            </div>
            <div>
                <div>
                <Alert severity="error">error</Alert>
                </div>
            </div> 
            <div>
                <div style={{display:"flex", justifyContent:'center'}}>
                    <Button onClick={(e)=>loginAdmin({email, password})}  variant='contained' color="primary">
                        Ingresar
                    </Button>
                </div>
            </div>
            <div>
            <Link onClick={()=>history.push('/admin/auth/reset-password')}  variant="body2">
                ¿Olvidaste la contraseña?
              </Link>
            </div>
        </div>
    )
}

export default connect(null, { getAdmin })(AdminLogin);