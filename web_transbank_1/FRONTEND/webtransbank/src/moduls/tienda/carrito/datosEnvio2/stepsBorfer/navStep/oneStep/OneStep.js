const OneStep = ({step, setSelected, id}) => {
    console.log(step)
    return (
        <div onClick={()=>setSelected(id)}>
            <div>
                titulo:  {step.titulo}
            </div>
            <div>
                status:  {step.status ? 'listo':'pendiente'}
            </div>
            <div>
                test:  {step.dependencia}
            </div>
        </div>
    )
}

export default OneStep;