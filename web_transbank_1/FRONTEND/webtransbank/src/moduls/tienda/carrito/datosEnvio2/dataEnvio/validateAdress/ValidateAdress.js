import React, { useState } from 'react';
import { ADD_VALID_ADRESS } from '../../../../../../actions/types';
import { connect } from 'react-redux';

import Geocode from "react-geocode";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


import GoogleMapReact from 'google-map-react';



Geocode.setApiKey("AIzaSyBZRkvxQdA_wOsVZeeyCjuQBKZzCia4LZk");






const style = {
    cont: {
        padding: '10px',
        borderRadius: '4px',
        margin: '0 0 30px 0'
    }
}



class ValidateAdress extends React.Component{

    constructor(props){
        super(props)
        this.state= {
            adress: '',
            lat: null,
            long:null, 
            error: null
        }
    }

    componentDidMount() {

        const {adress} = this.props;
        const findAdress = this.adress(adress)
        this.getCoords(findAdress)
    }

    adress = (dataEnvio) => {
        var adress = dataEnvio.calle + '  ' + 
                        dataEnvio.numCalle 

        if (dataEnvio.detalle){
            adress +=  ' ' + dataEnvio.detalle
        }

        adress += ',  ' + dataEnvio.ciudad.name + ',  ' + 
                    dataEnvio.pais
        adress = adress.toUpperCase()
        return adress
                    
    }

    getCoords = (adress) => {
        Geocode.fromAddress(adress).then(
            (response) => {
              const { lat, lng } = response.results[0].geometry.location;
              console.log(lat, lng);
              this.setState({lat:lat})
              this.setState({long:lng})
            },
            (error) => {
              this.setState({error: true})
            }
          );
    }

    renderMap = (lat, long) => {
        return (
            <div style={{ height: '400px', width: '100%' }}>
                    <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyBZRkvxQdA_wOsVZeeyCjuQBKZzCia4LZk'}}
                    defaultCenter={{lat:lat, lng: long}}
                    defaultZoom={18}
                    onGoogleApiLoaded={({map, maps}) => this.renderMarkers(map, maps, {lat: lat, lng: long})}
                >
                </GoogleMapReact>
            </div>
        )
    }

    renderMarkers(map, maps, myLatLng) {
        let marker = new maps.Marker({
          position: myLatLng,
          map,
          title: 'Position'
        });
      }

      renderOptions = () => {
        const {adress} = this.props;
        const {lat, long} = this.state;
        const findAdress = this.adress(adress)
        const dataDispatch =  {
            validAdress: findAdress,
            lng: long,
            lat: lat
        }
          return (
              <div>
                   <div>
                      <Typography variant='h5' color='textPrimary'>Valida tu dirección</Typography>
                  </div>
                  <br></br>

                  <div>
                      <Typography color='textSecondary'>{findAdress}</Typography>
                  </div>
                  <br></br>
                  <div>
                      <Typography color='textPrimary'>¿La dirección de envío marcada en el mapa es correcta?</Typography>
                  </div>
                  <br></br>

                  <div>
                      <Button onClick={()=>this.props.close()} color='primary' size='small' variant='outlined' style={{margin:'0 10px 0 0'}}>Modificar</Button>
                      <Button onClick={()=>this.props.dispatch({type: ADD_VALID_ADRESS, payload: dataDispatch})} color='primary' size='small' variant='contained'>Validar</Button>
                  </div>
                  <br></br>
                  <br></br>

              </div>
          )
      }



      render() {
          const {adress, lat, long, error} = this.state;
        return (
            <div style={style.cont}>
               { !error ?
                        <div>
                            {this.renderOptions()}
                        </div>
                    :   
                    null
                    }

                <div>
                    {
                        lat && long ?
                        this.renderMap(lat, long)
                        :
                        null
                    }
                </div>
                <div>
                    {
                        error ?
                        'error'
                        :
                        null
                    }
                </div>
            </div>
            )
      }



}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (obj)=> dispatch(obj),
    }
  };

export default connect(null, mapDispatchToProps)(ValidateAdress);