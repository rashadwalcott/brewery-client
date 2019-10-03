import React from 'react'
import BreweryMap from './BreweryMap'

class MapContainer extends React.Component {
  render () {
    // console.log(this.props.addFavorite);
  return (
    <div>
        <BreweryMap
          addFavorite={this.props.addFavorite}
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_API_KEY}`}
          loadingElement={<div style={{ height: `100%`, }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{
            height: '185%',
            width: '60%',
            position: 'relative',
            marginTop: '9%',
            marginLeft: '20%',
            border: 'solid 2px black',
            }}
            />}
        />
        </div>
  )
  }
}

export default MapContainer;
