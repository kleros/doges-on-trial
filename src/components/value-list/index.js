import React from 'react'
import PropTypes from 'prop-types'

import './value-list.css'

const ValueList = ({ items }) => (
  <div className="ValueList">
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
      icon: PropTypes.string
    }).isRequired
  ).isRequired
}

export default ValueList
