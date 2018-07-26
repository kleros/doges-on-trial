import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import reactClickOutside from 'react-click-outside'

import './dropdown.css'

class Dropdown extends PureComponent {
  static propTypes = {
    // State
    type: PropTypes.oneOf(['radio', 'checkbox']).isRequired,
    label: PropTypes.string,
    options: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          count: PropTypes.number.isRequired,
          color: PropTypes.string
        })
      ]).isRequired
    ).isRequired,
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.arrayOf(PropTypes.number.isRequired)
    ]).isRequired,

    // Handlers
    onChange: PropTypes.func.isRequired,

    // Modifiers
    inverted: PropTypes.bool,
    className: PropTypes.string
  }

  static defaultProps = {
    // State
    label: null,

    // Modifiers
    inverted: false,
    className: ''
  }

  state = { isOpen: false }

  handleClickOutside = () => {
    const { isOpen } = this.state
    isOpen && this.setState({ isOpen: false })
  }

  handleBoxClick = () => this.setState(state => ({ isOpen: !state.isOpen }))

  handleOptionClick = ({ currentTarget: { id: _id } }) => {
    const { type, value, onChange } = this.props
    const id = Number(_id)
    const isCheckbox = type === 'checkbox'

    let newValue
    if (isCheckbox) {
      newValue = [...value]
      if (newValue.includes(id)) newValue.splice(newValue.indexOf(id), 1)
      else newValue.push(id)
    } else newValue = id

    this.setState({ isOpen: isCheckbox }, () => onChange(newValue))
  }

  handleSelectAllClick = () => {
    const { options, value, onChange } = this.props
    onChange(value.length === options.length ? [] : options.map((_o, i) => i))
  }

  render() {
    const { type, label, options, value, inverted, className } = this.props
    const { isOpen } = this.state

    const isCheckbox = type === 'checkbox'
    return (
      <div
        className={`Dropdown ${isCheckbox ? 'Dropdown--checkbox' : ''} ${
          inverted ? 'Dropdown--inverted' : ''
        } ${isOpen ? 'is-open' : ''} ${className}`}
      >
        <div onClick={this.handleBoxClick} className="Dropdown-box">
          {isCheckbox ? (
            <span>
              <FontAwesomeIcon icon="sliders-h" />
              &nbsp;&nbsp;&nbsp;&nbsp;{label}
            </span>
          ) : (
            options[value]
          )}
          <FontAwesomeIcon icon="caret-down" className="Dropdown-box-caret" />
        </div>
        {isOpen && (
          <div className="Dropdown-options">
            {isCheckbox && (
              <div
                key="select-all"
                id="select-all"
                onClick={this.handleSelectAllClick}
                className="Dropdown-options-option Dropdown-options-option--selectAll"
              >
                {value.length === options.length ? 'UN' : ''}SELECT ALL
              </div>
            )}
            {options.map((o, i) => {
              const isActive = isCheckbox ? value.includes(i) : value === i
              return (
                <div
                  key={i}
                  id={i}
                  onClick={this.handleOptionClick}
                  className={`Dropdown-options-option ${
                    isActive ? 'is-active' : ''
                  }`}
                >
                  {isCheckbox && (
                    <span className="Dropdown-options-option-checkbox">
                      {isActive && (
                        <FontAwesomeIcon
                          icon="check"
                          className="Dropdown-options-option-checkbox-check"
                        />
                      )}
                    </span>
                  )}
                  {o.label || o}
                  {o.count ? (
                    <div className="Dropdown-options-option-count">
                      {o.color && (
                        <div
                          className="Dropdown-options-option-count-color"
                          style={{ background: o.color }}
                        />
                      )}
                      {o.count}
                    </div>
                  ) : null}
                </div>
              )
            })}
          </div>
        )}
      </div>
    )
  }
}

export default reactClickOutside(Dropdown)
