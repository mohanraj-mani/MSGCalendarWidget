import React, { Component } from 'react'
import moment from 'moment'

const minMaxReducer = (minMax, event) => {
  if(event.price.min < minMax.min) {
    minMax.min = event.price.min
  }
  if(event.price.max > minMax.max) {
    minMax.max = event.price.max
  }
  return minMax
}

class MonthDates extends Component {
  constructor(props) {
    super(props)
  }

  onEventDayClick = (event) => {
    const key = event.currentTarget.getAttribute('data-datekey')
    this.props.onEventDayClick(key)
  }

  render() {
    const {daysInMonth, firstOfMonth, year, eventsDataList, selectedDate, updatedMonthMap} = this.props
    console.log(updatedMonthMap);
    var monthsRowStack,
        day,
        d,
        current,
        onClick,
        isDate,
        className = '',
        weekStack = Array.apply(null, { length: 7 }).map(Number.call, Number),
        startDay = moment(firstOfMonth).toDate().getUTCDay(),
        first = moment(firstOfMonth).toDate().getDay(),
        rows = 5;

        if ((startDay === 5 && daysInMonth === 31) || (startDay === 6 && daysInMonth > 29)) {
            rows = 6;
        }

        monthsRowStack = Array.apply(null, { length: rows }).map(Number.call, Number);
        day = this.props.startDay + 1 - first;
        while (day > 1) {
            day -= 7;
        }
        day -= 1;
    return (
      <div>
        {
          monthsRowStack.map((item, i) => {
            d = day + i * 7;
            return <div>
              {
                weekStack.map((item, i) => {
                  d += 1;
                  isDate = d > 0 && d <= this.props.daysInMonth;
                  if (isDate) {
                    const momentDate = moment([this.props.year, this.props.month, d])
                    const current = momentDate.toDate()
                    const dayKey = momentDate.format('MM/DD/YYYY')
                    const hasDates = eventsDataList && eventsDataList[dayKey] ? true : false
                    const dateMinMax = (hasDates && Object.keys(eventsDataList[dayKey].length > 0))? eventsDataList[dayKey].reduce(minMaxReducer, {min: 9999, max: -1}) : {}
                    const hasValidDates = dateMinMax.max >= 45
                    let hasFilter = true
                    hasFilter = (updatedMonthMap)
                      ? ((updatedMonthMap && updatedMonthMap[dayKey] && Object.keys(updatedMonthMap[dayKey]).length > 0))
                        ? true
                        : false
                      : (updatedMonthMap===null)
                        ? false
                        : true

                    className = current !== this.props.today ? '' : 'today';

                    if (this.props.disablePast && current < this.props.today) {
                      className += ' cell inactive past-dates';
                    } else if (this.props.minDate !== null && current < this.props.minDate) {
                      className += ' cell inactive past-dates';
                    }

                    if (/past-dates/.test(className)) {
                      return <div className = {className} tabIndex = '0'><div>{d}</div><div className="day-price"></div></div>
                    }

                    return <div role = 'button' tabIndex = '0' className={`cell ${hasFilter && hasDates && hasValidDates ? 'active event-cell visible-cell': 'inactive event-cell'} ${(selectedDate === dayKey) ? 'selected' : ''}`} data-datekey={momentDate.format('MM/DD/YYYY')} onClick={this.onEventDayClick}>
                      <div>{d}</div>
                      <div className="day-price">
                        {eventsDataList && eventsDataList[dayKey] && Object.keys(dateMinMax).length > 0 ? (<div> ${dateMinMax.min} - ${dateMinMax.max} </div>) : null}
                      </div>
                    </div>
                  }

                  return <div className="cell inactive hidden-cell"><div>{'-'}</div><div className="day-price"></div></div>
              })
            }
            </div>
          })
        }
      </div>
    )
  }
}

export default MonthDates
