import React from 'react';
import ReactDOM from 'react-dom'
import { Map, GoogleApiWrapper, Marker} from 'google-maps-react';
import InfoWindowEx from "./InfoWindowEx";
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

test = (beer) => {
  console.log(beer);
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
        <InfoWindowEx
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
          >
          <div id="save">
            <h2>{this.state.selectedBeer.name}</h2>
            <button onClick = {() =>{this.test(this.state.selectedBeer)}}>SAVE</button>
            </div>
          </InfoWindowEx>
        </Map>
    </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: `${process.env.REACT_APP_GOOGLE_API_KEY}`
})(BreweryList)
