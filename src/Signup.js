import React from 'react'


export default class Signup extends React.Component {

  state = {
    username: '',
    password: ''
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

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
        console.log(this.state);
        this.props.history.push('/breweries')
      }
    })
  }

  render () {
    return (
      <div className='form'>
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
        <input type='submit' value='Sign Up' />
      </form>
      </div>
    )
  }
}
