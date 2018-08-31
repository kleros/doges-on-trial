import React from 'react'
import PropTypes from 'prop-types'

import './banner.css'

const Banner = ({ children }) => <div className="Banner">{children}</div>

Banner.propTypes = {
  // State
  children: PropTypes.node.isRequired
}

export default Banner
