import React, { Component } from 'react'

export default class requestShow extends Component {

  deleteRequest = () => {
    this.props.setRequest('delete', this.props.request._id, {})
  }

  updateRequest = () => {
    this.props.renderForm('update', this.props.request)
  }

  showRequest = () => {
    this.props.setRequest('show', this.props.request._id, this.props.request)
  }


  newReview = () => {
    this.props.newReview(this.props.request)
  }

  render() {
    console.log(this.props.request.review)
    return (
      <div className="col col-xs-4 card">


        <div onClick={this.showRequest}>
          <h2>{this.props.request.shop_name}</h2>
          <h3>{this.props.request.shift}</h3>
          <h3 className="col">{this.props.request.days.map(day => {
            switch (day) {
              case 'sun': return 'Sunday '
              case 'mon': return 'Monday '
              case 'tue': return 'Tuesday '
              case 'wed': return 'Wednesday '
              case 'thu': return 'Thursday '
              case 'fri': return 'Friday '
              case 'sat': return 'Saturday '
              default: return "wrong"
            }
          })}</h3>
          <div>Details: {this.props.request.details}</div>
        </div>
        {console.log(this.props)}
        {console.log(';lkjhgfdsdfghjkl', this.props.user_id, this.props.request.user_id)}
        {console.log('cvbnm, ', this.props.user_id !== this.props.request.user_id)}
        {(this.props.user_id !== this.props.request.user_id) ?
          (this.props.action === 'show' && !this.props.request.review)
            ? <button onClick={this.newReview}>Choose</button>
            : false
          : <div> <button onClick={this.deleteRequest}>Delete</button>
            <button onClick={this.updateRequest}>Update</button> </div>}




      </div>
    )
  }
}
