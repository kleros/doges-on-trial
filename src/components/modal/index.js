import React from 'react'
import ReactModal from 'react-modal'
import PropTypes from 'prop-types'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

import './modal.css'

ReactModal.setAppElement('#root')
const Modal = ({ onRequestClose, children, className, ...rest }) => (
  <ReactModal
    onRequestClose={onRequestClose}
    overlayClassName="Modal--overlay"
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
  onRequestClose: PropTypes.func,

  // State
  children: PropTypes.node,

  // Modifiers
  className: PropTypes.string
}

Modal.defaultProps = {
  // React Modal
  onRequestClose: null,

  // State
  children: null,

  // Modifiers
  className: ''
}

export default Modal
