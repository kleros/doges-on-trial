import React from 'react'
import PropTypes from 'prop-types'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

import './doge-image.css'

const DogeImage = ({ status, imageSrc }) => {
  let icon
  switch (status) {
    case 'pending':
      break
    case 'challenged':
      icon = 'question'
      break
    case 'accepted':
      icon = 'check'
      break
    case 'rejected':
      icon = 'times'
      break
    default:
      break
  }

  return (
    <div className={`DogeImage DogeImage--${status}`}>
      <img src={imageSrc} alt="Doge Submission" className="DogeImage-image" />
      {icon && <FontAwesomeIcon icon={icon} className="DogeImage-icon" />}
    </div>
  )
}

DogeImage.propTypes = {
  // State
  status: PropTypes.oneOf(['pending', 'challenged', 'accepted', 'rejected'])
    .isRequired,
  imageSrc: PropTypes.string.isRequired
}

export default DogeImage
