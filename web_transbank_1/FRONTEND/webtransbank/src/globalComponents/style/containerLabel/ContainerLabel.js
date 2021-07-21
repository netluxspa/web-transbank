import { Typography } from "@material-ui/core"

const ContainerLabel = ({label, children}) => {
    return (
        <div style={{ margin:'auto', border: 'solid 1px rgba(128,128,128,0.5)', position: 'relative', borderRadius: '4px', padding: `${window.innerWidth > 760 ? '40px 30px' : '30px 20px'}`}}>
            <div
                style={{background: 'white', position: 'absolute', top: '-0.7em', left: '0.7em'}}
            >
                <Typography 
                    style={{fontSize:'0.8em'}}
                    color='textSecondary'
                >{label ? label : null}</Typography>
            </div>
           {children}
        </div>
    )
}

export default ContainerLabel