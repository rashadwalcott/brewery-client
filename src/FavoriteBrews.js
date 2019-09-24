import React from 'react';
import favbrew from './FavoriteBrews.module.scss'

export default class FavoriteBrews extends React.Component {

  render(){
    // console.log(this.props);
    return(
      <div className={favbrew}>
      <div>
      <h1>{this.props.brew.name}</h1>
      <h3>{this.props.brew.street}</h3>
      <h3>{this.props.brew.city} {this.props.brew.postal_code}</h3>
      <h3>{this.props.brew.phone}</h3>
      <button onClick={()=> this.props.removeFav(this.props.brew)} > Visited </button>
      </div>
      </div>
    )
  }
}
