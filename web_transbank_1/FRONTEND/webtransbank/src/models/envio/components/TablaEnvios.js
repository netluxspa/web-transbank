import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';




const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});



function Row({envio, selectOne}) {
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>

      <TableCell onClick={()=>selectOne(envio)}  style={{whiteSpace:'nowrap', cursor:'pointer'}} align="center">

        <ArrowForwardIosIcon color='primary' />

      </TableCell>


       
        <TableCell style={{whiteSpace:'nowrap'}} align="left">{envio.fecha}</TableCell>


        <TableCell style={{whiteSpace:'nowrap'}} align="left">
            <Typography style={{fontSize:'1em'}} color='textPrmary'>
              {envio.status ? 'Enviado' : 'En proceso'}
            </Typography>
        </TableCell>

        <TableCell style={{whiteSpace:'nowrap'}} align="right">{envio.pedidos_pendientes}</TableCell>

        <TableCell style={{whiteSpace:'nowrap'}} align="right">{envio.pedidos_totales}</TableCell>

        

       


        
      </TableRow>
      {/* <TableRow>

        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Pedidos
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Producto</TableCell>
                    <TableCell align="right">Precio</TableCell>
                    <TableCell align="right">Cantidad</TableCell>
                    <TableCell align="right">Total ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pedido.productos.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell component="th" scope="row">
                        {p.producto.titulo}
                      </TableCell>
                      <TableCell align="right">{p.precio_pedido}</TableCell>
                      <TableCell align="right">{p.cantidad}</TableCell>
                      <TableCell align="right">
                        {Math.round(p.cantidad * p.precio_pedido * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow> */}
    </React.Fragment>
  );
}





function TablaEnvios({envios, selectOne}) {
  return (
      <React.Fragment>

            <TableContainer style={{maxWidth:"900px", margin:'20px auto'}} component={Paper}>

            <Table aria-label="collapsible table">
                <TableHead>
                <TableRow>


                <TableCell align='left' style={{fontWeight:'600', whiteSpace:'nowrap'}}> </TableCell>
         
                   
                    
                    
                    <TableCell align='left' style={{fontWeight:'600', whiteSpace:'nowrap'}}> Fecha envío</TableCell>
                    <TableCell align='left' style={{fontWeight:'600', whiteSpace:'nowrap'}}> Estado</TableCell>
                    <TableCell align='right' style={{fontWeight:'600', whiteSpace:'nowrap'}}> Nº P. Pendientes</TableCell>
                    <TableCell align='right' style={{fontWeight:'600', whiteSpace:'nowrap'}}> Nº P. Totales</TableCell>
                    
                  
                </TableRow>
                </TableHead>
                <TableBody>
                {envios.map((e) => (
                    <Row key={e.id} envio={e} selectOne={d=>selectOne(d)}/>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
    </React.Fragment>
  );
}


export default TablaEnvios