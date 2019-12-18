import React, { Component } from 'react'
import Review from '../../review/component/review'

export default class requestShow extends Component {

  deleteRequest = () => {
    this.props.setRequest('delete', this.props.request._id, {})
  }

  updateRequest = () => {
    this.props.renderForm('update', this.props.request)
  }

  showRequest = () => {
    const action = this.props.action === 'show' ? '' : 'show'
    this.props.setRequest(action, this.props.request._id, this.props.request)
  }


  newReview = () => {
    this.props.newReview(this.props.request)
  }

  render() {
    console.log(this.props)
    return (
      <div className="col col-xs-4 card">


        <div>
          <h2 className='title'><strong>Shop Name: </strong><p className='text-area'>{this.props.request.shop_name}</p></h2>
          <h3 className='details'>At The <p className='text-area'>{this.props.request.shift}</p> Shift</h3>
          <h3 className="col details"> On: <p className='text-area'>{this.props.request.days.map(day => {
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
          })}</p></h3>
          {this.props.action === 'show'
            ? <p className='details'> <strong>Request Details:</strong> <p className='text-area'>{this.props.request.details}</p></p>
            : false}
        </div>

        {this.props.request.review && this.props.action === 'show'
          ? <Review user={this.props.user} action="show" showClassName="review" review={this.props.request.review} />
          : false}
        {console.log(this.props.user)}
        {(this.props.user._id !== this.props.request.user_id) ?
          (this.props.action === 'show' && !this.props.request.review)
            ? <button onClick={this.newReview}>Choose</button>
            : false
          : <div> <button onClick={this.deleteRequest}>Delete</button>
            <button onClick={this.updateRequest}>Update</button> </div>}
        <button onClick={this.showRequest}>{this.props.action === 'show' ? 'back' : 'Show'}</button>

      </div>
    )
  }
}
