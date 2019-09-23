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
   favoriteBrews: []
 }
 componentDidMount(){
    if(localStorage.token){
      this.getProfile()
    } else {
      this.props.history.push('/breweries')
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
        this.setState({username: user.username, user_id: user.id})
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
  render () {
    // console.log(this.state.favoriteBrews);
    return (
      <Switch>
          <Route
            path={'/breweries'}
            render={routerProps => <BreweryList {...routerProps}
            username={this.state.username}
            addFavorite={this.addFavorite} /> }/>

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
              favoriteBrews={this.state.favoriteBrews}/>} />

            <Route
              exact path={'/'}
              render={routerProps => <LandingPage {...routerProps} />} />
  </Switch>
    );
  }
}

export default withRouter (App);
