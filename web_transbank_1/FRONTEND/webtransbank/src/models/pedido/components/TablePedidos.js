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
import history from '../../../history';



const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});



function Row({pedido,sendData,selectors}) {
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        {
          selectors ? 
          <TableCell>
          <Checkbox
              onChange={()=>sendData(pedido)}
              defaultChecked
              checked={pedido.checked}
              color="primary"
          />
      </TableCell>
          :
          null
        }
       
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell style={{whiteSpace:'nowrap'}} component="th" scope="row">
        {pedido.fecha}
        </TableCell>
        {/* <TableCell align="right">{pedido.fecha}</TableCell> */}
        <TableCell style={{whiteSpace:'nowrap'}} align="right">{pedido.id}</TableCell>
        <TableCell style={{whiteSpace:'nowrap'}} align="right">{pedido.monto}</TableCell>
        <TableCell style={{whiteSpace:'nowrap'}} align="right">{pedido.transportista}</TableCell>
        <TableCell style={{whiteSpace:'nowrap'}} align="center">
            <Button onClick={()=>history.push(`/tienda/seguimiento/${pedido.codigo_seguimiento}`)} variant="outlined" size="small" color="primary" >
                <span style={{fontSize:'0.8em', whiteSpace:'nowrap'}}>Comprobante</span>
            </Button>
        </TableCell>

        
      </TableRow>
      <TableRow>

        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Resumen
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
      </TableRow>
    </React.Fragment>
  );
}





function TablaPedidos({pedidos,sendData,selectors,sellectAll,allSelected}) {
  return (
      <React.Fragment>

            <TableContainer style={{maxWidth:"900px", margin:'20px auto'}} component={Paper}>

            <Table aria-label="collapsible table">
                <TableHead>
                <TableRow>
                {
                      selectors ?
                      <TableCell>
                        <Checkbox
                            onChange={()=>sellectAll()}
                            checked={allSelected}
                            defaultChecked
                            color="primary"
                        />
                      </TableCell>
                      :
                      null
                    }

                    <TableCell>
                    
                    </TableCell>
                   

                    
                    
                    <TableCell style={{fontWeight:'600', whiteSpace:'nowrap'}}> Fecha</TableCell>
                    <TableCell style={{fontWeight:'600', whiteSpace:'nowrap'}} align="right"> Nº Orden</TableCell>
                    <TableCell style={{fontWeight:'600', whiteSpace:'nowrap'}} align="right"> Monto</TableCell>
                    <TableCell style={{fontWeight:'600', whiteSpace:'nowrap'}} align="right"> Transportista</TableCell>
                    <TableCell style={{fontWeight:'600', whiteSpace:'nowrap'}} align="center">Comprobante</TableCell>
                  
                </TableRow>
                </TableHead>
                <TableBody>
                {pedidos.map((p) => (
                    <Row key={p.id} pedido={p} selectors={selectors}  sendData={d=>sendData(d)}/>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
    </React.Fragment>
  );
}


export default TablaPedidos