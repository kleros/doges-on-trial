import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { RenderIf } from 'lessdux'
import { BeatLoader } from 'react-spinners'

import * as walletSelectors from '../../reducers/wallet'
import * as walletActions from '../../actions/wallet'
import Button from '../../components/button'

import {
  EmailForm,
  getEmailFormIsInvalid,
  submitEmailForm
} from './components/email-form'

import './settings.css'

const Settings = ({
  settings,
  updateEmail,
  emailFormIsInvalid,
  submitEmailForm
}) => (
  <div className="Settings">
    <RenderIf
      resource={settings}
      loading={<BeatLoader color="#3d464d" />}
      updating={<BeatLoader color="#3d464d" />}
      done={
        settings.data && (
          <div className="Settings-emailForm">
            <small className="Settings-emailForm-message">
              Save an email to be notified whenever your submissions or
              submissions you challenged get challenged, accepted, rejected, or
              are pending finalization.
            </small>
            <EmailForm
              onSubmit={updateEmail}
              initialValues={{ email: settings.data.email }}
            />
            <Button onClick={submitEmailForm} disabled={emailFormIsInvalid}>
              Save
            </Button>
          </div>
        )
      }
      failedLoading="There was an error fetching your email."
      failedUpdating="There was an error updating your email."
    />
  </div>
)

Settings.propTypes = {
  // Redux State
  settings: walletSelectors.settingsShape.isRequired,

  // Action Dispatchers
  updateEmail: PropTypes.func.isRequired,

  // emailForm
  emailFormIsInvalid: PropTypes.bool.isRequired,
  submitEmailForm: PropTypes.func.isRequired
}

export default connect(
  state => ({
    settings: state.wallet.settings,
    emailFormIsInvalid: getEmailFormIsInvalid(state)
  }),
  {
    updateEmail: walletActions.updateEmail,
    submitEmailForm
  }
)(Settings)
