import React from 'react';
import { Map, GoogleApiWrapper, Marker} from 'google-maps-react';
import InfoWindowEx from "./InfoWindowEx";
import maps  from './BreweryList.module.scss'
import Nav from './Nav'

//Setting the size for the map
const mapstyles = {
  height: '80%',
  width:'80%'}


export class BreweryList extends React.Component {

//Initializing the state
  state={
      allBreweries: [],
    selectedBeer: {},
    clicked: false,
    beerMarker: {},
    showingInfoWindow: false,
    activeMarker: {}
  }
  //Grabbing the breweries upon the application loading
  componentDidMount() {
    fetch(`http://localhost:3000/breweries`)
    .then(res => res.json())
    .then(breweries => {
      this.setState({allBreweries: breweries})
    })
  }

  //Setting the state for when the specific brewery is clicked
  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedBeer: props.beer,
      showingInfoWindow: true,
      activeMarker: marker
    })
}

  //Function for closing the InfowWindow for that brewery
onClose = (props) => {
  if(this.state.showingInfoWindow){
    this.setState({
      showingInfoWindow:false,
      activeMarker: null
    })
  }

}



  render () {

    //Iterating through the breweries and setting attributes to show it on the map
    const beers = this.state.allBreweries.map(beer => {
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
      <div className={maps}>
        <div><Nav handleLogOut={this.props.handleLogOut} /></div>
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
            <button onClick = {() =>{this.props.addFavorite(this.state.selectedBeer)}}>SAVE</button>
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
