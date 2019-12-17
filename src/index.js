import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.scss'
import { HashRouter } from 'react-router-dom'

const appJsx = (
  <HashRouter>
    <App />
  </HashRouter>
)

ReactDOM.render(appJsx, document.getElementById('root'))
