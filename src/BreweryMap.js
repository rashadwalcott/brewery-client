import React from 'react'
import { withScriptjs, withGoogleMap, GoogleMap} from "react-google-maps"
import BreweryMarker from './BreweryMarker'
import Nav from './Nav'

const styles = require('./GoogleMapStyles.json')

class BreweryMap extends React.Component {
  state = {
    allBreweries: [],
    fullArray: [],
    selectedBrewery: false,
    searchTerm: ''
  }


  //Grabbing the breweries upon the application loading
  componentDidMount() {
    fetch(`http://localhost:3000/breweries`)
    .then(res => res.json())
    .then(breweries => {
      this.setState({allBreweries: breweries, fullArray:breweries})
    })
  }


  //Search through the breweries
  handleInputChange=(event) => {
    this.setState({
      searchTerm: event.target.value //Set state can take two arguments so that the second function could be async
    }, () => {
      const filteredBreweries = this.state.fullArray.filter(brewery => brewery.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
      console.log(filteredBreweries);
       this.state.searchTerm !== '' ?
        this.setState({
          allBreweries: filteredBreweries
        }) :
        this.setState({
          allBreweries: [...this.state.fullArray]
        })

    }
  )


  }

render () {

  //Iterating through the breweries and setting attributes to show it on the map
  const eachBrewery = this.state.allBreweries.map(brewery =>
    <BreweryMarker
      position={{lat:Number(brewery.latitude),lng: Number(brewery.longitude)}}
      selectedBrewery={this.state.selectedBrewery}

      addFavorite={this.props.addFavorite}
      key={brewery.id}
      brewery={brewery}

     />

  )

  // console.log(this.props);
  return (
    <div>
    <div className ='mapNav'  style={{ position:
      'absolute', height: '5%', top: 13, bottom: 0, left: 5, right: 0}}>
    <Nav handleLogOut={this.props.handleLogOut} />
    </div>

    <div className = 'search' style={{position: 'absolute',top:165, right: 0, float: 'left', padding: '0% 45% 0% 0%'}}>
    <input  value ={this.state.searchTerm} onChange ={this.handleInputChange} type='search'  />
    </div>

    <div>
    <GoogleMap
     defaultZoom={12}
     defaultCenter={{lat:40.700850,lng: -73.987510}}
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
     </div>
   )
  }
}
export default (withScriptjs(withGoogleMap(BreweryMap)));
