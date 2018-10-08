import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { RenderIf } from 'lessdux'
import { Link } from 'react-router-dom'
import { BeatLoader } from 'react-spinners'

import { isInfura } from '../../bootstrap/dapp-api'
import * as walletSelectors from '../../reducers/wallet'
import * as walletActions from '../../actions/wallet'
import Button from '../../components/button'

import {
  EmailForm,
  getEmailFormIsInvalid,
  submitEmailForm
} from './components/email-form'
import {
  DogecoinAddressForm,
  getDogecoinAddressFormIsInvalid,
  submitDogecoinAddressForm
} from './components/dogecoin-address-form'

import './settings.css'

const Settings = ({
  settings,
  updateEmail,
  updateDogecoinAddress,
  emailFormIsInvalid,
  submitEmailForm,
  dogecoinAddressFormIsInvalid,
  submitDogecoinAddressForm
}) => (
  <div className="Settings">
    <RenderIf
      resource={settings}
      loading={<BeatLoader color="#3d464d" />}
      updating={<BeatLoader color="#3d464d" />}
      done={
        settings.data && (
          <div className="Settings-form">
            <small className="Settings-form-message">
              Save an email to be notified whenever your submissions or
              submissions you challenged get challenged, accepted, rejected, or
              are pending finalization.
            </small>
            <EmailForm
              onSubmit={updateEmail}
              initialValues={{ email: settings.data.email }}
            />
            <Button
              tooltip={isInfura ? 'Please install MetaMask.' : null}
              onClick={submitEmailForm}
              disabled={emailFormIsInvalid || isInfura}
            >
              Save
            </Button>
            <small className="Settings-form-message">
              Save your Dogecoin address for the{' '}
              <Link to="/how-it-works">payout policy</Link>.
            </small>
            <DogecoinAddressForm
              onSubmit={updateDogecoinAddress}
              initialValues={{ dogecoinAddress: settings.data.dogecoinAddress }}
            />
            <Button
              tooltip={isInfura ? 'Please install MetaMask.' : null}
              onClick={submitDogecoinAddressForm}
              disabled={dogecoinAddressFormIsInvalid || isInfura}
            >
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
  updateDogecoinAddress: PropTypes.func.isRequired,

  // emailForm
  emailFormIsInvalid: PropTypes.bool.isRequired,
  submitEmailForm: PropTypes.func.isRequired,

  // dogecoinAddressForm
  dogecoinAddressFormIsInvalid: PropTypes.bool.isRequired,
  submitDogecoinAddressForm: PropTypes.func.isRequired
}

export default connect(
  state => ({
    settings: state.wallet.settings,
    emailFormIsInvalid: getEmailFormIsInvalid(state),
    dogecoinAddressFormIsInvalid: getDogecoinAddressFormIsInvalid(state)
  }),
  {
    updateEmail: walletActions.updateEmail,
    updateDogecoinAddress: walletActions.updateDogecoinAddress,
    submitEmailForm,
    submitDogecoinAddressForm
  }
)(Settings)
