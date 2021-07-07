import React from 'react';

import { Typography, Button } from "@material-ui/core";

const FormatoEnvioShow = ({producto, go}) => {

    const create_or_edit = (producto) => {
        return (
            <Button
                onClick={ 
                        ()=>{
                            if (producto && producto.formato_envio){
                                go(2)
                            } else {
                                go(3)
                            }
                        }
                    }
                    color='primary'
                    size='small'
                    variant='outlined'
            >
                { producto && producto.formato_envio 
                    ?
                    'Modificar'
                    :
                    'Crear'
                }
            </Button>
        )
    }

    const show = (producto) => {
        return (
            <div>
                {
                    producto && producto.formato_envio ? 
                    producto.formato_envio.id 
                    :
                    <Typography
                        style={{margin:'20px 0 0 0'}}
                        color='textSecondary'
                    >
                        No hay un fomato de envio definido para este producto.
                    </Typography>
                }
            </div>
        )
    }


    const renderData2 = (obj, k) => {
        return (
            <div>


                {
                    obj.sobre ?
                    <div>
                        {
                            k==='sobre' ?
                                <Typography
                                    color='textPrimary'
                                >
                                    Este producto se envía en sobre y tiene un peso despreciable
                                </Typography>
                            :
                            null
                        }
                    </div>
                    :
                    <div>
                        {
                            k!=='sobre' && k!=='solo_zona' ?
                            <div
                                key={k}
                                style={{border: 'solid 1px rgba(128,128,128,0.5)', position: 'relative', borderRadius: '4px', padding: '6px 10px'}}
                            >
                                <div
                                    style={{background: 'white', position: 'absolute', top: '-0.7em', left: '0.7em'}}
                                >
                                    <Typography 
                                        style={{fontSize:'0.8em'}}
                                        color='textSecondary'
                                    >{k}</Typography>
                                </div>
                                <div>
                                    <Typography color='textPrimary'>{ k==='caja_detail' ? obj[k].titulo : obj[k]}</Typography>
                                </div>
                            </div>
                                    :
                                    null
                                }
                            </div>
                    
                }
               


                {
                    (()=>{
                        if (k==='solo_zona'){
                            if (obj.solo_zona){
                                return (
                                    <Typography
                                    color='textPrimary'
                                    >
                                        Este producto se envía solo en el radio local. (El sistema recomendará un contacto personalizado en caso contrario)
                                    </Typography>
                                )
                            } else {
                                return (
                                    <Typography
                                    color='textPrimary'
                                    >
                                        Este producto se envía a todo chile.
                                    </Typography>
                                )
                            }
                        }else {
                            return (null)
                        }
                    })()

                }

            </div>
        )
    }



    const renderReturn = producto => {
        
        if (producto && producto.formato_envio){
            const formato = producto.formato_envio;
            return (
                <div
                style={{display:'grid', gridTemplateColumns:'1fr', gap: '20px'}}
                >
                    {
                        Object.keys(formato).map(k=>(
                            <React.Fragment>
                                {
                                    (formato.sobre && (k==='caja_detail' || k==='peso')) || k==='caja' || k==='id' || k==='producto' ?
                                    null 
                                    :
                                    renderData2(formato, k)
                                }
                            </React.Fragment>
                        ))
                    }
                </div>
            )
        }else {
            return null
        }

    }

    return (
        <div>
            <div>
                {create_or_edit(producto)}
            </div>
            <br></br>
            <br></br>
            <div>
                {renderReturn(producto)}
            </div>
        </div>
    )


    
}

export default FormatoEnvioShow;