import React from 'react'

export default class Signup extends React.Component {

  state = {
    username: '',
    password: ''
  }
  //Setting the state
  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }
  //Posting to the backend to create a new user
  handleSubmit = (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
    .then(res => res.json())
    .then(data => {
      if (!data.errors) {
        localStorage.token = data.token
        localStorage.username = data.user.username
        localStorage.id = data.user.id
        this.props.getProfile()
        this.props.history.push('/breweries')
      }
    })
  }

  goBack = () => {
    this.props.history.push('/')
  }

  render () {
    return (
      <div className='signup'>
      <h1>Sign Up</h1>
      <form onSubmit={this.handleSubmit}>
        <label> Username:
        <br></br>
        <input onChange={this.handleChange} value={this.state.username} type='text' name='username' />
        </label>
        <br></br>
        <label> Password:
        <br></br>
        <input onChange={this.handleChange} value={this.state.password} type='password' name='password' />
        </label>
        <br></br>
        <input className='signupButton' type='submit' value='Sign Up' />
      </form>
      <button className = 'back' onClick={this.goBack}> Back</button>
      </div>
    )
  }
}
