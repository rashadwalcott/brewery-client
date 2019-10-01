import React from 'react'
import { Marker, InfoWindow} from 'react-google-maps'

class BreweryMarker extends React.Component {
  state = {
    clicked: false,
    activeMarker: {},
    isOpen: false,
    selected: {}
  }

  // toggleOpen = () => {
  //   this.setState({isOpen: !this.state.isOpen})
  // }
  handleClick = (brewery, marker, e) => {
    this.setState({
      active: true,
      activeMarker: brewery
    })
  }
  onClose = (props) => {
    if(this.state.active){
      this.setState({
        active: false,
        activeMarker: null
      })
    }
  }
  render () {
    // console.log(this.props);
return (
  <div>
  <Marker
  position = {this.props.position}
  onClick = {()=> this.handleClick(this.props.brewery)}
  animation={window.google.maps.Animation.BOUNCE}
  >
  {this.state.active ?
    <InfoWindow
    defaultPosition={this.props.position}
    onCloseClick={this.onClose()}>
    <div>{this.props.brewery.name}
    <button onClick = {() =>{this.props.props.addFavorite(this.state.selectedBrewery)}}>SAVE</button>
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
