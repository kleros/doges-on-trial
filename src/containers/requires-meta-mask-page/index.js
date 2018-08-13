import React from 'react'
import PropTypes from 'prop-types'

import RequiresMetaMask from '../../components/requires-meta-mask'
import FAQGroup from '../../components/faq-group'
import Card from '../../components/card'
import Button from '../../components/button'

import './requires-meta-mask-page.css'

const RequiresMetaMaskPage = ({ needsUnlock }) => (
  <div className="RequiresMetaMaskPage">
    <RequiresMetaMask needsUnlock={needsUnlock} />
    <div className="RequiresMetaMaskPage-FAQ">
      <h2>F.A.Q.</h2>
      <FAQGroup
        questions={[
          {
            question: 'Who are the direct users of Kleros?',
            answer:
              'In Kleros, we have two sides to the party. The arbitrators that rule on disputes and the arbitrable parties (we like this word) that create the disputes in the first place.'
          }
        ]}
      />
      <Card className="RequiresMetaMaskPage-card">
        <h1>Still have questions? Don't worry, we're here to help!</h1>
        <Button
          to="mailto:stuart@kleros.io?Subject=Doges%20on%20Trial%20Support"
          type="ternary"
          className="RequiresMetaMaskPage-card-button"
        >
          Contact Support
        </Button>
        <Button
          to="https://t.me/kleros"
          type="ternary"
          className="RequiresMetaMaskPage-card-button"
        >
          Ask in Telegram
        </Button>
      </Card>
    </div>
  </div>
)

RequiresMetaMaskPage.propTypes = {
  // State
  needsUnlock: PropTypes.bool.isRequired
}

export default RequiresMetaMaskPage
