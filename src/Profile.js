import React from 'react';
import FavoriteBrews from './FavoriteBrews'
import Nav from './Nav'

export default class Profile extends React.Component {

  capital
  render(){
    const favs = this.props.favoriteBrews.map(brew => <FavoriteBrews brew={brew} key={brew.id} removeFav={this.props.removeFav} />)
    return(
      <div>
      <div className= 'profileNav'><Nav handleLogOut={this.props.handleLogOut}/></div>
      <div className='profile'>
        <div className= 'welcome'><h2>WELCOME {this.props.username.toUpperCase()}</h2></div>
        <button className= 'delete' onClick={this.props.deleteAccount}><img src="https://img.icons8.com/cute-clipart/64/000000/delete-shield.png"/> </button>
        <br></br><br></br>
        <div className = 'welcome'><h1>Breweries To Visit:</h1></div>
      {favs}
      </div>
    </div>
    )
  }
}
