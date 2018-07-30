import React from 'react'
import PropTypes from 'prop-types'

import './card.css'

const Card = ({ children, className }) => (
  <div className={`Card ${className}`}>{children}</div>
)

Card.propTypes = {
  // State
  children: PropTypes.node.isRequired,

  // Modifiers
  className: PropTypes.string
}

Card.defaultProps = {
  // Modifiers
  className: ''
}

export default Card
