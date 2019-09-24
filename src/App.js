import React from 'react';
import BreweryList from './BreweryList'
import { Switch, Route, withRouter} from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'
import Profile from './Profile'
import LandingPage from './LandingPage'

class App extends React.Component {

  state = {
   username: '',
   user_id: '',
   favoriteBrews: [],
   userFavs: []
 }
 componentDidMount(){
    if(localStorage.token){
      this.getProfile()
    } else {
      this.props.history.push('/')
    }
  }

  getProfile = () => {
      fetch('http://localhost:3000/profile',{
        headers: {
          'Authorization': `Bearer ${localStorage.token}`
        }
      })
      .then(res => res.json())
      .then(user => {
        console.log(user);
        this.setState({username: user.username, user_id: user.id, userFavs: user.favorites})
        this.getFavorites(user.id)
      })
    }

    addFavorite = (beer) => {
      fetch('http://localhost:3000/favorites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        user_id: this.state.user_id,
        brewery_id: beer.id
      })
    }).then(res => res.json())
    .then(() => {
      window.alert('Saved Go To Profile For More')
      this.getFavorites(this.state.user_id)
      }
    )
  }
    getFavorites = (id) => {
      fetch(`http://localhost:3000/users/${id}`)
    .then(res => res.json())
    .then(user => {
      this.setState({
        favoriteBrews: user.breweries
      })
    })
    }

    removeFav= (brew) => {
      let index = this.state.favoriteBrews.indexOf(brew)
      let newFav = [...this.state.favoriteBrews]
      newFav.splice(index,1)
      this.setState({
        favoriteBrews: newFav
      })

      brew = this.state.userFavs.find(fav => {
        return brew.id === fav.brewery_id
      })
      fetch(`http://localhost:3000/favorites/${brew.id}`,{
        method: 'DELETE'
      })


    }

    handleLogOut = () => {
   localStorage.clear()
   this.props.history.push('/')
 }
  render () {
    // console.log(this.state.favoriteBrews);
    return (
      <Switch>
          <Route
            path={'/breweries'}
            render={routerProps => <BreweryList {...routerProps}
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
              removeFav = {this.removeFav}/>} />

            <Route
              exact path={'/'}
              render={routerProps => <LandingPage {...routerProps}
              handleLogOut={this.handleLogOut}/>} />
  </Switch>
    );
  }
}

export default withRouter (App);
