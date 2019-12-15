import React, { Component } from 'react'
import RequestInput from './requestInput'
import RequestShow from './requestShow'
import { getRequest, createNewRequest, deleteRequestById, updateRequestById } from '../api'
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
      user_token: '',
      action: '',
      id: ''
    }
  }

  componentDidMount = () => {
    this.setState({
      user_token: this.props.user.token
    }, () => {

      getRequest(this.state.user_token)
        .then((response) => {
          this.setState({
            requests: response.data.requests
          })
        })
        .catch((error) => {
          console.log(error)
        })
    })
  }

  renderForm = (action, request) => {
    
    if (action === 'update') {
      this.setState({
        action: 'update',
        id: request._id,
        request: request
      })
    } else {
      this.setState({
        action: 'create'
      })
    }

  }

  setRequest = (action, id, request) => {
    this.setState({
      request: request,
      action: action,

    }, () => {

      switch (this.state.action) {
        case "create": createNewRequest(this.state.user_token, this.state.request)
          .then((response) => {
            console.log(response.data)
            this.setState({
              action: '',
              requests: [...this.state.requests, response.data.request]
            })
          })
          .catch((error) => {
            console.log(error)
          })
          ; break;

        case "update":
          console.log(id)
          updateRequestById(this.state.user_token, id, this.state.request)
            .then((response) => {
              console.log(response.data)
              const updateRequest = this.state.requests.map(request => {
                if (request._id === id) {
                  return this.state.request
                } else {
                  return request
                }
              })
              this.setState({
                action: '',
                requests: updateRequest
              })
            }); break;

        case "show" : 
        console.log("show")
        this.setState({
          request : request,
          id: id
        }); break;

        case "delete": deleteRequestById(this.state.user_token, id)
          .then((response) => {
            console.log(response.data)
            const requests = this.state.requests.filter(request => {
              return request._id !== id
            })
            this.setState({
              action: '',
              requests: requests
            })
          })
          .catch((error) => {
            console.log(error)
          })
          ; break;
        default: console.log(this.state.action)
      }
    })
  }

  render() {
    let allRequest = <h1>You don't have any request</h1>

    if (this.state.requests.length > 0) {
      allRequest = this.state.requests.map(request => {
        return <RequestShow renderForm={this.renderForm} setRequest={this.setRequest} request={request} key={request._id} />
      })
    }
    console.log(allRequest)
    return (
      <div>
        {(this.state.action === 'create' || this.state.action === 'update')
          ? <RequestInput request={this.state.request} id={this.state.id} setRequest={this.setRequest} />
          : (this.state.action === "show")
          ? <RequestShow renderForm={this.renderForm} setRequest={this.setRequest} request={this.state.request} key={this.state.id} /> 
          : <div> {allRequest}  <button onClick={this.renderForm}>New Request</button> </div>
        }
      </div>
    )
  }
}
