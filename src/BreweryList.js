import React from 'react';
import { Map, GoogleApiWrapper, Marker} from 'google-maps-react';
import InfoWindowEx from "./InfoWindowEx";
import Nav from './Nav'

import brewery from './BreweryList.module.scss'

//Setting the size for the map
const mapstyles = {
  height: '80%',
  width:'90%',
  padding: '.5em',
  margin: '3em'}


export class BreweryList extends React.Component {

//Initializing the state
  state={
      allBreweries: [],
    selectedBeer: {},
    clicked: false,
    beerMarker: {},
    searchTerm: '',
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

handleInputChange=(event) => {
  this.setState({
    searchTerm: event.target.value
  })
  const filteredBreweries = this.state.allBreweries.filter(brewery => brewery.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
 event.target.value !== '' ?
  this.setState({
    allBreweries: filteredBreweries
  }) :
  fetch(`http://localhost:3000/breweries`)
  .then(res => res.json())
  .then(breweries => {
    this.setState({allBreweries: breweries})
  })

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
      <div className={brewery}>
        <div><Nav handleLogOut={this.props.handleLogOut} /></div>
        <input placeholder="Search for.." value ={this.state.searchTerm} onChange ={this.handleInputChange} type='search' />
      <Map
        google={this.props.google}
        zoom={13}
        style={mapstyles}
        initialCenter={{lat:32.7353,lng: -117.1490}}
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
