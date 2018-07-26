import React from 'react'
import PropTypes from 'prop-types'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

import './value-list.css'

const ValueList = ({ items, className }) => (
  <div className={`ValueList ${className}`}>
    {items.map((item, i) => (
      <div key={i} className="ValueList-item">
        <h3 className="ValueList-item-label">
          {item.icon && (
            <img
              src={item.icon}
              alt="Value List Icon"
              className="ValueList-item-label-icon"
            />
          )}
          {item.label}:
        </h3>
        <h3 className="ValueList-item-value">{item.value}</h3>
        <FontAwesomeIcon icon="info-circle" data-tip={item.tooltip} />
      </div>
    ))}
  </div>
)

ValueList.propTypes = {
  // State
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.node.isRequired,
      value: PropTypes.node.isRequired,
      icon: PropTypes.string,
      tooltip: PropTypes.string
    }).isRequired
  ).isRequired,

  // Modifiers
  className: PropTypes.string
}

ValueList.defaultProps = {
  // Modifiers
  className: ''
}

export default ValueList
