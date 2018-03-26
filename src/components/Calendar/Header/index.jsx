import React, { Component } from 'react'

class Header extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {monthNames, month, showYear, year} = this.props
    return (
      <div className="month">
        <h2>
          {monthNames && monthNames[month]}
        </h2>
        {
          showYear && this.props.year
        }
      </div>
    )
  }
}

export default Header
