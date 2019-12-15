import React, { Component } from 'react'

export default class requestInput extends Component {

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  
  
  render() {
    const { email, password, passwordConfirmation ,checked, name} = this.state

    return (
      <div>
        <form className='auth-form' onSubmit={this.onSignUp}>
        <h3>Sign Up</h3>

        <label htmlFor="name">Shop Name</label>
        <input required name="name" value={name} type="text" placeholder="Username"
          onChange={this.handleChange}/>

        
        <label htmlFor="role">What are you?</label>
        <label><input type="radio" value= "5df1f4bc046b95e86554f081" checked={checked} name="manger" onClick={this.roleChangeHandle}/> Manger</label>
        <label><input type="radio" value= "5df1f406046b95e86554f080"  checked={!checked} name="shopper" onClick={this.roleChangeHandle}/> Shopper</label>
        
        

        <button type="submit">Sign Up</button>
      </form>
      </div>
    )
  }
}
