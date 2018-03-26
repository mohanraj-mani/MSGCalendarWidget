import React, { Component } from 'react'
import PropTypes from 'prop-types'

class PromocodeConfirmation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showTerms: false
    }
  }

  onClick = () => {
    this.setState(prevState => ({
      showTerms: !prevState.showTerms
    }));
  }

  render() {
    const {title, description, terms} = this.props
    const {showTerms} = this.state
    return (
      <div class="promo-confirmation-message">
        <div class="promo-code-container">
          <div id="remove-coupon" class="glyphicon glyphicon-remove"></div>
            <span class="promo-confirmation-code-title">Code {title} has been applied to the calendar. Note you will need to enter the code again on ticketmaster. </span>
            <div class="promo-confirmation-code-description" dangerouslySetInnerHTML={{ __html: description}}></div>
            <div class="promo-confirmation-code-terms">
              <button id="terms-and-conditions-cta" class="btn-link" onClick={this.onClick}>Click Here for instructions on Chase Preferred Seating and Terms and Conditions</button>
              {
                showTerms
                ? <div class="terms-and-conditions-container" dangerouslySetInnerHTML={{ __html: terms}}></div>
                : null
              }
        </div>
        </div>
      </div>
    )
  }
}

export default PromocodeConfirmation
