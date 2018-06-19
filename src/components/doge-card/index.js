import React from 'react'
import PropTypes from 'prop-types'

import './doge-card.css'

const DogeCard = ({ id, status, imageSrc, onClick }) => (
  <div id={id} onClick={onClick} className="DogeCard">
    <img
      src={imageSrc}
      alt={`Doge List Submission #${id}`}
      className="DogeCard-image"
    />
    <div className={`DogeCard-tag DogeCard-tag--${status}`} />
    <div className={`DogeCard-label DogeCard-label--${status}`}>
      {status.toUpperCase()}
    </div>
  </div>
)

DogeCard.propTypes = {
  // State
  id: PropTypes.number.isRequired,
  status: PropTypes.oneOf(['pending', 'challenged', 'accepted', 'rejected'])
    .isRequired,
  imageSrc: PropTypes.string.isRequired,

  // Handlers
  onClick: PropTypes.func.isRequired
}

export default DogeCard
