import React, { Component } from 'react'
import ReviewInput from './reviewInput'
import ReviewShow from './reviewShow'
import { getReview, createNewReview, deleteReviewById, updateReviewById } from '../api'
export default class reviews extends Component {
  constructor(props) {
    super()
    this.state = {
      reviews: [],
      review: {
        title: '',
        content: '', },
      user_token: '',
      action: '',
      id: ''
    }
  }

  componentDidMount = () => {
    this.setState({
      user_token: this.props.user.token
    }, () => {

      getReview(this.state.user_token)
        .then((response) => {
          console.log(response)
          this.setState({
            reviews: response.data.reviews
          })
        })
        .catch((error) => {
          console.log(error)
        })
    })
  }

  renderForm = (action, review) => {
    if (action === 'update') {

      this.setState({
        action: 'update',
        id: review._id,
        review: review
      })
    } else {
      this.setState({
        action: 'create'
      })
    }

  }

  setReview = (action, id, review) => {
    console.log(action, id)
    this.setState({
      review: review,
      action: action,

    }, () => {

      switch (this.state.action) {
        case "create": createNewReview(this.state.user_token, this.state.review)
          .then((response) => {
            console.log(response.data)
            this.setState({
              action: '',
              reviews: [...this.state.reviews, response.data.review]
            })
          })
          .catch((error) => {
            console.log(error)
          })
          ; break;

        case "update":
          updateReviewById(this.state.user_token, id, this.state.review)
            .then((response) => {
              console.log(response.data)
              const updateReview = this.state.reviews.map(review => {
                console.log(review.review._id, id)
                if (review.review._id=== id) {
                  return {review: this.state.review}
                } else {
                  console.log('here',review)
                  return review
                }
              })
              this.setState({
                action: '',
                reviews: updateReview
              })
            }); break;

        case "show" : 
        console.log("show")
        this.setState({
          review : review,
          id: id
        }); break;

        case "delete": deleteReviewById(this.state.user_token, id)
          .then((response) => {
            const reviews = this.state.reviews.filter(review => {
              return review.review._id !== id
            })
            this.setState({
              action: '',
              reviews: reviews
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
    let allReviews = <h1>You didn't make any reviews</h1>

    if (this.state.reviews.length > 0) {
      allReviews = this.state.reviews.map(review => {
        return <ReviewShow renderForm={this.renderForm} setReview={this.setReview} review={review.review} key={review.review._id} />
      })
    }
    return (
      <div className="row">
        {(this.state.action === 'create' || this.state.action === 'update')
          ? <ReviewInput review={this.state.review} id={this.state.id} setReview={this.setReview} />
          : (this.state.action === "show")
          ? <ReviewShow renderForm={this.renderForm} setReview={this.setReview} review={this.state.review} key={this.state.id} /> 
          :  allReviews
        }
      </div>
    )
  }
}
