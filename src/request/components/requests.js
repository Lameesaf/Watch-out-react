import React, { Component } from 'react'
import RequestInput from './requestInput'
import RequestShow from './requestShow'
import { getRequest, createNewRequest, deleteRequestById, updateRequestById } from '../api'
import {createNewReview} from '../../review/api'
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
    }
  }


    componentWillMount =()=>{
       console.log(this.props)
    this.setState({
      user_token: this.props.user.token,
      action: this.props.action,
    } )
    }
  componentDidMount = () => {
   
 this.getAllRequests()
  }

  componentWillReceiveProps(){
    this.setState({
      action: this.props.location.state.action
    })
  }

  getAllRequests =()=> {
     getRequest(this.state.user_token)
        .then((response) => {
          console.log(response.data)
          this.setState({
            requests: response.data.requests
          })
        })
        .catch((error) => {
          console.log(error)
        })
  }

  renderForm = (action, request) => {
    console.log(request)
    if (action === 'update') {
      this.setState({
        action: 'update',
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
              this.getAllRequests()
              this.setState({
                action: '',
              })
            }); break;

        case "show" : 
        console.log("show case")
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

  newReview =(request) =>{
      createNewReview(this.state.user_token, request._id)
      .then(response =>{
        console.log(response.data)
      })
      .catch(error =>{
        console.log(error)
      })
  }

  render() {
    let allRequest = <h1>You don't have any request</h1>

    if (this.state.requests.length > 0) {
      allRequest = this.state.requests.map(request => {
        return <RequestShow renderForm={this.renderForm} setRequest={this.setRequest} action={this.state.action} user={this.props.user} request={request} key={request._id} />
      })
    }

    if (allRequest.length) {
      allRequest = allRequest.filter(show => {
    
        if (show.props.request.review) {
          if (show.props.request.review.user_id === this.props.user._id || show.props.request.user_id === this.props.user._id) {
            return <RequestShow renderForm={this.renderForm} setRequest={this.setRequest} action={this.state.action} user={this.props.user} request={show.props.request} key={show.props.request._id} />
          }
        } else {
          return <RequestShow renderForm={this.renderForm} setRequest={this.setRequest} action={this.state.action} user={this.props.user} request={show.props.request} key={show.props.request._id} />
        }
      })
    }
    console.log(this.props.user)
    return (
      <div >
         {(this.props.user.role.title !== "shopper")?
         (this.state.action ==="") ?<button onClick={this.renderForm}>New Request</button>: false
        : false}
        <div className="row request-row">
        {(this.state.action === 'create' || this.state.action === 'update')
          ? <RequestInput request={this.state.request}  setRequest={this.setRequest} />
          : (this.state.action === "show")
          ? <RequestShow renderForm={this.renderForm} action={this.state.action} newReview={this.newReview} setRequest={this.setRequest} user={this.props.user} request={this.state.request} key={this.state.id} /> 
          : allRequest
        }
      </div>
      </div>
    )
  }
}


