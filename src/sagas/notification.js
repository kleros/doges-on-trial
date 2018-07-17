import { eventChannel } from 'redux-saga'

import { fork, take, select, race, put } from 'redux-saga/effects'

import * as notificationActions from '../actions/notification'
import * as walletSelectors from '../reducers/wallet'
import * as walletActions from '../actions/wallet'
import { action } from '../utils/action'
import { arbitrablePermissionList } from '../bootstrap/dapp-api'

/**
 * Notification listener.
 */
function* pushNotificationsListener() {
  // Start after receiving accounts
  yield take(walletActions.accounts.RECEIVE)
  while (true) {
    const account = yield select(walletSelectors.getAccount) // Cache current account

    // Set up event channel with subscriber
    const channel = eventChannel(_emitter => {
      arbitrablePermissionList
        .getPastEvents('ItemStatusChange', {
          fromBlock: localStorage.getItem('blockNumber') || 0
        })
        .then(console.log)
      arbitrablePermissionList.events.ItemStatusChange().on('data', console.log)
      return () => {} // Unsubscribe function
    })

    // Keep listening while on the same account
    while (account === (yield select(walletSelectors.getAccount))) {
      const [notification, accounts] = yield race([
        take(channel), // New notification
        take(walletActions.accounts.RECEIVE) // Accounts refetch
      ])
      if (accounts) continue // Possible account change

      // Put new notification
      yield put(
        action(notificationActions.notification.RECEIVE, {
          collection: notificationActions.notifications.self,
          resource: notification
        })
      )
    }

    // We changed accounts, so close the channel. This calls unsubscribe under the hood which clears handlers for the old account
    channel.close()
  }
}

/**
 * The root of the notification saga.
 */
export default function* notificationSaga() {
  // Listeners
  yield fork(pushNotificationsListener)
}
