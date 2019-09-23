import React from 'react';


export default class Profile extends React.Component {

  state = {
    clicked: false,
    jobShow: {}
  }

  handleClick = (jobObj) => {
    this.setState({jobShow: jobObj, clicked: true})
  }

  render(){

    return(
      <div className="profile">
      <h1>Welcome {this.props.username}!</h1>

      </div>
    )
  }
}
