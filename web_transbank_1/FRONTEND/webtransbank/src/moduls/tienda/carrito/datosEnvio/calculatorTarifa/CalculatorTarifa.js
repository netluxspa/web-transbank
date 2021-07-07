import React from 'react';

import api from '../../../../../api';


const styles = {
    cont: {
        border: "1px solid gray",
        borderRadius: '2px',
        padding: '40px 20px',
        margin: '0 0 30px 0'
    }
}

class CalculatorTarifa extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            citys:null,
            errorGetCity: null,
        }
    }

    componentDidMount() {
        this.getCitys()
    }

    getCitys = () => {
        api.get('/commerce/get-city',
        {headers: {"content-type":"application/json"}}
        ).then(res=>{
            console.log(res)
            if (res && res.data && res.data.citys){
                this.setState({citys: res.data.citys})
            }
        }).catch(err=>{
            if (err && err.response && err.response.data ){
                this.setState({errorGetCity: err.response.data})
            }else {
                this.setState({errorGetCity:{'error': 'Revise su conexión a internet'}})
            }
            console.log(this.state.errorGetCity)
        })
    }

    returnCity = () => {
        const {citys, errorGetCity} = this.state
        if (!citys && !errorGetCity){
            return 'loading'
        } else if (errorGetCity){
            return errorGetCity.error
        } else if (citys && citys.length > 0){
            return citys.length
        } else if (citys && citys.length === 0) {
            return 'No hay ciudades para mostrar'
        }
    }
    
    render() {
        const { emitTarifa } = this.props
        return (
            <div  style={styles.cont}>
                <button onClick={()=>emitTarifa(10)}> Click</button>
                <div>
                    <p>Result</p>
                    {this.returnCity()}
                </div>
            </div>
        )
    }

}

export default CalculatorTarifa;