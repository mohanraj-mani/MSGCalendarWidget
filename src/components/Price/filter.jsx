import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Range } from 'rc-slider'

const sliderProps = {
  onSliderChange: PropTypes.func
}

class PriceSlider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      min: this.props.min,
      max: this.props.max
    }
  }

  onSliderAfterChange = (value) => {
    const min = value[0] || 45
    const max = value[1] || 750
    this.props.onSliderChange(min, max, true)
  }

  onSliderChange = (value) => {
    const min = value[0] || 45
    const max = value[1] || 750
    this.props.onSliderChange(min, max)
  }

  render() {
    const { min, max } = this.state
    return (
      <div className="slider-horizontal inline-block">
        <Range defaultValue={[min, max]} min={min} max={max}
         onAfterChange={this.onSliderAfterChange} onChange={this.onSliderChange} />
      </div>
    )
  }
}

PriceSlider.propTypes = sliderProps

export default PriceSlider
