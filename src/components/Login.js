import React from 'react'

export default class Login extends React.Component {

  state = {
    username: '',
    password: ''
  }
  //Setting the state for the form values
  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  //Posting to the backend to grab the user
  handleSubmit = (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
    .then(res => res.json())
    .then(data => {
      if (data.token) {
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
      <div className='login'>
        <h1>Login</h1>
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
          <input className='loginButton' type='submit' value='Log In'/>
        </form>
        <button className= 'back' onClick={this.goBack}> Back</button>
      </div>
    )
  }
}
