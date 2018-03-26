import React, { Component } from 'react'

class WeekDays extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {dayNames, startDay} = this.props
    const weekRows = Array.apply(null, { length: 7 }).map(Number.call, Number)
    return (
      <div>
        {
          weekRows.map(function (item, i) {
                return <div className={'cell days-cell'}>
                    {dayNames[(startDay + i) % 7]}
                  </div>
            })
        }
      </div>
    )
  }
}

export default WeekDays
