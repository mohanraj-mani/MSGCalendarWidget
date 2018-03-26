import React, { Component } from 'react'
import moment from 'moment'
class Sidebar extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {selectedShows} = this.props
    return (
      <div className="calendar-widget"><div className="modal right">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header" >
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.closeShows}>
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <h4>Available Times for</h4>
              <h4 style={{
                textAlign: 'center'
              }}>{moment(selectedShows[0].start_date).format('ddd D MMM Y')}</h4>
              <ul>
              {
                selectedShows.map(
                  show => {
                      const [showTimeHour, showTimeMinute] = show.start_time.split(':')
                      const showTimeParsed = showTimeHour > 12 ? `${showTimeHour - 12}:${showTimeMinute}` : `${showTimeHour}:${showTimeMinute}`
                      const meridian = showTimeHour > 12 ? 'PM' : 'AM'
                      return (
                        <li style={{ paddingBottom: '12px'}} key={meridian}>
                          <input type='radio' name='showchoice' value={show.host_url}/> {showTimeParsed} {meridian} From ${show.price.min} - ${show.price.max}
                        </li>
                      )
                  }
                )
              }
              </ul>
              <button className="promocodeButton" onClick={this.buyTickets}> Buy Tickets </button>
            </div>
          </div>
        </div></div></div>
    )
  }
}

export default Sidebar
