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
        content: '',
      },
      user_token: '',
      action: '',
      id: '',
      showClassName: ""
    }
  }

  componentDidMount = () => {
    console.log('mount', this.props)
    this.setState({
      user_token: this.props.user.token,
      action: this.props.action,
      showClassName: this.props.showClassName
    }, () => this.getAllReviews())
  }

  getAllReviews = () => {
    console.log('get all' , this.state.user_token)
    getReview(this.state.user_token)
      .then((response) => {
        console.log('res', response.data)
        this.setState({
          reviews: response.data.request
        })
      },()=>{
        console.log('inside', this.state.reviews)
      })
      .catch((error) => {
        console.log(error)
      })

    if (this.props.review) {
      this.setState({
        review: this.props.review
      })
    }
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

  componentWillReceiveProps() {
    let action
    if (this.props.location) {
      action = this.props.location.state.action
    } else {
      action = ''

    }
    this.setState({
      action: action
    })
  }

  setReview = (action, id, review) => {
    this.setState({
      review: review,
      action: action,

    }, () => {

      switch (this.state.action) {
        case "create": createNewReview(this.state.user_token, this.state.review)
          .then((response) => {
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
              const updateReview = this.state.reviews.map(review => {
                if (review.review._id === id) {
                  return { review: this.state.review }
                } else {
                  return review
                }
              })
              this.setState({
                action: '',
                reviews: updateReview
              })
            }); break;

        case "show":
          console.log("show")
          this.setState({
            review: review,
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
        default: this.setState({
          action: '',
        })
      }
    })
  }

  render() {
    let allReviews = <h1>You didn't make any reviews</h1>

    if (this.state.reviews.length > 0) {
      allReviews = this.state.reviews.map(request => {
        return <ReviewShow renderForm={this.renderForm} user={this.props.user} setReview={this.setReview} showClassName={this.state.showClassName} action={this.state.action} review={request.review} key={request.review._id} />
      })
    }


    return (
      <div >
        {(this.state.action === 'create' || this.state.action === 'update')
          ? <ReviewInput review={this.state.review} id={this.state.id} setReview={this.setReview} />
          : (this.state.action === "show")
            ? <ReviewShow renderForm={this.renderForm} user={this.props.user} action={this.state.action} setReview={this.setReview} showClassName={this.state.showClassName} review={this.state.review} key={this.state.id} />
            : allReviews
        }
      </div>
    )
  }
}
