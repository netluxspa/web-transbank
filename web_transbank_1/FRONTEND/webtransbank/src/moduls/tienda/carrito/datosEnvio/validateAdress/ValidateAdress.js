
import { useState } from 'react';

import Geocode from "react-geocode";

import GoogleMapReact from 'google-map-react';

Geocode.setApiKey("AIzaSyBZRkvxQdA_wOsVZeeyCjuQBKZzCia4LZk");





const style = {
    cont: {
        padding: '10px',
        border: 'solid 1px gray',
        borderRadius: '4px',
        margin: '0 0 30px 0'
    }
}

const ValidateAdres = () => {

    const [adress, setAdress] = useState('')

    const [lat, setLat] = useState(null)
    const [long, setLong] = useState(null)


    const getCoords = (adress) => {
        Geocode.fromAddress(adress).then(
            (response) => {
              const { lat, lng } = response.results[0].geometry.location;
              console.log(lat, lng);
              setLat(lat)
              setLong(lng)
            },
            (error) => {
              console.error(error);
            }
          );
    }

    const renderMap = (lat, long) => {
        return (
            <div style={{ height: '400px', width: '100%' }}>
                    <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyBZRkvxQdA_wOsVZeeyCjuQBKZzCia4LZk'}}
                    defaultCenter={{lat:lat, lng: long}}
                    defaultZoom={15}
                >
                <Marker lat={lat} lng={long} />
                </GoogleMapReact>
            </div>
        )

    }

    const Marker = () => {
        return <div style={{width:'20px', height:'20px', background: 'black'}}></div>
      }


    return (
        <div style={style.cont}>
            <div>Validate Adress</div>
            <div>
                <input onChange={e=>setAdress(e.target.value)}  />
            </div>
            <div>
                <button onClick={()=>getCoords(adress)}>Validar</button>
            </div>
            <div>
                {
                    lat && long ?
                    `lat: ${lat}, lng: ${long}`
                    :
                    null
                }
            </div>
            <div>
                {
                    lat && long ?
                    renderMap(lat, long)
                    :
                    null
                }
            </div>
        </div>
        )
}

export default ValidateAdres;