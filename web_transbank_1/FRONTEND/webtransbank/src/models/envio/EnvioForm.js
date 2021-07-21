import { Typography } from "@material-ui/core";
import DatePickers from "../../globalComponents/datePicker/DatePickers";

const style = {
    container: {
        display: 'grid', 
        gap: '10px',
        gridTemplateColumns: (
            ()=>{
                const width = window.innerWidth
                if (width <= 760){
                    return '1fr'
                } else {
                    return 'repeat(auto-fill, minmax(200px, 1fr))'
                }
            })(),
       
    },
    item: {
        display:'flex',
        alignItems:'center',
        padding: '5px 0px',
        
    },
    title: {
        fontSize:'0.9em'
    }
}


const EnvioForm = ({data, sendData}) => {
    return (
        <div style={style.container}>
            <div style={style.item}>
                <Typography   color='textPrimary'>¿Cuándo harás el envío?</Typography>
            </div>
          
            <div style={style.item}>
                <DatePickers fecha={data && data.fecha ? data.fecha : ''}  label='Fecha de envío' sendDate={d=>sendData({fecha: d})} />
            </div>
        </div>
    )
}

export default EnvioForm;