import React, {Component} from 'react'
import {Link} from 'react-router-dom'


export default class LandingPage extends Component {

  render(){
    console.log(this.props);
    return(
      <div className='landingpage'>
      <h1>Welcome to Beersters</h1>
      </div>
    )
  }
}
