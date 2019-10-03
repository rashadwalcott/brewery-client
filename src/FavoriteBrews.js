import React from 'react';
import favoriteBrews from './BreweryList.module.scss'

export default class FavoriteBrews extends React.Component {

  render(){
    // console.log(this.props);
    return(
      <div className='favoriteBrews'>
      <h1>{this.props.brew.name}</h1>
      <h3>{this.props.brew.street}</h3>
      <h3>{this.props.brew.city} {this.props.brew.postal_code}</h3>
      <h3>{this.props.brew.phone}</h3>
      <h3><a href= {this.props.brew.website_url}>Website</a></h3>
      <button className= 'visited' onClick={()=> this.props.removeFav(this.props.brew)} > Visited </button>
      </div>
    )
  }
}
