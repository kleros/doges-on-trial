import React from 'react'
import ReactModal from 'react-modal'
import PropTypes from 'prop-types'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

import './modal.css'

const Modal = ({ onRequestClose, children, className, ...rest }) => (
  <ReactModal
    onRequestClose={onRequestClose}
    className={`Modal ${className}`}
    {...rest}
  >
    {children}
    <FontAwesomeIcon
      icon="times"
      onClick={onRequestClose}
      className="Modal-close"
    />
  </ReactModal>
)

Modal.propTypes = {
  // React Modal
  ...ReactModal.propTypes,
  onRequestClose: PropTypes.func.isRequired,

  // State
  children: PropTypes.node.isRequired,

  // Modifiers
  className: PropTypes.string
}

Modal.defaultProps = {
  // Modifiers
  className: ''
}

export default Modal
