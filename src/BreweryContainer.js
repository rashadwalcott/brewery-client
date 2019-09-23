import React from 'react'
import BreweryList from './BreweryList'
import { Map, GoogleApiWrapper, Marker} from 'google-maps-react';

class BreweryContainer extends React.Component {
  state = {
    allBreweries: []
  }

  componentDidMount() {
    fetch(`http://localhost:3000/breweries`)
    .then(res => res.json())
    .then(breweries => {
      this.setState({allBreweries: breweries})
    })
  }

  render () {
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
    // console.log(this.state.allBreweries)
    return (
      <div>
        <BreweryList beers={beers} />
      </div>
    )
  }
}

export default BreweryContainer;
