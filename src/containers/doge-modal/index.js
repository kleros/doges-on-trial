import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import browserImageCompression from 'browser-image-compression'

import * as modalSelectors from '../../reducers/modal'
import * as modalActions from '../../actions/modal'
import Modal from '../../components/modal'
import InfoCard from '../../components/info-card'
import FilePicker from '../../components/file-picker'
import ValueList from '../../components/value-list'
import * as modalConstants from '../../constants/modal'

import './doge-modal.css'

class DogeModal extends PureComponent {
  static propTypes = {
    // Redux State
    openDogeModal: modalSelectors.openDogeModalShape,

    // Action Dispatchers
    closeDogeModal: PropTypes.func.isRequired
  }

  static defaultProps = {
    // Redux State
    openDogeModal: null
  }

  state = { imageFileDataURL: null, imageFileError: null }

  handleOnFileDropAccepted = async ([file]) => {
    // It's not an image
    if (file.type.slice(0, 5) !== 'image')
      return this.setState({
        imageFileDataURL: null,
        imageFileError: 'File is not an image.'
      })

    // It's an image, try to compress it
    const compressedFile =
      file.type.slice(6, 9) === 'gif'
        ? file
        : await browserImageCompression(file, 0.1)

    // It's still too big
    if (compressedFile.size > 100000)
      return this.setState({
        imageFileDataURL: null,
        imageFileError:
          'Image is too big and cannot be resized. It must be less than 100KB.'
      })

    // It's small enough now
    this.setState({
      imageFileDataURL: await browserImageCompression.getDataUrlFromFile(
        compressedFile
      ),
      imageFileError: null
    })
  }

  render() {
    const { openDogeModal, closeDogeModal } = this.props
    const { imageFileDataURL, imageFileError } = this.state
    return (
      <Modal
        isOpen={openDogeModal !== null}
        onRequestClose={closeDogeModal}
        className="DogeModal"
      >
        {openDogeModal === modalConstants.DOGE_MODAL_ENUM.Submit ? (
          <div className="DogeModal-submit">
            {imageFileError && <InfoCard message={imageFileError} />}
            <h1>Submit your Doge</h1>
            <FilePicker
              multiple={false}
              onDropAccepted={this.handleOnFileDropAccepted}
              imageFilePreviewURL={imageFileDataURL}
            />
            <br />
            <br />
            <ValueList items={[{ label: 'Deposit', value: 0.00123 }]} />
          </div>
        ) : openDogeModal === modalConstants.DOGE_MODAL_ENUM.Details ? (
          'Details'
        ) : null}
      </Modal>
    )
  }
}

export default connect(
  state => ({ openDogeModal: state.modal.openDogeModal }),
  { closeDogeModal: modalActions.closeDogeModal }
)(DogeModal)
