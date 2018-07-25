import React from 'react'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

import Button from '../button'

import './file-picker.css'

const FilePicker = ({
  message,
  buttonMessage,
  imageFilePreviewURL,
  ...rest
}) => (
  <Dropzone className="FilePicker" {...rest}>
    <FontAwesomeIcon icon="upload" className="FilePicker-icon" />
    <small>{message}</small>
    <Button type="ternary" size="small">
      {buttonMessage}
    </Button>
    {imageFilePreviewURL && (
      <div
        className="FilePicker-filePreview"
        style={{ backgroundImage: `url(${imageFilePreviewURL})` }}
      />
    )}
  </Dropzone>
)

FilePicker.propTypes = {
  // React Dropzone
  ...Dropzone.propTypes,

  // State
  message: PropTypes.node,
  buttonMessage: PropTypes.node,
  imageFilePreviewURL: PropTypes.string
}

FilePicker.defaultProps = {
  // State
  message: 'Drag file here or',
  buttonMessage: 'Browse Image',
  imageFilePreviewURL: null
}

export default FilePicker
