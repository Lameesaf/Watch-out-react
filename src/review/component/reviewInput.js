import React, { Component } from 'react'

export default class reviewInput extends Component {

  constructor(props) {
    super()
    this.state = {
      review: {
        title: '',
        content: '',
      },
      action: ""
    }
  }
  handleChange = event => {
    const { name, value } = event.target
    this.setState({ review: { ...this.state.review, [name]: value } })

  }

  onChange = (e) => {
    e.preventDefault()
      this.props.setReview(this.state.action, this.props.id, this.state.review)
  }

  componentDidMount = () => {
    if (this.props.id === '') {
      this.setState({
        action: 'create'

      })
    }
    else {
      this.setState({
        action: 'update',
        review: {
          title: this.props.review.title,
          content: this.props.review.content,
        }
      })
    }
  }

  // setKey = key => this.setState({ week: { ...this.state.week, [key]: true } });

  render() {
    const  {title, content}  = this.state.review
    return (
      <div >
        <form className='auth-form' onSubmit={this.onChange}>
          <h3> { (this.state.action ==='create')? "New Review" : "Edit Review"}</h3>

          <label htmlFor="name">Title</label>
          <input required name="title" value={title} type="text" placeholder="title"
            onChange={this.handleChange} />


          <label htmlFor="name">Details</label>
          <textarea required name="content" value={content} type="text" placeholder="review Details"
            onChange={this.handleChange} />


    <button type="submit">{ (this.state.action ==='create')? "Create" : "Update"}</button>
        </form>
      </div>
    )
  }
}
