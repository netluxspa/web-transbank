import NavStep from './navStep/NavStep';
import ContentShow from './contentShow/ContentShow';

import { useState, useEffect } from 'react';






const  StepsBorfer = ({inputSteps}) => {

    const [stepSelected, setStepSelected] = useState(1)
    const [steps, setSteps] = useState(inputSteps)
    const convertSimplySteps = steps => {
        if (typeof steps === 'object'){
            var simplySteps = {...steps}
            Object.keys(simplySteps).map(s=>
                {
                    delete  simplySteps[s].component
                }
            )
            return simplySteps;
        } else {
            return {}
        }

    }


    console.log('woooork', steps[stepSelected])

    return (
        <div>
            <div>
                <NavStep setSelected={s=>setStepSelected(s)} steps={convertSimplySteps(steps)} />
            </div>
            <br></br>
            <div>
                <ContentShow component={steps[stepSelected].comp} />
            </div>
        </div>
    )
}

export default StepsBorfer;