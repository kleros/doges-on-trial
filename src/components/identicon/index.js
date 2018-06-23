import React from 'react'
import PropTypes from 'prop-types'
import Blockies from 'react-blockies'

import './identicon.css'

const Identicon = ({ size, scale, address, round, ...rest }) => {
  const length = size * scale
  const lengthStr = `${length}px`
  return (
    <div
      style={{
        borderRadius: round ? `${length / 2}px` : 0,
        height: lengthStr,
        width: lengthStr
      }}
      className="Identicon"
    >
      <Blockies seed={address} size={size} scale={scale} {...rest} />
    </div>
  )
}

Identicon.propTypes = {
  // React Blockies
  ...{ ...Blockies.propTypes, seed: PropTypes.string },
  size: PropTypes.number,
  scale: PropTypes.number,

  // State
  address: PropTypes.string.isRequired,

  // Modifiers
  round: PropTypes.bool
}

Identicon.defaultProps = {
  // React Blockies
  size: 8,
  scale: 5,

  // Modifiers
  round: false
}

export default Identicon
