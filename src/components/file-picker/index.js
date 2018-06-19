import React from 'react'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

import Button from '../button'

import './file-picker.css'

const FilePicker = ({ message, buttonMessage, ...rest }) => (
  <Dropzone className="FilePicker" {...rest}>
    <FontAwesomeIcon icon="upload" className="FilePicker-icon" />
    <small>{message}</small>
    <Button type="ternary" size="small">
      {buttonMessage}
    </Button>
  </Dropzone>
)

FilePicker.propTypes = {
  // React Dropzone
  ...Dropzone.propTypes,

  // State
  message: PropTypes.string,
  buttonMessage: PropTypes.string
}

FilePicker.defaultProps = {
  // State
  message: 'Drag file here or',
  buttonMessage: 'Browse Image'
}

export default FilePicker
