import React, { useState, Fragment } from "react";
import myPlaces from '../api/stops.json';
import { useLoadScript, GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
 

function Maps() {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [markerMap, setMarkerMap] = useState({});
  const [center] = useState({ lat: 40.762741, lng: 29.943461 });
  const [zoom, setZoom] = useState(15);
  const [clickedLatLng, setClickedLatLng] = useState(null);
  const [infoOpen, setInfoOpen] = useState(false);

  const { isLoaded } = useLoadScript({

    googleMapsApiKey: ""
  });
  const fitBounds = map => {
    const bounds = new window.google.maps.LatLngBounds();
    myPlaces.map(place => {
   
      return place.stop_id;
    });
    map.fitBounds(bounds);
  };

 

  const markerLoadHandler = (marker, place) => {
    return setMarkerMap(prevState => {
      return { ...prevState, [place.stop_id]: marker };
    });
  };

  const markerClickHandler = (event, place) => {
    setSelectedPlace(place);

    if (infoOpen) {
      setInfoOpen(false);
    }

    setInfoOpen(true);

    if (zoom < 15) {
      setZoom(15);
    }
  };

  const renderMap = () => {
    return (
      <Fragment>
        <GoogleMap
          onClick={e => setClickedLatLng(e.latLng.toJSON())}
          center={center}
          zoom={zoom}
          mapContainerStyle={{
            height: "100vh",
            width: "100%"
          }}
        >
          {myPlaces.map(place => (
            <Marker
              key={place.stop_id}
              position={{ lat: place.stop_lat, lng: place.stop_lon }}
              onLoad={marker => {
           
              
              
                return markerLoadHandler(marker, place)
              }}
              onClick={event => markerClickHandler(event, place)}
            />
          ))}

          {infoOpen && selectedPlace && (
            <InfoWindow
              anchor={markerMap[selectedPlace.stop_id]}
              onCloseClick={() => setInfoOpen(false)}
            >
              <div>
                <h2 className="title">DURAK BİLGİLERİ</h2>
                <div className="information"><h6 className="information-title">DURAK KODU:</h6>&nbsp;<h6 className="information-description">{selectedPlace.stop_code}</h6></div> 
                <div className="information"><h6 className="information-title">DURAK ADI:</h6>&nbsp;<h6 className="information-description">{selectedPlace.stop_name}</h6></div> 
                <div className="information"><h6 className="information-title">DURAK DESC:</h6>&nbsp;<h6 className="information-description">{selectedPlace.stop_desc}</h6></div> 
                <div className="information"><h6 className="information-title">DURAK ENLEMİ:</h6>&nbsp;<h6 className="information-description">{selectedPlace.stop_lat}</h6></div> 
                <div className="information"><h6 className="information-title">DURAK BOYLAMI:</h6>&nbsp;<h6 className="information-description">{selectedPlace.stop_lon}</h6></div> 
          
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </Fragment>
    );
  };

  return isLoaded ? renderMap() : null;
}

export { Maps }; 
