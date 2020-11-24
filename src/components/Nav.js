import React from 'react';
import {Link} from 'react-router-dom'
import home from '../photos/home.png'
import maplogo from '../photos/map.png'
import favorite from '../photos/email.png'
import exit2 from '../photos/exit2.png'
export default class Nav extends React.Component {

  render(){
    return(
      <React.Fragment>
        <nav className='nav'>
          <span><span><Link to='/' className='nav'><img src={home} alt="Home Button"/></Link></span><span> <Link to='/breweries' className='nav'><img src={maplogo} alt="Map Button"/></Link></span><span> <Link to='/profile' className='nav'><img src={favorite} alt="Profile Button"/></Link></span>
            <button onClick={this.props.handleLogOut}><img src={exit2} alt="Sign out Button"/></button></span>
        </nav>
      </React.Fragment>
    )
  }
}
