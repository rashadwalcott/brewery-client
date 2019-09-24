import React from 'react';
import FavoriteBrews from './FavoriteBrews'
import Nav from './Nav'

export default class Profile extends React.Component {

  render(){
    const favs = this.props.favoriteBrews.map(brew => <FavoriteBrews brew={brew} key={brew.id} removeFav={this.props.removeFav} />)
    return(
      <div className="profile">
      <div><Nav handleLogOut={this.props.handleLogOut}/></div>
        <h1>Welcome {this.props.username}!</h1>
      {favs}
      </div>
    )
  }
}
