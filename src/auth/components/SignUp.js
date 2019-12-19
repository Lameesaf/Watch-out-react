import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { signUp, signIn } from '../api'
import messages from '../messages'

class SignUp extends Component {
  constructor () {
    super()

    this.state = {
      name:'',
      email: '',
      password: '',
      passwordConfirmation: '',
      role: "shopper",
      checked: false
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onSignUp = event => {
    event.preventDefault()

    const { alert, history, setUser } = this.props

    signUp(this.state)
      .then(() => signIn(this.state))
      .then(res => setUser(res.data.user))
      .then(() => alert(messages.signUpSuccess, 'success'))
      .then(() => history.push('/'))
      .catch(error => {
        console.error(error)
        this.setState({ email: '', password: '', passwordConfirmation: '', name: '', role: "shopper" })
        alert(messages.signUpFailure, 'danger')
      })
  }

  roleChangeHandle =(e)=>{
    this.setState({
      role: e.target.value,
      checked: !this.state.checked
    })
    console.log(e.target.value)
  }

  render () {
    const { email, password, passwordConfirmation ,checked, name} = this.state

    return (
      <form className='auth-form' onSubmit={this.onSignUp}>
        <h3>Sign Up</h3>

        <label htmlFor="name">Username</label>
        <input
          required
          name="name"
          value={name}
          type="text"
          placeholder="Username"
          onChange={this.handleChange}
        />

        <label htmlFor="email">Email</label>
        <input
          required
          name="email"
          value={email}
          type="email"
          placeholder="Email"
          onChange={this.handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          required
          name="password"
          value={password}
          type="password"
          placeholder="Password"
          onChange={this.handleChange}
        />
        <label htmlFor="passwordConfirmation">Confirm Password</label>
        <input
          required
          name="passwordConfirmation"
          value={passwordConfirmation}
          type="password"
          placeholder="Confirm Password"
          onChange={this.handleChange}
        />
        <label htmlFor="role">What are you?</label>
        <ul className={"list-inline"}>
            <li>
            <label><input type="radio" value= "manger" checked={checked} name="manger" onClick={this.roleChangeHandle}/> Manger</label>
            </li>
            <li>
            <label><input type="radio" value= "shopper"  checked={!checked} name="shopper" onClick={this.roleChangeHandle}/> Shopper</label>
            </li></ul>
        
        

        <button type="submit">Sign Up</button>
      </form>
    )
  }
}

export default withRouter(SignUp)
