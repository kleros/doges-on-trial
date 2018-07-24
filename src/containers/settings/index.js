import React, { PureComponent } from 'react'
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

class Settings extends PureComponent {
  static propTypes = {
    // Redux State
    settings: walletSelectors.settingsShape.isRequired,

    // Action Dispatchers
    fetchSettings: PropTypes.func.isRequired,
    updateEmail: PropTypes.func.isRequired,

    // emailForm
    emailFormIsInvalid: PropTypes.bool.isRequired,
    submitEmailForm: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { fetchSettings } = this.props
    fetchSettings()
  }

  render() {
    const {
      settings,
      updateEmail,
      emailFormIsInvalid,
      submitEmailForm
    } = this.props
    return (
      <div className="Settings">
        <RenderIf
          resource={settings}
          loading={<BeatLoader color="#3d464d" />}
          updating={<BeatLoader color="#3d464d" />}
          done={
            settings.data && (
              <div className="Settings-emailForm">
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
  }
}

export default connect(
  state => ({
    settings: state.wallet.settings,
    emailFormIsInvalid: getEmailFormIsInvalid(state)
  }),
  {
    fetchSettings: walletActions.fetchSettings,
    updateEmail: walletActions.updateEmail,
    submitEmailForm
  }
)(Settings)
