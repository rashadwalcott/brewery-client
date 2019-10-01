import React from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, InfoWindow} from "react-google-maps"
import BreweryMarker from './BreweryMarker'
import Nav from './Nav'

const styles = require('./GoogleMapStyles.json')

class BreweryMap extends React.Component {
  state = {
    allBreweries: [],
    selectedBrewery: false
  }

  toggleOpen = () => {
    this.setState({isOpen: !this.state.isOpen})
  }

  //Grabbing the breweries upon the application loading
  componentDidMount() {
    fetch(`http://localhost:3000/breweries`)
    .then(res => res.json())
    .then(breweries => {
      this.setState({allBreweries: breweries})
    })
  }

  handleClick = (brewery, event) => {
    this.setState({selectedBrewery: brewery})
  }
render () {
  //Iterating through the breweries and setting attributes to show it on the map
  const eachBrewery = this.state.allBreweries.map(brewery =>
    <BreweryMarker
      position={{lat:Number(brewery.latitude),lng: Number(brewery.longitude)}}
      selectedBrewery={this.state.selectedBrewery}
      clickHandle = {this.handleClick}
      props={this.props}
    key={brewery.id}
    brewery={brewery}

     />

  )

  // console.log(this.state.allBreweries);
  return (
    <div>
    <GoogleMap
     defaultZoom={12}
     defaultCenter={{lat:32.750505,lng: -117.095794}}
     defaultOptions={{
       disableDefaultUI: true, // disable default map UI
       draggable: true, // make map draggable
       keyboardShortcuts: false, // disable keyboard shortcuts
       scaleControl: true, // allow scale controle
       scrollwheel: true, // allow scroll wheel
       styles: styles // change default map styles
     }}
     >
     {eachBrewery}
     </GoogleMap>
     </div>
   )
  }
}
export default (withScriptjs(withGoogleMap(BreweryMap)));
