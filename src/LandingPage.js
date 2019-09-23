import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import { landingpage} from './LandingPage.module.scss'
import background from './beerbeach.jpg'
import Nav from './Nav'

export default class LandingPage extends Component {

  render(){
    // console.log(this.props);
    return(
      <div className={landingpage}>
      <img src = {'https://fontmeme.com/permalink/190923/3bdadb377434d4853967c0fdae389f27.png'} alt= 'title' />
        {localStorage.token ?
         (<Nav handleLogOut={this.props.handleLogOut}/>) :
         (<p><Link to='/signup'>Sign Up</Link> <Link to='/login'>Login</Link></p>)}
         <br></br><br></br><br></br><br></br>
      </div>
    )
  }
}
