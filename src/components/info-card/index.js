import React from 'react'
import PropTypes from 'prop-types'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

import './info-card.css'

const InfoCard = ({ message }) => (
  <div className="InfoCard">
    <FontAwesomeIcon icon="exclamation-circle" className="InfoCard-icon" />
    {message}
  </div>
)

InfoCard.propTypes = {
  // State
  message: PropTypes.node.isRequired
}

export default InfoCard
