import React from 'react';
import { connect } from 'react-redux';
import {ADD_CARRITO} from '../../actions/types';
import api from './../../api'
import history from '../../history'
import './style.css'
import Typography from '@material-ui/core/Typography';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';



const addCarrito = (obj) =>{
    console.log(obj)
    return obj
}


class ProductoDetail extends React.Component {
    constructor(props){
        console.log(props)
        super(props);
        this.state = { producto: null, imagenSelectedIndex:0, cantidad: 1}
    }


    componentDidMount(){
        this.getOneProduct(this.props.match.params.url_producto)
    }

    getOneProduct(url){
            api.get('/commerce/producto/', 
                {params: {url: url}},
                {headers: {"Content-Type": "application/json"}}
            ).then(res=>{
                if (res && res.data.length > 0){
                    this.setState({producto: res.data[0]})
                }else{
                    history.push('/tienda')
                }
            }).catch(err=>{history.push('/tienda')})
    }

    addItem = () =>{
        this.setState({cantidad: this.state.cantidad + 1})
    }


    removeItem = () => {
        if (this.state.cantidad > 1){
            this.setState({cantidad: this.state.cantidad -1})
        }
    }

    renderReturn = () => {
        const { producto } = this.state
        if (producto){
            return (
                <div>
                    <div style={{padding: "20px 0 0 30px"}}>
                        <Button onClick={()=>history.push('/tienda')} 
                        variant='outlined' 
                        color="primary"
                        >
                            <ArrowBackIosIcon />
                            Volver a vitrina
                        </Button>
                    </div>
                    
                    <div >
                        <div className='cont'>
                            <div className='cont_imagen'>
                                <img 
                                    src={producto.imagenes[`${this.state.imagenSelectedIndex}`].imagen} alt='asd'  
                                />
                                <div  className='contSelectorImage'>
                                    {producto.imagenes.map(i=>(
                                        <div 
                                            onClick={()=>this.setState({imagenSelectedIndex: producto.imagenes.indexOf(i)})} 
                                            key={i.id} className='selectorImage'
                                            style={{border: `${producto.imagenes.indexOf(i) === this.state.imagenSelectedIndex ? "solid 2px green": "solid 2px transparent"}`}}
                                        >
                                            <img src={i.imagen} alt='asd'/>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className='cont_venta_options'>
                                <div className='info_producto'>
                                    <Typography component="h3" variant="h4" align="center" color="textPrimary" gutterBottom>
                                    {producto.titulo}
                                    </Typography>
                                    <Typography variant="h6" align="center" color="textSecondary" paragraph>
                                        {producto.descripcion}
                                    </Typography>
                                </div>
                                <br />
                                <div className='p_and_q'>
                                    <div> 
                                        <Typography variant="h5" align="center" color="textPrimary" paragraph>
                                        CLP $ {producto.precio}
                                        </Typography>
                                    </div>
                                    <div className='selectQuanty'>
                                        <RemoveCircleIcon color={`${this.state.cantidad > 1 ? 'action': 'disabled'}`} onClick={()=>this.removeItem()} />
                                            <p>{this.state.cantidad}</p>
                                        <AddCircleIcon color="action" onClick={()=>this.addItem()} />
                                    </div>
                                    <br />
                                    <div style={{textAlign: "center", display: 'grid'}}>
                                        <div>
                                            <Button onClick={()=>this.props.dispatch({type:ADD_CARRITO, payload: {producto: producto.id, cantidad: this.state.cantidad}})} variant='contained'  color="primary">Agregar al carrito</Button>
                                        </div>
                                        <div>
                                            <Button onClick={()=>history.push('/tienda/caja')} style={{ marginTop:'10px'}} variant='outlined'  color="primary">Ir al carrito</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='cont_detalles'>

                                    {producto.textos.map(t=>(
                                        <div key={t.id}>
                                            <Typography variant="h5"  color="textPrimary" paragraph>
                                                {t.texto}
                                            </Typography>
                                            {t.parrafos.map(p=>(
                                                <Typography key={p.id}   color="textSecondary" paragraph>
                                                  {p.parrafo}
                                                </Typography>
                                            ))}
                                        </div>
                                    ))}
                                   
                            </div>
                        </div>
                    </div>
                </div>
            )
        }else {
            return null
        }
    }

 

    render() {
        return this.renderReturn();
    }
    
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (obj)=> dispatch(obj)
    }
};


export default connect(null,  mapDispatchToProps)(ProductoDetail);