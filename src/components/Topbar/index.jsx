import React, { Component } from 'react'
import moment from 'moment'
import PriceSlider from '../Price/filter'
import PromocodeFilter from '../Promocode/filter'

class Topbar extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {min, max, setPriceFilter, promoFilterInput, showPromoCodeFilter, updatePromocodeStatus } = this.props
    return (
      <div className='top-nav'>
        <div className="container">
          <div className="price-filters">
            <label class="filter-label">Price Range</label>
            <span class="filter-label">${min}</span>
              <PriceSlider min={min} max={max} onSliderChange={setPriceFilter}/>
            <span class="filter-label">${max}</span>
          </div>
          <div>
            {(promoFilterInput === undefined)
            ? <button type="button" class="btn btn-primary btn-md apply-promo" onClick={this.props.showPromoCodeFilter}>Apply Promo Code</button>
            : <PromocodeFilter promoFilterInput={promoFilterInput} updatePromocodeStatus={this.props.updatePromocodeStatus}/>
            }
          </div>
        </div>
      </div>
    )
  }
}

export default Topbar
