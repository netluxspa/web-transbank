import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import history from '../history'

import {ADD_CARRITO} from '../actions/types'
import { useDispatch } from 'react-redux';

import Modal from '../components/modal/Modal'


const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function Album({productos, categorias, selectCategoria, tienda, categoriaSelectedId}) {

  const [openModal, setOpenModal] = React.useState(false)

  const dispatch = useDispatch()

  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div  className={classes.heroContent}>
          <Container maxWidth="sm">
            <div style={{ padding:"20px", borderRadius: "4px", position: "relative"}}>
              <div onClick={()=>history.push('/admin/tienda')} style={{height: "20px", width: "20px", background: "black", position: "absolute", right: "10px", top: "10px", zIndex: "10", borderRadius: "4px"}}></div>
              <Typography component="h3" variant="h3" align="center" color="textPrimary" gutterBottom>
                {tienda.titulo}
              </Typography>
              <Typography variant="h5" align="center" color="textSecondary" paragraph>
                {tienda.descripcion}
              </Typography>
            </div>
            <div style={{ padding:"20px", borderRadius: "4px", position: "relative"}}  className={classes.heroButtons}>
            <div onClick={()=>history.push('/admin/categorias-tienda')}  style={{height: "20px", width: "20px", background: "black", position: "absolute", right: "10px", top: "10px", zIndex: "10", borderRadius: "4px"}}></div>

              <Grid container spacing={2} justify="center">
              <Grid  item> 
                    <Button onClick={()=>selectCategoria(null)} 
                      variant={`${!categoriaSelectedId ? 'contained' : 'outlined'}`} 
                      color="primary"
                    >
                      Todos los productos
                    </Button>
                  </Grid>
                {categorias.map(c=>(
                  <Grid key={c.id} item> 
                    <Button onClick={()=>selectCategoria(c)} 
                      variant={`${c.id === categoriaSelectedId ? 'contained' : 'outlined'}`} 
                      color="primary"
                    >
                      {c.titulo}
                    </Button>
                  </Grid>
                ))}
{/* 
                <Grid item>
                  <Button variant="contained" color="primary">
                    Main  call to action
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
                    Secondary action
                  </Button>
                </Grid> */}
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid style={{ padding:"20px", borderRadius: "4px", position: "relative"}} container spacing={4}>
          <div onClick={()=>history.push('/admin/productos-tienda')} style={{height: "20px", width: "20px", background: "black", position: "absolute", right: "10px", top: "10px", zIndex: "10", borderRadius: "4px"}}></div>

            {productos.map((card) => (
              <Grid item key={card.id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={
                      card && card.imagenes.length >0 ?
                      card.imagenes[0].imagen :
                      ''
                    }
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.titulo}
                    </Typography>
                    <Typography>
                      {card.precio}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button onClick={()=>dispatch({type: ADD_CARRITO, payload: {producto: card.id,  titulo: card.titulo, precio:card.precio,  cantidad: 1}})} size="small" color="primary">
                      Agregar
                    </Button>
                    {/* <Button onClick={()=>console.log(card)} size="small" color="primary">
                      Agregar
                    </Button> */}
                    <Button onClick={()=>history.push(`/tienda/producto/${card.url}`)} size="small" color="primary">
                      Ver
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {openModal ? <Modal></Modal> : null}
    </React.Fragment>
  );
}



export default  Album;