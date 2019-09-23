import React from 'react';
import BreweryContainer from './BreweryContainer'
import { Switch, Route, withRouter} from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'
import Profile from './Profile'
import LandingPage from './LandingPage'

class App extends React.Component {

  state = {
   username: '',
   user_id: ''
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

      })
    }
  render () {
    // console.log(this.state);
    return (
      <Switch>
          <Route
            path={'/breweries'}
            render={routerProps => <BreweryContainer {...routerProps}
            username={this.state.username} /> }/>

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
              username={this.state.username} />} />

            <Route
              exact path={'/'}
              render={routerProps => <LandingPage {...routerProps} />} />
  </Switch>
    );
  }
}

export default withRouter (App);
