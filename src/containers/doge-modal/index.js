import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import browserImageCompression from 'browser-image-compression'

import { IMAGES_BASE_URL } from '../../bootstrap/dapp-api'
import * as arbitrablePermissionListSelectors from '../../reducers/arbitrable-permission-list'
import * as arbitrablePermissionListActions from '../../actions/arbitrable-permission-list'
import * as dogeSelectors from '../../reducers/doge'
import * as dogeActions from '../../actions/doge'
import * as modalSelectors from '../../reducers/modal'
import * as modalActions from '../../actions/modal'
import Modal from '../../components/modal'
import Button from '../../components/button'
import * as modalConstants from '../../constants/modal'

import Submit from './components/submit'
import Details from './components/details'

import './doge-modal.css'

class DogeModal extends PureComponent {
  static propTypes = {
    // Redux State
    arbitrablePermissionListData:
      arbitrablePermissionListSelectors.arbitrablePermissionListDataShape
        .isRequired,
    doge: dogeSelectors.dogeShape.isRequired,
    openDogeModal: modalSelectors.openDogeModalShape,

    // Action Dispatchers
    fetchArbitrablePermissionListData: PropTypes.func.isRequired,
    createDoge: PropTypes.func.isRequired,
    executeDogeRequest: PropTypes.func.isRequired,
    submitDogeChallenge: PropTypes.func.isRequired,
    appealDogeRuling: PropTypes.func.isRequired,
    executeDogeRuling: PropTypes.func.isRequired,
    closeDogeModal: PropTypes.func.isRequired
  }

  static defaultProps = {
    // Redux State
    openDogeModal: null
  }

  state = { imageFileDataURL: null, imageFileInfoMessage: null }

  componentDidMount() {
    const { fetchArbitrablePermissionListData } = this.props
    fetchArbitrablePermissionListData()
  }

  componentDidUpdate(prevProps) {
    const { doge: prevDoge } = prevProps
    const { doge } = this.props
    if (prevDoge.creating && !doge.creating)
      this.setState({
        imageFileDataURL: null,
        imageFileInfoMessage: doge.failedCreating ? (
          'Failed to submit Doge.'
        ) : (
          <span>
            Doge submitted successfully.{' '}
            <Button
              to={`https://twitter.com/intent/tweet?text=I%20just%20submitted%20this%20doge%20to%20Kleros%27%20Doges%20on%20Trial%20curated%20list%20experiment.%20Try%20it%20out%20at%20https%3A%2F%2Fdogesontrial.dog&url=${encodeURIComponent(
                IMAGES_BASE_URL + doge.data.ID
              )}&hashtags=DogesOnTrial,Kleros,Ethereum,Blockchain`}
              type="ternary"
              size="small"
            >
              Share on Twitter
            </Button>
          </span>
        )
      })
  }

  handleOnFileDropAccepted = async ([file]) => {
    // It's not an image
    if (file.type.slice(0, 5) !== 'image')
      return this.setState({
        imageFileDataURL: null,
        imageFileInfoMessage: 'File is not an image.'
      })

    // It's an image, try to compress it
    let compressedFile =
      file.type.slice(6, 9) === 'gif'
        ? file
        : await browserImageCompression(file, 0.3)
    // Sometimes compression can increase its size
    compressedFile = file.size < compressedFile.size ? file : compressedFile

    // It's still too big
    if (compressedFile.size > 3e6)
      return this.setState({
        imageFileDataURL: null,
        imageFileInfoMessage:
          'Image is too big and cannot be resized. It must be less than 100KB.'
      })

    // It's small enough now, check dimensions
    const imageFileDataURL = await browserImageCompression.getDataUrlFromFile(
      compressedFile
    )
    const img = await browserImageCompression.loadImage(imageFileDataURL)
    if (img.width < 250 || img.height < 250)
      return this.setState({
        imageFileDataURL: null,
        imageFileInfoMessage:
          'Image is too small. It must be more than 250px wide and 250px tall.'
      })

    // All good
    this.setState({
      imageFileDataURL,
      imageFileInfoMessage: null
    })
  }

  handleSubmitDogeClick = () => {
    const { createDoge } = this.props
    const { imageFileDataURL } = this.state
    createDoge(imageFileDataURL)
  }

  handleExecuteRequestClick = ({ currentTarget: { id } }) => {
    const { executeDogeRequest } = this.props
    executeDogeRequest(id)
  }

  handleSubmitChallengeClick = ({ currentTarget: { id } }) => {
    const { submitDogeChallenge } = this.props
    submitDogeChallenge(id)
  }

  handleAppealClick = ({ currentTarget: { id } }) => {
    const { appealDogeRuling } = this.props
    appealDogeRuling(id)
  }

  handleExecuteRulingClick = ({ currentTarget: { id } }) => {
    const { executeDogeRuling } = this.props
    executeDogeRuling(id)
  }

  render() {
    const {
      arbitrablePermissionListData,
      doge,
      openDogeModal,
      closeDogeModal
    } = this.props
    const { imageFileDataURL, imageFileInfoMessage } = this.state
    return (
      <Modal
        isOpen={openDogeModal !== null}
        onRequestClose={doge.creating || doge.updating ? null : closeDogeModal}
        className="DogeModal"
      >
        {openDogeModal === modalConstants.DOGE_MODAL_ENUM.Submit ? (
          <Submit
            arbitrablePermissionListData={arbitrablePermissionListData}
            doge={doge}
            imageFileDataURL={imageFileDataURL}
            imageFileInfoMessage={imageFileInfoMessage}
            handleOnFileDropAccepted={this.handleOnFileDropAccepted}
            handleSubmitDogeClick={this.handleSubmitDogeClick}
          />
        ) : openDogeModal === modalConstants.DOGE_MODAL_ENUM.Details ? (
          <Details
            arbitrablePermissionListData={arbitrablePermissionListData}
            doge={doge}
            onExecuteRequestClick={this.handleExecuteRequestClick}
            onSubmitChallengeClick={this.handleSubmitChallengeClick}
            onAppealClick={this.handleAppealClick}
            onExecuteRulingClick={this.handleExecuteRulingClick}
          />
        ) : null}
      </Modal>
    )
  }
}

export default connect(
  state => ({
    arbitrablePermissionListData:
      state.arbitrablePermissionList.arbitrablePermissionListData,
    doge: state.doge.doge,
    openDogeModal: state.modal.openDogeModal
  }),
  {
    fetchArbitrablePermissionListData:
      arbitrablePermissionListActions.fetchArbitrablePermissionListData,
    createDoge: dogeActions.createDoge,
    executeDogeRequest: dogeActions.executeDogeRequest,
    submitDogeChallenge: dogeActions.submitDogeChallenge,
    appealDogeRuling: dogeActions.appealDogeRuling,
    executeDogeRuling: dogeActions.executeDogeRuling,
    closeDogeModal: modalActions.closeDogeModal
  }
)(DogeModal)
