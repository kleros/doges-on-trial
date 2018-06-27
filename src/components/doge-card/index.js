import React from 'react'
import PropTypes from 'prop-types'

import * as dogeConstants from '../../constants/doge'

import './doge-card.css'

const DogeCard = ({ id, status, imageSrc, onClick }) => (
  <div
    id={id}
    onClick={onClick}
    className={`DogeCard DogeCard--${status.toLowerCase()}`}
  >
    <img
      src={imageSrc}
      alt={`Doge List Submission`}
      className="DogeCard-image"
    />
    <div className="DogeCard-tag" />
    <div className="DogeCard-label">{status.toUpperCase()}</div>
  </div>
)

DogeCard.propTypes = {
  // State
  id: PropTypes.number.isRequired,
  status: PropTypes.oneOf(dogeConstants.STATUS_ENUM.values).isRequired,
  imageSrc: PropTypes.string.isRequired,

  // Handlers
  onClick: PropTypes.func.isRequired
}

export default DogeCard
