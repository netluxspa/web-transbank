
import React, { useState } from 'react';

import GoogleMapReact from 'google-map-react';

import { Button } from "@material-ui/core";
import Geocode from "react-geocode";
import Typography from '@material-ui/core/Typography';


const style = {
    cont: {
        padding: '10px',
        borderRadius: '4px',
        margin: '0 0 30px 0'
    }
}



class ValidAddress extends React.Component {

    constructor(props){
        super(props)
        this.state= {
            lat: null,
            long:null, 
            error: null
        }
    }

    componentDidMount() {

        const {address} = this.props;
        this.getCoords(address)
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
        const {close, address, validate} = this.props;
        const {lat, long} = this.state;

          return (
              <div>
                   <div>
                      <Typography variant='h5' color='textPrimary'>Valida tu dirección</Typography>
                  </div>
                  <br></br>

                  <div>
                      <Typography color='textSecondary'>{address}</Typography>
                  </div>
                  <br></br>
                  <div>
                      <Typography color='textPrimary'>¿La dirección marcada en el mapa es correcta?</Typography>
                  </div>
                  <br></br>

                  <div>
                      <Button onClick={()=>close()} color='primary' size='small' variant='outlined' style={{margin:'0 10px 0 0'}}>Modificar</Button>
                      <Button  
                      onClick={()=>validate({
                                    lat: lat,
                                    lng: long,
                                    address: address
                                })}
                      color='primary' size='small' variant='contained'>Validar</Button>
                  </div>
                  <br></br>
                  <br></br>

              </div>
          )
      }


      render() {
        const {lat, long, error} = this.state;
        const {address} = this.props;
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

export default ValidAddress;