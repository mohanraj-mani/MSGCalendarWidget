import React, { Component } from 'react'
import CalendarWrapper from './container/Wrapper'
class App extends Component {
  render() {
    return (
      <div className="App">
        <CalendarWrapper calenderMonths={this.props.months}/>
      </div>
    )
  }
}
export default App
