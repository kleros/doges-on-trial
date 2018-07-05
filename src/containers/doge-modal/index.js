import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import * as modalSelectors from '../../reducers/modal'
import * as modalActions from '../../actions/modal'
import Modal from '../../components/modal'

// eslint-disable-next-line react/prefer-stateless-function
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

  render() {
    const { openDogeModal, closeDogeModal } = this.props
    return (
      <Modal isOpen={openDogeModal !== null} onRequestClose={closeDogeModal}>
        Helllo
      </Modal>
    )
  }
}

export default connect(
  state => ({ openDogeModal: state.modal.openDogeModal }),
  { closeDogeModal: modalActions.closeDogeModal }
)(DogeModal)
