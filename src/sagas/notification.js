import { eventChannel } from 'redux-saga'
import memoizeOne from 'memoize-one'

import {
  fork,
  takeLatest,
  take,
  select,
  race,
  call,
  put
} from 'redux-saga/effects'

import * as notificationActions from '../actions/notification'
import * as walletSelectors from '../reducers/wallet'
import * as walletActions from '../actions/wallet'
import * as arbitrablePermissionListSelectors from '../reducers/arbitrable-permission-list'
import * as arbitrablePermissionListActions from '../actions/arbitrable-permission-list'
import * as dogeActions from '../actions/doge'
import { lessduxSaga } from '../utils/saga'
import { action } from '../utils/action'
import {
  web3,
  infuraArbitrablePermissionList,
  IMAGES_BASE_URL
} from '../bootstrap/dapp-api'
import * as dogeConstants from '../constants/doge'

import { fetchDoge } from './doge'

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
    switch (Number(event.returnValues.status)) {
      case dogeConstants.IN_CONTRACT_STATUS_ENUM.Submitted:
        if (event.returnValues.disputed === true && isSubmitter)
          message = 'Your image has been challenged.'
        else if (event.returnValues.disputed === false)
          oldestNonDisputedSubmittedStatusEvent = event
        break
      case dogeConstants.IN_CONTRACT_STATUS_ENUM.Registered:
        if (event.returnValues.disputed === false)
          message = `${
            isSubmitter ? 'Your image' : 'An image you challenged'
          } has been accepted into the list.`
        break
      case dogeConstants.IN_CONTRACT_STATUS_ENUM.Cleared:
        if (event.returnValues.disputed === false)
          message = `${
            isSubmitter ? 'Your image' : 'An image you challenged'
          } has been rejected from the list.`
        break
      default:
        break
    }

    if (message) {
      notifiedIDs[event.returnValues.value] =
        event.returnValues.disputed === true ? 'disputed' : true
      emitter({
        ID: event.returnValues.value,
        date: await getBlockDate(event.blockHash),
        message,
        thumbnailURL: IMAGES_BASE_URL + event.returnValues.value
      })
    }
  }

  if (
    oldestNonDisputedSubmittedStatusEvent &&
    notifiedIDs[oldestNonDisputedSubmittedStatusEvent.returnValues.value] !==
      'disputed'
  ) {
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

  if (events[0])
    localStorage.setItem(
      infuraArbitrablePermissionList.options.address + 'nextEventsBlockNumber',
      events[0].blockNumber + 1
    )
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
      infuraArbitrablePermissionList
        .getPastEvents('ItemStatusChange', {
          fromBlock:
            localStorage.getItem(
              infuraArbitrablePermissionList.options.address +
                'nextEventsBlockNumber'
            ) || 0
        })
        .then(events =>
          emitNotifications(account, timeToChallenge, emitter, events)
        )
      infuraArbitrablePermissionList.events
        .ItemStatusChange()
        .on('data', event => {
          emitNotifications(account, timeToChallenge, emitter, [event])
          emitter(event.returnValues.value)
        })
      return () => {} // Unsubscribe function
    })

    // Keep listening while on the same account
    while (
      account === (yield select(walletSelectors.getAccount)) &&
      timeToChallenge ===
        (yield select(arbitrablePermissionListSelectors.getTimeToChallenge))
    ) {
      const [notification, accounts, arbitrablePermissionListData] = yield race(
        [
          take(channel), // New notification
          take(walletActions.accounts.RECEIVE), // Accounts refetch
          take(
            arbitrablePermissionListActions.arbitrablePermissionListData.RECEIVE
          ) // Arbitrable permission list data refetch
        ]
      )
      if (accounts || arbitrablePermissionListData) continue // Possible account or time to challenge change

      // Put new notification
      yield put(
        typeof notification === 'string'
          ? action(dogeActions.doge.RECEIVE_UPDATED, {
              collectionMod: {
                collection: dogeActions.doges.self,
                resource: yield call(fetchDoge, {
                  payload: { ID: notification, withDisputeData: true }
                }),
                updating: notification,
                find: d => d.ID === notification
              }
            })
          : action(notificationActions.notification.RECEIVE, {
              collectionMod: {
                collection: notificationActions.notifications.self,
                resource: notification
              }
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

  // Notification
  yield takeLatest(
    notificationActions.notification.DELETE,
    lessduxSaga,
    {
      flow: 'delete',
      collection: notificationActions.notifications.self,
      find: ({ payload: { ID } }) => n => n.ID === ID
    },
    notificationActions.notification,
    null
  )
}
