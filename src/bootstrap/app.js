import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { Provider, connect } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { Switch, Route, Link } from 'react-router-dom'

import * as walletSelectors from '../reducers/wallet'
import * as notificationSelectors from '../reducers/notification'
import * as notificationActions from '../actions/notification'
import * as dogeActions from '../actions/doge'
import * as modalActions from '../actions/modal'
import Doges from '../containers/doges'
import HowItWorks from '../containers/how-it-works'
import Settings from '../containers/settings'
import DogeModal from '../containers/doge-modal'
import NavBar from '../components/nav-bar'
import PageNotFound from '../components/page-not-found'
import Button from '../components/button'
import NotificationBadge from '../components/notification-badge'
import Identicon from '../components/identicon'
import klerosLogo from '../assets/images/kleros-logo.png'
import * as modalConstants from '../constants/modal'

import { onlyInfura } from './dapp-api'
import Initializer from './initializer'
import GlobalComponents from './global-components'
import './fontawesome'

import './app.css'

class _ConnectedNavBar extends PureComponent {
  static propTypes = {
    // Redux State
    accounts: walletSelectors.accountsShape.isRequired,
    notifications: notificationSelectors.notificationsShape.isRequired,

    // Action Dispatchers
    deleteNotification: PropTypes.func.isRequired,
    fetchDoge: PropTypes.func.isRequired,
    openDogeModal: PropTypes.func.isRequired
  }

  handleSubmitDogeClick = () => {
    const { openDogeModal } = this.props
    openDogeModal(modalConstants.DOGE_MODAL_ENUM.Submit)
  }

  handleNotificationClick = ({ currentTarget: { id } }) => {
    const { deleteNotification, fetchDoge, openDogeModal } = this.props
    deleteNotification(id)
    fetchDoge(id, true)
    openDogeModal(modalConstants.DOGE_MODAL_ENUM.Details)
  }

  render() {
    const { accounts, notifications } = this.props
    return (
      <NavBar
        routes={[
          { title: 'Doges', to: '/' },
          { title: 'How it Works', to: '/how-it-works' },
          {
            title: 'Twitterverse',
            to: 'https://twitter.com/hashtag/DogesOnTrial?src=hash',
            isExternal: true
          },
          {
            title: (
              <span>
                Jurors{' '}
                <img
                  src={klerosLogo}
                  alt="Kleros Logo"
                  className="klerosLogo"
                  data-tip="Powered by Kleros"
                />
              </span>
            ),
            to: 'https://juror.kleros.io',
            isExternal: true
          }
        ]}
        extras={[
          <Button
            key="0"
            tooltip={onlyInfura ? 'Please install MetaMask.' : null}
            onClick={this.handleSubmitDogeClick}
            type="ternary"
            size="small"
            disabled={onlyInfura}
          >
            Submit Doge
          </Button>,
          ...(onlyInfura
            ? []
            : [
                <NotificationBadge
                  key="1"
                  notifications={notifications}
                  onNotificationClick={this.handleNotificationClick}
                >
                  <Link to="/settings">
                    <Identicon
                      address={accounts.data[0]}
                      tooltip="Settings"
                      round
                    />
                  </Link>
                </NotificationBadge>
              ])
        ]}
      />
    )
  }
}
const ConnectedNavBar = connect(
  state => ({
    accounts: state.wallet.accounts,
    notifications: state.notification.notifications
  }),
  {
    deleteNotification: notificationActions.deleteNotification,
    fetchDoge: dogeActions.fetchDoge,
    openDogeModal: modalActions.openDogeModal
  }
)(_ConnectedNavBar)

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
              <Route exact path="/settings" component={Settings} />
              <Route component={PageNotFound} />
            </Switch>
          </div>
          {testElement}
          <Switch>
            <Route exact path="/settings" component={null} />
            <Route exact path="*" component={DogeModal} />
          </Switch>
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
