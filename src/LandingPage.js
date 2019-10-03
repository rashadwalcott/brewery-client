import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import background from './beerbeach.jpg'
import Nav from './Nav'
import logo from './brewerylogo.png'
import signup from './signup2.png'
import login from './login.png'
export default class LandingPage extends Component {

  render(){
    // console.log(this.props);
    return(
      <div className = 'landingPage'>
        {localStorage.token ?
          <React.Fragment>
         (<div className='nav'><Nav handleLogOut={this.props.handleLogOut}/></div>
       <div className = 'message'><h2>Welcome Brewsters</h2>
        <p>You have arrived at my Brewery Map.</p>
        <p>Here I want you to be able to explore the breweries in your area.</p>
        <p>You do not have to search and mistakenly find bars instead of breweries.</p>
        <p> You will be able to see only breweries and search just for what you are looking for!</p>
        <p>Pour one for me and you when you go visit the brewery that I assisted you in finding.</p>
        <p>Cheers!</p>
      </div>)
       </React.Fragment>
          :
          <React.Fragment>
         (<div className='credentials'><span><Link to='/signup'><img src = {signup}/></Link></span><span> <Link to='/login'><img src = {login}/></Link></span></div>
       <div className='logo'><img src = {logo}/></div>)
          </React.Fragment>}
      </div>
    )
  }
}
