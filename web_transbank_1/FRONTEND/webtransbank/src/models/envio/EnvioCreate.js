import { Button } from "@material-ui/core";
import EnvioForm from "./EnvioForm";

const EnvioCreate = () => {
    return(
        <div>
            <div>
                <EnvioForm />
            </div>
            <br></br>
            <div >
                <Button
                    color='primary'
                    variant='contained'
                    size='small'
                >Crear envio</Button>
            </div>
        </div>
       
        
    )
}

export default EnvioCreate;