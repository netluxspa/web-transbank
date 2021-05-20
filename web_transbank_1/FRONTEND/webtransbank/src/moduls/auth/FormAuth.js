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
import { useRadioGroup } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import history from '../../history'

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


function EditUser({user, returnData}) {
  const classes = useStyles();
  
    const [id, setId] = useState(null)
    const [nombre, setNombre] = useState(null)
    const [email, setEmail] = useState(null)

    useEffect(()=>{
        if (user){
            setId(user.id)
            setNombre(user.nombre)
            setEmail(user.email)
        }
    }, [user]);



    return (
        <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Información de cliente
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                onChange={(e)=>setNombre(e.target.value)}
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Nombre"
                autoFocus
                value={nombre ? nombre : ''}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                onChange={(e)=>setEmail(e.target.value)}
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Correo"
                name="lastName"
                autoComplete="lname"
                value={email ? email : ''}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
                <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={()=> {user.id ? returnData({id, nombre, email}): returnData({nombre, email})}}
                >
                Guardar
                </Button>
            </Grid>

            <Grid item xs={12} sm={6}>
                <Button
                type="submit"
                fullWidth
                variant="outlined"
                color="primary"
                className={classes.submit}
                onClick={()=>history.push('/tienda/caja')}
                >
                ir al carrito
                </Button>
            </Grid>

          </Grid>
        </form>
      </div>
    </Container>
    );
}


const mapStateToProps = state => {
    return {
        user: state.userPagina
    }
}

export default connect(mapStateToProps, )(EditUser);