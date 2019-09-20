import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { maps } from './BreweryList.module.scss'


const mapstyles = {
  height: '50%',
  width:'80%'}


export class BreweryList extends React.Component {

  fetchplaces(mapProps,map){
    const {google} = mapProps;
    const service = new google.maps.places.PlacesService(map)
  }
  mapClicked(mapProps, map, clickEvent){

  }
  onMarkerClick(props, marker, e) {
  // ..
}
  render () {
    console.log(this.props);

    const beers = this.props.breweries.map(beer => {
      return <Marker
      position={{lat:beer.latitude,lng: beer.longitude}}
      icon={{
        url: "https://img.icons8.com/officexs/2x/bavarian-beer-mug.png"
      }}
      key={beer.id}
      beer={beer}
       />

    })

    return (
      <div className="maps">
      <Map
        google={this.props.google}
        onReady={this.fetchplaces}
        zoom={15}
        style={mapstyles}
        initialCenter={{lat:32.750505,lng: -117.095794}}
        >
        <Marker
          name={'Current location'}
        icon={{url: "http://maps.google.com/mapfiles/ms/icons/purple-dot.png"}}
        />
        {beers}
        </Map>
    </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: `${process.env.REACT_APP_GOOGLE_API_KEY}`
})(BreweryList)
