import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import { landingpage} from './LandingPage.module.scss'
import background from './beerbeach.jpg'

export default class LandingPage extends Component {

  render(){
    // console.log(this.props);
    return(
      <div className={landingpage}>
      <h1>Welcome Beersters</h1>

      </div>
    )
  }
}
