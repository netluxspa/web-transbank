import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { ADD_ENVIO } from '../../../../actions/types'
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CalculatorTarifa from './calculatorTarifa/CalculatorTarifa';
import ValidateAdress from './validateAdress/ValidateAdress';



import './datosEnvioStyle.css'

class DatosEnvio extends React.Component {

    state = {tarifa: null, ciudad: ''}

    renderInput = ({input, valor, label, labelReducer, meta }) => {
        return (
            <TextField
                {...input}
                error={meta.error && meta.touched ? true : false}
                label={label}
                multiline
                rowsMax={4}
                variant="outlined"
                value={valor}
                onChange={(e)=>{
                    this.props.dispatch({type:ADD_ENVIO, payload: {label:labelReducer, value: e.target.value}});
                }}
                />
        );
      };


    recibeTarifa = t => {
        this.setState({tarifa: t.valor})
    }


    render(){
        const {nombre, fono, direccion, ciudad, detalle} = this.props.envio;
        const { dispatch } = this.props;
        return (
            <div>
                <div>
                    <CalculatorTarifa emitTarifa={(t)=>console.log(t)} />
                </div>

                <div>
                    <ValidateAdress />
                </div>


            <div className='contDatosEnvio'>
                <div className='titulo'>
                    <Typography variant="h5"  color="textPrimary" paragraph>
                        Datos de envío
                    </Typography>
                    <Typography   color="textSecondary" paragraph>
                        Ingresa los siguientes datos para que tus productos y notificaciones lleguen correctamente.
                    </Typography>
                </div>
                <div className='nombre'>
                    <Field name="nombre" labelReducer='nombre' component={this.renderInput} label="Nombre" valor={nombre} dispatch={dispatch} />
                </div>
                <div className='fono'>
                    <Field name="fono" labelReducer='fono' component={this.renderInput} label="Fono" valor={fono} dispatch={dispatch} />
                </div>
                <div className='ciudad'>
                    <Field name="ciudad" labelReducer='ciudad' component={this.renderInput} label="Ciudad" valor={ciudad} dispatch={dispatch} />
                </div>
                <div className='direccion'>
                    <Field name="direccion" labelReducer='direccion' component={this.renderInput} label="Dirección" valor={direccion} dispatch={dispatch} />
                </div>
                <div className='detalle'>
                    <Field name="detalle" labelReducer='detalle' component={this.renderInput} label="Detalle" valor={detalle} dispatch={dispatch} />
                </div> 
            </div>

            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        envio: state.envio
    }
}

const validate = formValues => {
    const errors = {};
  
    if (!formValues.nombre) {
        errors.nombre = 'You must enter a title';
    }

    if (!formValues.fono) {
        errors.fono = 'You must enter a title';
    }

    if (!formValues.ciudad) {
        errors.ciudad = 'You must enter a ciudad';
    }
    if (!formValues.direccion) {
        errors.direccion = 'You must enter a direccion';
    }



    return errors;
  };


const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (obj)=> dispatch(obj)
    }
};



export default reduxForm({
    form: 'envio',
    validate
  })(connect(mapStateToProps, mapDispatchToProps)(DatosEnvio));