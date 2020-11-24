import React from 'react';
import { Switch, Route, withRouter} from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'
import Profile from './Profile'
import LandingPage from './LandingPage'
import MapContainer from './MapContainer'
import './App.scss';

class App extends React.Component {
  //Initializing the state
  state = {
   username: '',
   user_id: '',
   favoriteBrews: [],
   userFavs: []
 }

 //The condition upon the application loading
 componentDidMount(){
    if(localStorage.token){
      this.getProfile()
    } else {
      this.props.history.push('/')
    }
  }

  //Grabbing the profile and setting the intial state to be carried over to other Components
  getProfile = () => {
      fetch('http://localhost:3000/profile',{
        headers: {
          'Authorization': `Bearer ${localStorage.token}`
        }
      })
      .then(res => res.json())
      .then(user => {
        this.setState({username: user.username, user_id: user.id, userFavs: user.favorites})
        this.getFavorites(user.id)
      })
    }

    //Sending the favorite breweries to the backend
    addFavorite = (brew) => {
      fetch('http://localhost:3000/favorites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        user_id: this.state.user_id,
        brewery_id: brew.id
      })
    }).then(res => res.json())
    .then((fav) => {
      this.setState({
        userFavs: [...this.state.userFavs,fav]
      })
      window.alert('Saved! Head To Profile For More')
      this.getFavorites(this.state.user_id)
      }
    )
  }
  //Grabbing back the favorite breweries to set the state
    getFavorites = (id) => {
      fetch(`http://localhost:3000/users/${id}`)
    .then(res => res.json())
    .then(user => {
      this.setState({
        favoriteBrews: user.breweries
      })
    })
    }

    //Optimistic rendering the removal of the favorite breweries
    removeFav= (brew) => {
      let index = this.state.favoriteBrews.indexOf(brew)
      let newFav = [...this.state.favoriteBrews]
      newFav.splice(index,1)
      this.setState({
        favoriteBrews: newFav
      })

      let brewId = this.state.userFavs.find(fav => {
        return brew.id === fav.brewery_id
      })
      fetch(`http://localhost:3000/favorites/${brewId.id}`,{
        method: 'DELETE'
      })


    }

    //Function for logging the user out of the system
    handleLogOut = () => {
   localStorage.clear()
   this.props.history.push('/')
 }

 //Deleting the user
 deleteAccount = () => {
   fetch(`http://localhost:3000/users/${this.state.user_id}`,{
     method: 'DELETE'
   }).then(localStorage.clear())
   this.props.history.push('/')
 }
  render () {
    // console.log(this.state.favoriteBrews);
    return (
      <Switch>
          <Route
            path={'/breweries'}
            render={routerProps => <MapContainer {...routerProps}
            username={this.state.username}
            addFavorite={this.addFavorite}
            handleLogOut={this.handleLogOut}/> }/>

            <Route
              path={'/login'}
              render={routerProps => <Login {...routerProps}
              getProfile={this.getProfile} />}/>

            <Route
              path={'/signup'}
              render={routerProps => <Signup {...routerProps}
              getProfile={this.getProfile} />}/>

            <Route
              path={'/profile'}
              render={routerProps => <Profile {...routerProps}
              username={this.state.username}
              favoriteBrews={this.state.favoriteBrews}
              handleLogOut={this.handleLogOut}
              removeFav = {this.removeFav}
              deleteAccount={this.deleteAccount}/>} />

            <Route
              exact path={'/'}
              render={routerProps => <LandingPage {...routerProps}
              handleLogOut={this.handleLogOut}/>} />
  </Switch>
    );
  }
}

export default withRouter (App);
