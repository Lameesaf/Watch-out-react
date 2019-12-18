import React from 'react'
import { Link } from 'react-router-dom'

import './Header.scss'

const authenticatedOptions = (title) =>{
  return (
  <React.Fragment>
    {/* <Link to="/change-password">Change Password</Link> */}
    <Link to="/sign-out">Sign Out</Link> 
    <Link to={{
      pathname: "/requests",
      state: { action: ''}
    }}>requests</Link>
    {(title === 'manger')? false :<Link to={{
      pathname:"/reviews",
      state: { action: ''}}}>reviews</Link>}
    
  </React.Fragment>
  )
}
const unauthenticatedOptions = (
  <React.Fragment>
    <Link to="/sign-up">Sign Up</Link>
    <Link to="/sign-in">Sign In</Link>
  </React.Fragment>
)

const alwaysOptions = (
  <React.Fragment>
    <Link to="/">Home</Link>
  </React.Fragment>
)

const Header = ({ user }) => (
  <header className="main-header">
    <h1>Untitled Project</h1>
    <nav>
      { user && <span>Welcome, {user.name}</span>}
      { user ? authenticatedOptions(user.role.title) : unauthenticatedOptions }
      { alwaysOptions }
    </nav>
  </header>
)

export default Header
