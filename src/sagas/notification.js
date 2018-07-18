import { eventChannel } from 'redux-saga'
import memoizeOne from 'memoize-one'

import { fork, take, select, race, put } from 'redux-saga/effects'

import * as notificationActions from '../actions/notification'
import * as walletSelectors from '../reducers/wallet'
import * as walletActions from '../actions/wallet'
import * as arbitrablePermissionListSelectors from '../reducers/arbitrable-permission-list'
import * as arbitrablePermissionListActions from '../actions/arbitrable-permission-list'
import { action } from '../utils/action'
import {
  web3,
  arbitrablePermissionList,
  IMAGES_BASE_URL
} from '../bootstrap/dapp-api'
import * as dogeConstants from '../constants/doge'

// Helpers
const getBlockDate = memoizeOne(blockHash =>
  web3.eth.getBlock(blockHash).then(block => new Date(block.timestamp * 1000))
)
const emitNotifications = async (account, timeToChallenge, emitter, events) => {
  const notifiedIDs = {}
  let oldestNonDisputedSubmittedStatusEvent

  for (const event of events.reverse()) {
    if (notifiedIDs[event.returnValues.value]) continue
    const isSubmitter = account === event.returnValues.submitter
    if (!isSubmitter || account !== event.returnValues.challenger) continue

    let message
    switch (Number(event.returnValues.newStatus)) {
      case dogeConstants.IN_CONTRACT_STATUS_ENUM.Submitted:
        if (event.returnValues.newDisputed === true && isSubmitter)
          message = 'Your image has been challenged.'
        else if (event.returnValues.newDisputed === false)
          oldestNonDisputedSubmittedStatusEvent = event
        break
      case dogeConstants.IN_CONTRACT_STATUS_ENUM.Registered:
        if (event.returnValues.newDisputed === false)
          message = `${
            isSubmitter ? 'Your image' : 'An image you challenged'
          } has been accepted into the list.`
        break
      case dogeConstants.IN_CONTRACT_STATUS_ENUM.Cleared:
        if (event.returnValues.newDisputed === false)
          message = `${
            isSubmitter ? 'Your image' : 'An image you challenged'
          } has been rejected from the list.`
        break
      default:
        break
    }

    if (message) {
      notifiedIDs[event.returnValues.value] = true
      emitter({
        ID: event.returnValues.value,
        date: await getBlockDate(event.blockHash),
        message,
        thumbnailURL: IMAGES_BASE_URL + event.returnValues.value
      })
    }
  }

  if (oldestNonDisputedSubmittedStatusEvent) {
    const date = await getBlockDate(
      oldestNonDisputedSubmittedStatusEvent.blockHash
    )
    if (Date.now() - date > timeToChallenge)
      emitter({
        ID: oldestNonDisputedSubmittedStatusEvent.returnValues.value,
        date,
        message: 'Image pending execution.',
        thumbnailURL:
          IMAGES_BASE_URL +
          oldestNonDisputedSubmittedStatusEvent.returnValues.value
      })
  }
}

/**
 * Notification listener.
 */
function* pushNotificationsListener() {
  // Start after receiving accounts and data
  yield put(
    action(arbitrablePermissionListActions.arbitrablePermissionListData.FETCH)
  )
  yield take(walletActions.accounts.RECEIVE)
  yield take(
    arbitrablePermissionListActions.arbitrablePermissionListData.RECEIVE
  )
  while (true) {
    const account = yield select(walletSelectors.getAccount) // Cache current account
    const timeToChallenge = yield select(
      arbitrablePermissionListSelectors.getTimeToChallenge
    ) // Cache current time to challenge

    // Set up event channel with subscriber
    const channel = eventChannel(emitter => {
      arbitrablePermissionList
        .getPastEvents('ItemStatusChange', {
          fromBlock: localStorage.getItem('blockNumber') || 0
        })
        .then(events =>
          emitNotifications(account, timeToChallenge, emitter, events)
        )
      arbitrablePermissionList.events
        .ItemStatusChange()
        .on('data', event =>
          emitNotifications(account, timeToChallenge, emitter, [event])
        )
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
