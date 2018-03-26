import React, { Component } from 'react'
import moment from 'moment'
import Header from './Header/'
import WeekDays from './WeekDays'
import MonthDates from './MonthDates'

class Calender extends Component {
  constructor(props) {
    super(props)
    const date = moment(this.props.date, 'MM/DD/YYYY')
    this.state = {
        year: date.year(),
        month: date.month(),
        selectedYear: date.year(),
        selectedMonth: date.month(),
        selectedDate: moment().toDate(),
        startDay: 0,
        weekNumbers: false,
        disablePast: this.props.disablePast ? this.props.disablePast : false,
        dayNames: moment.weekdaysShort(),
        monthNames: moment.monthsShort(),
        monthNamesFull: moment.months(),
        firstOfMonth: date.startOf('month').format('YYYY-MM-DD'),
        daysInMonth: date.daysInMonth(),
        today: moment().startOf('day').toDate()
    }
  }

  componentWillMount = () => {

  }

  componentDidMount = () => {

  }
  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.onSelect && prevState.selectedDt !== this.state.selectedDt) {
      this.props.onSelect.call(this.getDOMNode(), this.state);
    }
  }

  selectDate = (year, month, date, element) => {
    if (this.state.selectedElement) {
        this.state.selectedElement.classList.remove('');
      }
      element.target.classList.add('');
      this.setState({
        selectedYear: year,
        selectedMonth: month,
        selectedDate: date,
        selectedDt: moment([year, month, date]).toDate(),
        selectedElement: element.target
      });
  }

  render() {
    const {monthNamesFull, month, year, showYear, dayNames, startDay, weekNumbers, daysInMonth, firstOfMonth, disablePast, today} = this.state
    const {eventsDataList, datesOnClick, selectedDate, updatedMonthMap} = this.props
    return (
      <div className="calendar-widget">
        <div className="months-container" style={{width: '100%'}}>
          <Header monthNames = {monthNamesFull} month = {month} year = {year} showYear = {false} ></Header>
          <WeekDays dayNames = {dayNames} startDay = {startDay} weekNumbers = {weekNumbers} ></WeekDays>
          <MonthDates selectedDate = {selectedDate} onEventDayClick = {datesOnClick} eventsDataList={eventsDataList} updatedMonthMap={updatedMonthMap} month = {month} year = {year} today = {today} startDay = {startDay} daysInMonth = {daysInMonth} firstOfMonth = {firstOfMonth} weekNumbers = {weekNumbers} disablePast = {disablePast} ></MonthDates>
      </div>
      </div>
    )
  }
}
export default Calender
