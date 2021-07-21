import { Typography } from "@material-ui/core";
import DatePickers from "../../../../../globalComponents/datePicker/DatePickers";

const style = {
    container: {
        display: 'grid', 
        gap: '10px',
        gridTemplateColumns: '1fr',
       
    },
    item: {
        padding: '10px 20px',
        margin: 'auto'
    },
    title: {
        fontSize:'0.9em'
    }
}


const EnvioForm = ({data, sendData}) => {
    return (
        <div style={style.container}>
            <div style={style.item}>
                <Typography variant='h6' align="center"   color='textSecondary'>¿Cuándo harás tu envío?</Typography>
            </div>
            <div style={style.item}>
                <Typography    align="center"  color='textPrimary'>Establece el día que irás a dejar todos o algunos de tus pedidos pendientes.</Typography>
            </div>
            <div style={style.item}>
                <DatePickers style={{width:'100%'}} fecha={data.fecha}  label='Fecha de envío' sendDate={d=>sendData({fecha: d})} />
            </div>
        </div>
    )
}

export default EnvioForm;