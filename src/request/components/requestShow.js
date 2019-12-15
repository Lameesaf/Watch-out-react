import React, { Component } from 'react'

export default class requestShow extends Component {

  deleteRequest = () =>{
    this.props.setRequest('delete',this.props.request._id, {})
  }

  updateRequest = () =>{
    this.props.renderForm('update', this.props.request)
  }

  showRequest = () => {
    this.props.setRequest('show',this.props.request._id, this.props.request)
  }


  render() {
    console.log(this.props.request)
    return (
      <div onClick={this.showRequest}>
        <h1>{this.props.request.shop_name}</h1>
        <button onClick={this.deleteRequest}>Delete</button>
        <button onClick={this.updateRequest}>Update</button>
      </div>
    )
  }
}
