import React, { Component } from 'react'

export default class requestInput extends Component {

  constructor(props) {
    super()
    this.state = {
      request: {
        shop_name: '',
        shift: 'morning',
        days: [],
        details: '',
      },
      checked: true,
      week: {
        sun: false,
        mon: false,
        tue: false,
        wed: false,
        thu: false,
        fri: false,
        sat: false
      },
      action: ""
    }
  }
  handleChange = event => {
    const { name, value } = event.target
    this.setState({ request: { ...this.state.request, [name]: value } })

  }

  shiftChangeHandle = (e) => {
    this.setState({
      request: { ...this.state.request, shift: e.target.value },
      checked: !this.state.checked
    })
  }
  onChangeDays = (e) => {
    const name = e.target.name
    this.setState({ week: { ...this.state.week, [name]: !this.state.week[name] } })
  }

  onChange = (e) => {
    e.preventDefault()
    const days = []
    for (let key in this.state.week) {
      if (this.state.week[key] === true) {
        days.push(key)
      }
    }
    this.setState({ request: { ...this.state.request, days: days } },
      () => this.props.setRequest(this.state.action, this.props.id, this.state.request))
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
        request: {
          shop_name: this.props.request.shop_name,
          shift: this.props.request.shift,
          days: this.props.request.days,
          details: this.props.request.details,
        }
      }, () => {
        let week = {}
        for (let key in this.state.week) {
          if (this.state.request.days.includes(key)) {
            week = { ...week, [key]: true }
          }else {
            week = { ...week, [key]: false }
          }
        }
        this.setState({
          week: week
        })

        if (this.state.request.shift === 'evening') {
          this.setState({
            checked: false
          })
        }
      })
    }
  }

  // setKey = key => this.setState({ week: { ...this.state.week, [key]: true } });

  render() {
    const { request, checked } = this.state
    const { sun, mon, tue, wed, thu, fri, sat } = this.state.week
    return (
      <div>
        <form className='auth-form' onSubmit={this.onChange}>
          <h3>New Request</h3>

          <label htmlFor="name">Shop Name</label>
          <input required name="shop_name" value={request.shop_name} type="text" placeholder="shop name"
            onChange={this.handleChange} />

          <label htmlFor="shift">What Shift?</label>
          <label><input type="radio" value="morning" checked={checked} name="morning" onChange={this.shiftChangeHandle} /> Morning</label>
          <label><input type="radio" value="evening" checked={!checked} name="evening" onChange={this.shiftChangeHandle} /> Evening</label>

          <label>
            <input type="checkbox" checked={sun} name="sun" value="sunday"
              onClick={(e) => this.onChangeDays(e)} /> Sunday
            </label>
          <label>
            <input type="checkbox" checked={mon} name="mon" value="Monday"
              onClick={this.onChangeDays} /> Monday
            </label>
          <label>
            <input type="checkbox" checked={tue} name="tue" value="Tuesday"
              onClick={this.onChangeDays} /> Tuesday
            </label>
          <label>
            <input type="checkbox" checked={wed} name="wed" value="Wednesday"
              onClick={this.onChangeDays} /> Wednesday
            </label>
          <label>
            <input type="checkbox" checked={thu} name="thu" value="Thursday"
              onClick={this.onChangeDays} /> Thursday
            </label>
          <label>
            <input type="checkbox" checked={fri} name="fri" value="Friday"
              onClick={this.onChangeDays} /> Friday
            </label>
          <label>
            <input type="checkbox" checked={sat} name="sat" value="Saturday"
              onClick={this.onChangeDays} /> Saturday
            </label>

          <label htmlFor="name">Details</label>
          <textarea required name="details" value={request.details} type="text" placeholder="request details"
            onChange={this.handleChange} />





    <button type="submit">{ (this.state.action ==='create')? "Create" : "Update"}</button>
        </form>
      </div>
    )
  }
}
