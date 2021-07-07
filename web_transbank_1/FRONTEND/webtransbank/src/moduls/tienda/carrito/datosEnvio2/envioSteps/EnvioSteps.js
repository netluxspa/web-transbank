
import { useState } from "react";
import StepsBorfer from "../stepsBorfer/StepsBorfer";


const initialSteps = {
    1: {
        status: false,
        dependencia: 'false',
        titulo: 'step1',
        comp: 'step3',
    },
    2: {
        status: false,
        dependencia: 'false',
        titulo: 'step2',
        comp: 'step2',
    },
    3: {
        status: false,
        dependencia: 'false',
        titulo: 'step3',
        comp: 'step4',
    }
}

const EnvioSteps = () => {

    const [steps, setSteps] = useState(initialSteps)

    return(
        <StepsBorfer inputSteps={steps} />
    )
}

export default EnvioSteps;