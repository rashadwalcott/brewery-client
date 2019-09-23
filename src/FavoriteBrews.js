import React from 'react';


export default class FavoriteBrews extends React.Component {

  render(){
    // console.log(this.props);
    return(
      <div className="favbrew">
      <div>
      <h1>{this.props.brew.name}</h1>
      <h3>{this.props.brew.city}</h3>
      </div>
      </div>
    )
  }
}
