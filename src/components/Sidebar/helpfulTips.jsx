import React, { Component } from 'react'

class HelpfulTips extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {helpTips} = this.props
    return (
      <div className="calendar-sidebar sidebar">
        <div className="stickySidebar">
          <div dangerouslySetInnerHTML={{ __html: helpTips}}></div>
        </div>
      </div>
    )
  }
}

export default HelpfulTips
