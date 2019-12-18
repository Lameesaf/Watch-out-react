import React, { Component } from 'react'

export default class reviewShow extends Component {

  deleteReview = () => {
    this.props.setReview('delete', this.props.review._id, {})
  }

  updateReview = () => {
    this.props.renderForm('update', this.props.review)
  }

  showReview = () => {
    const action = this.props.action === 'show' ? '' : 'show'
    this.props.setReview(action, this.props.review._id, this.props.review)
  }


  render() {
    console.log(this.props)
    return (
      <div className={this.props.showClassName}>
        <div onClick={this.showReview}>
          <h1>{this.props.review.title}</h1>
          {this.props.action === 'show'
            ? <p>{this.props.review.content}</p>
            : false}

        </div>
        
        {this.props.action === 'show' && this.props.user._id === this.props.review.user_id
          ? <div><button onClick={this.deleteReview}>Delete</button>
            <button onClick={this.updateReview}>Update</button></div>
          : false}
          { this.props.user._id === this.props.review.user_id
        ?<button onClick={this.showReview}>{this.props.action === 'show' ? 'back' : 'Show'}</button>
        :false}
      </div>

    )
  }
}
