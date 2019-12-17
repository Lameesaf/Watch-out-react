import React, { Component } from 'react'

export default class reviewShow extends Component {

  deleteReview = () =>{
    this.props.setReview('delete',this.props.review._id, {})
  }

  updateReview = () =>{
    this.props.renderForm('update', this.props.review)
  }

  showReview = () => {
    this.props.setReview('show',this.props.review._id, this.props.review)
  }


  render() {
console.log(this.props.review)
    return (
      <div className="col col-xs-4 card review">
      <div onClick={this.showReview}>
        <h1>{this.props.review.title}</h1>
    <p>{this.props.review.content}</p>
      </div>
      <button onClick={this.deleteReview}>Delete</button>
        <button onClick={this.updateReview}>Update</button>
      </div>
    )
  }
}
