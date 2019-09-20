import React from 'react';
import { Map, GoogleApiWrapper, Marker,InfoWindow } from 'google-maps-react';
import { maps } from './BreweryList.module.scss'


const mapstyles = {
  height: '60%',
  width:'80%'}


export class BreweryList extends React.Component {

  state={
    selectedBeer: {},
    clicked: false,
    beerMarker: {},
    showingInfoWindow: false,
    activeMarker: {}
  }

  fetchplaces(mapProps,map){
    const {google} = mapProps;
    const service = new google.maps.places.PlacesService(map)
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedBeer: props.beer,
      showingInfoWindow: true,
      activeMarker: marker
    })
}

onClose = (props) => {
  if(this.state.showingInfoWindow){
    this.setState({
      showingInfoWindow:false,
      activeMarker: null
    })
  }

}

onButtonClick = () => {

  console.log("SAVED");
}
  render () {
    // console.log(this.selectedBeer);

    const beers = this.props.breweries.map(beer => {
      return <Marker
      position={{lat:beer.latitude,lng: beer.longitude}}
      icon={{
        url: "https://img.icons8.com/officexs/2x/bavarian-beer-mug.png"
      }}
      key={beer.id}
      beer={beer}
      onClick ={this.onMarkerClick}
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
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose} >

          <div>
            <h1>{this.state.selectedBeer.name}</h1>
            <button onClick={this.onButtonClick}> Save Me </button>
            </div>
          </InfoWindow>
        </Map>
    </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: `${process.env.REACT_APP_GOOGLE_API_KEY}`
})(BreweryList)
