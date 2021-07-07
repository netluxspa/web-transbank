import history from "../../../../../history";
import { Typography, Button } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';

import { useEffect, useState } from "react";

import api from "../../../../../api";

import ShowCajaBox from "./components/ShowCajaBox";

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';



const CajaShow = ({dataInit, match, sendDelete}) => {

    const [data, setData] = useState(dataInit)

    const [openDelete, setOpenDelete] = useState(false)

    const { id } = match.params

    useEffect(()=>{
       if (!data){
            getData(id)
       }
    }, [data])


    const getData = (id) => {
        api.get('/commerce/caja/' + id + '/', 
        {headers: {'content-type':'application/json', 'site':localStorage.getItem('site'), 'adminkey': localStorage.getItem('adminkey')}}
        ).then(res=>{
            setData(res.data)
        })
    }

    const handleDelete = (id) => {
        api.delete('/commerce/caja/' + id + '/', 
        {headers: {'content-type':'application/json', 'site':localStorage.getItem('site'), 'adminkey': localStorage.getItem('adminkey')}}
        ).then(res=>{
            sendDelete(data)
        })
    }

    const renderDelete = () => {
        return (
            <Alert 
                style={{margin:'20px 0 0 0'}}
                severity="warning"
            >
                <AlertTitle>¡Ciudado!</AlertTitle>
                ¿Está seguro de <strong>eliminar</strong>  este registro? ̣           
                
               
                <div
                    style={{display:'flex', margin: '10px 0 0 0'}}
                >
                    <Button
                        color='secondary'
                        variant='contained'
                        size='small'
                        onClick={()=>handleDelete(data.id)}
                    >
                        Eliminar
                    </Button>
                        <Button
                            style={{margin: '0 0 0 20px'}}
                            color='primary'
                            variant='outlined'
                            size='small'
                            onClick={()=>setOpenDelete(false)}
                        >
                            Cancelar
                    </Button>

                </div>

            </Alert>
        )
    }


    return(
        (()=>{
            if (data){
                return (
                    <div>
                        <div
                            style={{display:'flex', alignItems: 'center'}}
                        >
                            <ArrowBackIosIcon 
                                onClick={()=>history.push('/admin/envio/cajas/list')}
                                style={{cursor: 'pointer', color:' rgba(80, 80, 80, 0.9)'}}
                            />
                            <Button
                                style={{margin: '0 0 0 20px'}}
                                color='primary'
                                variant='contained'
                                size='small'
                                onClick={()=>history.replace(`/admin/envio/cajas/edit/${data.id}`)}
                            >
                                Modificar
                            </Button>
                            {
                                !openDelete ?
                                <Button
                                    style={{margin: '0 0 0 20px'}}
                                    color='secondary'
                                    variant='contained'
                                    size='small'
                                    onClick={()=>setOpenDelete(true)}
                                >
                                    Eliminar
                                </Button>
                                :
                                null
                            }

                        </div>


                        {
                            openDelete ? 
                            renderDelete()
                            :
                            null
                        }


                        <div 
                            style={{width: `${ window.innerWidth > 760 ? '80%' : '100%' }`, margin: '40px auto 0 auto'}}
                        >
                            <ShowCajaBox data={data} />
                        </div>
                    </div>
                )
            }else {
                return 'Loading'
            }
        })()
    );
}

export default CajaShow;