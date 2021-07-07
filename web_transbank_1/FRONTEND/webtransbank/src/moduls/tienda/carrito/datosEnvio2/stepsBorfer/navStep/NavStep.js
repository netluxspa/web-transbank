import OneStep from './oneStep/OneStep';




const NavStep = ({steps, setSelected}) => {

    const renderSteps = (steps) => {
        if (typeof steps === 'object'){
            const keys = Object.keys(steps)
            return (
                <div style={{display:'flex'}}>
                    {keys.map(k=>(
                        <div style={{padding:'10px'}}>
                            <OneStep setSelected={s=>setSelected(s)} id={k} step={steps[k]} />
                        </div>
                    ))}
                </div>
            )
        }else{
           return( 
                <div>
                    error de formato
                </div>
                )
        }

    } 

    return renderSteps(steps);
    
}

export default NavStep;