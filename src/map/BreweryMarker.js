import React from 'react'
import { Marker, InfoWindow} from 'react-google-maps'

class BreweryMarker extends React.Component {
  state = {
    active: false,
    activeMarker: {},
    isOpen: false
  }

  handleClick = (brewery) => {
    this.setState({
      active: !this.state.active,
      activeMarker: brewery,
      isOpen: true
    })
    // console.log('hi');
  }
  render () {
    // console.log(this.props);
return (
  <div>
  <Marker
  position = {this.props.position}
   onClick = {()=> this.handleClick(this.props.brewery)}
  animation={window.google.maps.Animation.DROP}
  icon={{
    url: "https://img.icons8.com/officexs/2x/bavarian-beer-mug.png"
  }}
  >
  {this.state.active?
    <InfoWindow
    defaultPosition={this.props.position}
    >
    <div >
    <h2>{this.props.brewery.name}</h2>
    <br></br>
    <button onClick = {() =>{this.props.addFavorite(this.state.activeMarker)}}>SAVE</button>
    </div>
    </InfoWindow>
    :
    null
  }

  </Marker>
</div>

)
  }
}

export default BreweryMarker;
