import React from 'react';
import FavoriteBrews from './FavoriteBrews'

export default class Profile extends React.Component {

  render(){
    const favs = this.props.favoriteBrews.map(brew => <FavoriteBrews brew={brew} key={brew.id} />)
    return(
      <div className="profile">
      <h1>Welcome {this.props.username}!</h1>
      {favs}
      </div>
    )
  }
}
