import React from 'react'
import PropTypes from 'prop-types'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

import * as dogeConstants from '../../constants/doge'

import './doge-image.css'

const DogeImage = ({ status, imageSrc }) => {
  let icon
  switch (status) {
    case dogeConstants.STATUS_ENUM.Pending:
      break
    case dogeConstants.STATUS_ENUM.Challenged:
      icon = 'question'
      break
    case dogeConstants.STATUS_ENUM.Accepted:
      icon = 'check'
      break
    case dogeConstants.STATUS_ENUM.Rejected:
      icon = 'times'
      break
    default:
      break
  }

  return (
    <div
      className={`DogeImage DogeImage--${dogeConstants.STATUS_ENUM[
        status
      ].toLowerCase()}`}
    >
      <img src={imageSrc} alt="Doge Submission" className="DogeImage-image" />
      {icon && <FontAwesomeIcon icon={icon} className="DogeImage-icon" />}
    </div>
  )
}

DogeImage.propTypes = {
  // State
  status: PropTypes.oneOf(dogeConstants.STATUS_ENUM.indexes).isRequired,
  imageSrc: PropTypes.string.isRequired
}

export default DogeImage
