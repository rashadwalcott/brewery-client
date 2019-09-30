import React from 'react';
import {Link} from 'react-router-dom'
import logo from './logo-2.png'

export default class Nav extends React.Component {

  render(){
    return(
      <React.Fragment>
        <nav className='nav'>
          <span className='nav'><Link to='/' className='nav'>Home</Link> <Link to='/breweries' className='nav'>Breweries</Link> <Link to='/profile' className='nav'>Profile</Link>
          <button onClick={this.props.handleLogOut}>Logout</button></span>
        </nav>
      </React.Fragment>
    )
  }
}
