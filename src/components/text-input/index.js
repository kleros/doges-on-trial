import React from 'react'
import PropTypes from 'prop-types'

import './text-input.css'

const TextInput = ({
  input: { value, onBlur, onChange },
  meta: { touched, valid, error },
  placeholder,
  type,
  step,
  className
}) => (
  <div
    className={`TextInput ${
      error ? 'is-error' : valid ? 'is-valid' : ''
    } ${className}`}
  >
    {type === 'textarea' ? (
      <textarea
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        className="TextInput-input"
      />
    ) : (
      <input
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        type={type}
        step={step}
        className="TextInput-input"
      />
    )}
    {placeholder && (
      <div
        className={`TextInput-placeholder${
          touched || (value !== undefined && value !== null && value !== '')
            ? ' is-touched'
            : ''
        }`}
      >
        {placeholder}
      </div>
    )}
    {error && <div className="TextInput-error">{error}</div>}
  </div>
)

TextInput.propTypes = {
  // Redux Form
  input: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired
  }).isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    valid: PropTypes.bool,
    error: PropTypes.string
  }),

  // State
  placeholder: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
    .isRequired,

  // Modifiers
  type: PropTypes.string,
  step: PropTypes.number,
  className: PropTypes.string
}

TextInput.defaultProps = {
  // Redux Form
  meta: {},

  // Modifiers
  type: 'text',
  step: undefined,
  className: ''
}

export default TextInput
