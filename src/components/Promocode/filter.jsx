import React, { Component } from 'react'
import PropTypes from 'prop-types'

const sliderProps = {
  promoFilterInput: PropTypes.string,
  updatePromocodeStatus: PropTypes.func
}

class PromocodeFilter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      promoFilterInput: this.props.promoFilterInput
    }
  }

  onPromocodeChange = e => {
    this.setState({
      promoFilterInput: e.target.value})
  }

  updatePromocodeStatus = e => {
    const {promoFilterInput} = this.state
    if (e.target.innerText === 'Remove Coupon') {
      this.setState({
        promoFilterInput: e.target.value}, () => {
          this.props.updatePromocodeStatus(promoFilterInput, 'remove')
        })
    } else {
      this.props.updatePromocodeStatus(promoFilterInput, 'apply')
    }
  }

  render() {
    const { promoFilterInput } = this.state
    return (
      <div>
        {
          <div>
            <input type="text" className="promocode-input" value={this.state.promoFilterInput} onChange={this.onPromocodeChange} placeholder="promocode"/>
            <button className="promocode-filterbutton" onClick={this.updatePromocodeStatus}>{((this.props.promoFilterInput === promoFilterInput) && promoFilterInput.length>0) ? 'Remove Coupon' : 'Apply Coupon'}</button>
          </div>
        }
      </div>
    )
  }
}

PromocodeFilter.propTypes = sliderProps

export default PromocodeFilter
