import React from 'react'
import PropTypes from 'prop-types'

import './card.css'

const Card = ({ children }) => <div className="Card">{children}</div>

Card.propTypes = {
  // State
  children: PropTypes.node.isRequired
}

export default Card
