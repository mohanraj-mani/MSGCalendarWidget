import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'
import Calendar from '../components/Calendar'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import PromocodeConfirmation from '../components/Promocode/Confirmation'
import HelpfulTips from '../components/Sidebar/helpfulTips'
//import {helpTips} from './../data/helpTips.json'

const reduceRawEventsToDayMap = (events, event) => {
  if(events[event.start_date]) {
    events[event.start_date].push(event)
  } else {
    events[event.start_date] = [event]
  }
  return events
}

const reduceDayMapToMonthMap = (dayMap, monthMap) => {
  Object.keys(monthMap).map(
    monthKey => {
      Object.keys(dayMap).forEach(
        dayKey => {
          const dayMapMonth = dayKey.split('/')[0]
          const month = monthKey.split('/')[0]
          if(dayMapMonth === month){
            if(monthMap[monthKey]) {
              monthMap[monthKey][dayKey] = dayMap[dayKey]
            } else {
              monthMap[monthKey] = {[dayKey]: dayMap[dayKey]}
            }
          }
      })
    }
  )
  return monthMap
}

const createMockMonthMap = (dtArr) => {
  let monthMap = {}
  dtArr.map((x, i) => {
    monthMap[x] = null
  })
  return monthMap
}

class CalendarWrapper extends Component {
  constructor(props) {
    super(props)
    this.state = {
      events: [],
      dayMap: {},
      monthMap: createMockMonthMap(this.props.calenderMonths),
      sidebarOpen: false,
      selectedShows: [],
      selectedDate: '',
      min: 10,
      max: 750,
      promoFilterInput: undefined,
      promoCodeDetails: null
    }
  }

  constructQueryString(params){
    const min = this.state.min
    const max = this.state.max
    const start_date = moment(this.props.calenderMonths[0]).format('MMDDYYYY')
    const end_date = moment(start_date, 'MMDDYYYY').add((this.props.calenderMonths.length), 'month').format('MMDDYYYY')
    let baseQuery = `https://dev-api.msg.com/v2/events?sort_by=date&name=Rockettes&size=200&min_price=${min}&max_price=${max}`
    if (!params) {
      baseQuery += `&start_date=${start_date}&end_date=${end_date}`
    }
    let promoCode = this.state.promoFilterInput && this.state.promoFilterInput.length > 0 ? `&promo_code=${this.state.promoFilterInput.toLowerCase()}` : ''
    let dynamicQuery = `${baseQuery}${promoCode}`
    return dynamicQuery
  }

  componentDidMount() {
    axios(this.constructQueryString()).then(
      res => {
        const dayMap = res.data.results.reduce(reduceRawEventsToDayMap, {})
        const monthMap = reduceDayMapToMonthMap(dayMap, this.state.monthMap)
        this.setState({
          events: res.data.results,
          dayMap,
          monthMap
        })
      }
    )
  }

  onEventDayClick = (key) => {
    const parsedKey = key.replace(/\//g, '')
    let selectedDateFilter = parsedKey.length > 0 ? `&start_date=${parsedKey}&end_date=${parsedKey}` : ``
    axios.get(`${this.constructQueryString('requestShows')}${selectedDateFilter}`).then(
      res => {
        if(res.data.results.length > 0) {
          this.setState({
            sidebarOpen: true,
            selectedShows: res.data.results,
            selectedDate: key
          })
        }
      }
    )
  }

  buyTickets = () => {
    const selectedShow = document.querySelectorAll('input[name="showchoice"]:checked')[0]
    var value = selectedShow ? selectedShow.value :  selectedShow
    if(value) {
      window.open(value, '_blank')
    }
  }

  setPriceFilter = (min, max, applyFilter) => {
    this.setState({
      min,
      max
    }, () => {
      if (applyFilter) {
        axios(this.constructQueryString()).then(
          res => {
            const dayMap = res.data.results.reduce(reduceRawEventsToDayMap, {})
            const updatedMonthMap = reduceDayMapToMonthMap(dayMap, createMockMonthMap(this.props.calenderMonths))
            this.setState({
              updatedMonthMap
            })
          }
        )
      }
    })
  }

  submitFilters = () => {
    const self= this
    axios(this.constructQueryString()).then(
      res => {
        const dayMap = res.data.results.reduce(reduceRawEventsToDayMap, {})
        const updatedMonthMap = reduceDayMapToMonthMap(dayMap, createMockMonthMap(this.props.calenderMonths))
        this.setState({
          updatedMonthMap,
          promoCodeDetails: res.data.code !== 409
            ? res.data.meta.promo_code
            : {error: 'The code entered is incorrect - give it another try'}
        })
      }
    )
  }

  showPromoCodeFilter = e => {
    this.setState({promoFilterInput: ''})
  }

  updatePromocodeStatus = (promoFilterInput, type) => {
    if ( type === 'remove') {
      promoFilterInput = ''
    }
    this.setState({
      promoFilterInput
    }, () => {
      this.submitFilters()
    })
  }

  render() {
    const {monthMap, dayMap, selectedDate, selectedShows, min, max, promoFilterInput, updatedMonthMap, promoCodeDetails} = this.state
    const inputProps = {
      disablePast: true,
      datesOnClick: this.onEventDayClick,
      selectedDate: selectedDate
    }

    return(
      <div className='rockettes-calender'>
        <Topbar min={min} max={max} setPriceFilter={this.setPriceFilter} promoFilterInput={promoFilterInput} showPromoCodeFilter = {this.showPromoCodeFilter} updatePromocodeStatus = {this.updatePromocodeStatus}/>
        {
          promoCodeDetails
					? <PromocodeConfirmation title = {promoCodeDetails.title} description = {promoCodeDetails.description} terms = {promoCodeDetails.terms} />
          : null
        }
        {this.state.sidebarOpen && (<Sidebar selectedShows={selectedShows}/>)}
        {
          monthMap && Object.keys(monthMap).map(
            monthKey => {
              inputProps.date = monthKey
              inputProps.eventsDataList = monthMap[monthKey]
              if(updatedMonthMap){
                inputProps.updatedMonthMap = updatedMonthMap[monthKey]
                console.log(inputProps);
              }
              return monthMap[monthKey] && <Calendar {...inputProps} ></Calendar>
            })
        }

      </div>
    )
  }
}
//<HelpfulTips helpTips={helpTips}/>
export default CalendarWrapper
