import React from 'react';
import {Link} from 'react-router-dom'
import logo from './logo-2.png'
import home from './home.png'
import globe from './globe.png'
import maplogo from './map.png'
import favorite from './email.png'
import exit from './exit.png'
import exit1 from './exit1.png'
import exit2 from './exit2.png'
export default class Nav extends React.Component {

  render(){
    return(
      <React.Fragment>
        <nav className='nav'>
          <span><span><Link to='/' className='nav'><img src={home}/></Link></span><span> <Link to='/breweries' className='nav'><img src={maplogo}/></Link></span><span> <Link to='/profile' className='nav'><img src={favorite}/></Link></span>
            <button onClick={this.props.handleLogOut}><img src={exit2}/></button></span>
        </nav>
      </React.Fragment>
    )
  }
}
