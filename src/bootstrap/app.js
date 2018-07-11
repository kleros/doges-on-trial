import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { Provider, connect } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { Switch, Route } from 'react-router-dom'

import * as modalActions from '../actions/modal'
import Doges from '../containers/doges'
import HowItWorks from '../containers/how-it-works'
import NavBar from '../components/nav-bar'
import PageNotFound from '../components/page-not-found'
import Button from '../components/button'
import NotificationBadge from '../components/notification-badge'
import Identicon from '../components/identicon'
import * as modalConstants from '../constants/modal'

import Initializer from './initializer'
import GlobalComponents from './global-components'
import './fontawesome'

import './app.css'

const today = new Date()
const noOp = () => {}
const ConnectedNavBar = connect(
  state => ({
    accounts: state.wallet.accounts
  }),
  {
    handleSubmitDogeClick: () =>
      modalActions.openDogeModal(modalConstants.DOGE_MODAL_ENUM.Submit)
  }
)(({ accounts, handleSubmitDogeClick }) => (
  <NavBar
    routes={[
      { title: 'Doges', to: '/' },
      { title: 'How it Works', to: '/how-it-works' },
      {
        title: 'Twitterverse',
        to: 'https://twitter.com/hashtag/DogesOnTrial?src=hash',
        isExternal: true
      }
    ]}
    extras={[
      <Button
        key="0"
        onClick={handleSubmitDogeClick}
        type="ternary"
        size="small"
      >
        Submit Doge
      </Button>,
      <NotificationBadge
        key="1"
        notifications={[
          {
            id: '0',
            date: today,
            message: 'This is a notification.',
            thumbnailURL: '404'
          }
        ]}
        onNotificationClick={noOp}
      >
        <Identicon address={accounts.data[0]} round />
      </NotificationBadge>
    ]}
  />
))

const App = ({ store, history, testElement }) => (
  <Provider store={store}>
    <Initializer>
      <ConnectedRouter history={history}>
        <div id="router-root">
          <Helmet>
            <title>Doges on Trial</title>
          </Helmet>
          <Route exact path="*" component={ConnectedNavBar} />
          <div id="scroll-root">
            <Switch>
              <Route exact path="/" component={Doges} />
              <Route exact path="/how-it-works" component={HowItWorks} />
              <Route component={PageNotFound} />
            </Switch>
          </div>
          {testElement}
          <Route exact path="*" component={GlobalComponents} />
        </div>
      </ConnectedRouter>
    </Initializer>
  </Provider>
)

App.propTypes = {
  // State
  store: PropTypes.shape({}).isRequired,
  history: PropTypes.shape({}).isRequired,

  // Testing
  testElement: PropTypes.element
}

App.defaultProps = {
  // Testing
  testElement: null
}

export default App
