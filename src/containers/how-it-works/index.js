import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import * as modalActions from '../../actions/modal'
import Button from '../../components/button'
import howItWorks from '../../assets/images/how-it-works.png'
import * as modalConstants from '../../constants/modal'

import './how-it-works.css'

class HowItWorks extends PureComponent {
  static propTypes = {
    // Action Dispatchers
    openDogeModal: PropTypes.func.isRequired
  }

  handleSubmitDogeClick = () => {
    const { openDogeModal } = this.props
    openDogeModal(modalConstants.DOGE_MODAL_ENUM.Submit)
  }

  render() {
    return (
      <div className="HowItWorks">
        <h1 className="HowItWorks-title">Doges on Trial</h1>
        <img src={howItWorks} alt="Doge" className="HowItWorks-image" />
        <p className="HowItWorks-text">
          The Doge List is Kleros' majestic curated list experiment.
          <br />
          <br />
          In Kleros, we have two sides to the party. The arbitrators that rule
          on disputes and the arbitrable parties (we like this word) that create
          the disputes in the first place.
          <br />
          <br />
          The Doge List is a fun way of creating disputes to test our
          arbitrating technology.
          <br />
          <br />
          The rules of the game are simple. Anyone can submit images to the
          gallery by clicking on the "Submit Doge" button on the top right.
          <br />
          <br />
          Anyone can challenge an image (say it's not a doge) during an X week
          period following its submission. Challenging it will create a Kleros
          dispute with the image as evidence for jurors to decide who is right.
          <br />
          <br />
          Both submitting and challenging images require an ETH deposit. This
          deposit is used to pay juror arbitration fees and any leftover amount
          is given to the winning party. So yeah, if you win, you win ETH.
          <br />
          <br />
          Both the submitter and the challenger can appeal the decision made by
          the jurors by paying the appeal fees.
          <br />
          <br />
          Enough reading now, go have some fun,
          <br />
          The Kleros Team
        </p>
        <Button onClick={this.handleSubmitDogeClick}>Submit Doge</Button>
      </div>
    )
  }
}

export default connect(
  null,
  { openDogeModal: modalActions.openDogeModal }
)(HowItWorks)
