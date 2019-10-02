import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import background from './beerbeach.jpg'
import Nav from './Nav'
import logo from './logo-2.png'
export default class LandingPage extends Component {

  render(){
    // console.log(this.props);
    return(
      <div>
         <br></br>
        {localStorage.token ?
         (<div className='nav'><Nav handleLogOut={this.props.handleLogOut}/></div>) :
         (<p><Link to='/signup'>Sign Up</Link> <Link to='/login'>Login</Link></p>)}

      </div>
    )
  }
}
