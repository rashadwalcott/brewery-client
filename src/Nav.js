import React from 'react';
import nav from './Nav.module.scss'
import {Link} from 'react-router-dom'

export default class Nav extends React.Component {

  render(){
    return(
      <React.Fragment>
        <nav className={nav}>
          <span className={nav}><Link to='/' className={nav}>Home</Link> <Link to='/breweries' className={nav}>Breweries</Link> <Link to='/profile' className={nav}>Profile</Link>
          <button onClick={this.props.handleLogOut}>Logout</button></span>
        </nav>
      </React.Fragment>
    )
  }
}
