import React from 'react'
import PropTypes from 'prop-types'

import metaMaskLogo from '../../assets/images/meta-mask-logo.png'
import Button from '../button'

import './requires-meta-mask.css'

const RequiresMetaMask = ({ needsUnlock }) => (
  <div className="RequiresMetaMask">
    <img
      src={metaMaskLogo}
      alt="MetaMask Logo"
      className="RequiresMetaMask-logo"
    />
    <div className="RequiresMetaMask-content">
      <h1>
        {needsUnlock
          ? 'You need to unlock your Web3 browser wallet and refresh the page to run this dapp.'
          : 'You need a Web3 enabled browser to run this dapp.'}
      </h1>
      <small>
        {!needsUnlock &&
          'We recommend using Chrome with the MetaMask extension. '}
        This also serves as your login so you won't need to keep track of
        another account and password.
      </small>
      {!needsUnlock && (
        <div>
          <br />
          <Button to="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en">
            Install MetaMask
          </Button>
        </div>
      )}
    </div>
  </div>
)

RequiresMetaMask.propTypes = {
  // State
  needsUnlock: PropTypes.bool
}

RequiresMetaMask.defaultProps = {
  // State
  needsUnlock: false
}

export default RequiresMetaMask
