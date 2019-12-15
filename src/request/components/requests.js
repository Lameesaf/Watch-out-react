import React, { Component } from 'react'
import RequestInput from './requestInput'
export default class requests extends Component {
  constructor(props) {
    super()
    this.state = {
      requests: [],
      request: {
        shop_name: '',
        shift: '',
        days: [],
        details: '',
      },
      user_token: ''
    }
  }

  componentDidMount = () =>{
    this.setState({
      user_token: this.props.user.token
    })
  }
  render() {
    return (
      <div>
        <RequestInput request = {this.state.request}/>
      </div>
    )
  }
}
