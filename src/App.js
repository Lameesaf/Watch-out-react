import React, { Component } from 'react'
import './App.scss'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import Header from './header/Header'
import SignUp from './auth/components/SignUp'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import ChangePassword from './auth/components/ChangePassword'
import AlertDismissible from './auth/components/AlertDismissible'
import Request from './request/components/requests'
import Review from './review/component/review'

class App extends Component {
  constructor() {
    super()
    let localUser = null;
    if(localStorage.getItem('user')){
      localUser = JSON.parse(localStorage.getItem('user'));}
    this.state = {
      user: localUser,
      alerts: []
    }
  }

  setUser = user => {
    localStorage.setItem('user', JSON.stringify(user))
    this.setState({ user });
  }

  clearUser = () =>{
    localStorage.clear()
    this.setState({ user: null });
   }

  alert = (message, type) => {
    this.setState({ alerts: [...this.state.alerts, { message, type }] })
  }

  render() {
    const { alerts, user } = this.state

    return (
      <React.Fragment>
        <Header user={user} />
        {alerts.map((alert, index) => (
          <AlertDismissible key={index} variant={alert.type} message={alert.message} />
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp alert={this.alert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn alert={this.alert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword alert={this.alert} user={user} />
          )} />

          <AuthenticatedRoute user={user} path='/requests' render={(props) => (
            <Request user={user}  action ="" {...props}/>
          )} />
          <AuthenticatedRoute user={user} action='' path='/reviews' render={(props) => (
            <Review user={user} action ="" {...props} showClassName="col col-xs-4 card review"/>
          )} />
        </main>
      </React.Fragment>
    )
  }
}

export default App
