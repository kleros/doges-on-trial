import { takeLatest, select, call, all, put } from 'redux-saga/effects'

import * as dogeSelectors from '../reducers/doge'
import * as dogeActions from '../actions/doge'
import * as walletSelectors from '../reducers/wallet'
import * as arbitrablePermissionListSelectors from '../reducers/arbitrable-permission-list'
import * as arbitrablePermissionListActions from '../actions/arbitrable-permission-list'
import { lessduxSaga } from '../utils/saga'
import { action } from '../utils/action'
import {
  web3,
  arbitrablePermissionList,
  arbitrator,
  infuraArbitrablePermissionList,
  infuraArbitrator,
  IMAGE_UPLOAD_URL
} from '../bootstrap/dapp-api'
import * as dogeConstants from '../constants/doge'
import * as errorConstants from '../constants/error'

import { fetchArbitrablePermissionListData } from './arbitrable-permission-list'

/**
 * Fetches a paginatable list of doges.
 * @param {{ type: string, payload: ?object, meta: ?object }} action - The action object.
 * @returns {object[]} - The fetched doges.
 */
function* fetchDoges({ payload: { cursor, count, filterValue, sortValue } }) {
  const data = yield call(
    infuraArbitrablePermissionList.methods.queryItems(
      cursor,
      count,
      dogeConstants.FILTER_OPTIONS_ENUM.values.map((_, i) =>
        filterValue.includes(i)
      ),
      sortValue
    ).call,
    { from: yield select(walletSelectors.getAccount) }
  )

  const doges = [
    ...(cursor === '0x00' ? [] : (yield select(dogeSelectors.getDoges)) || []),
    ...(yield all(
      data.values
        .filter(
          ID =>
            ID !==
            '0x0000000000000000000000000000000000000000000000000000000000000000'
        )
        .map(ID => call(fetchDoge, { payload: { ID } }))
    ))
  ]
  doges.hasMore = data.hasMore
  return doges
}

/**
 * Submits a doge to the list.
 * @param {{ type: string, payload: ?object, meta: ?object }} action - The action object.
 * @returns {object} - The `lessdux` collection mod object for updating the list of doges.
 */
function* createDoge({ payload: { imageFileDataURL } }) {
  const ID = web3.utils.keccak256(imageFileDataURL)

  // Upload image
  yield call(fetch, IMAGE_UPLOAD_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ payload: { imageFileDataURL } })
  })

  // Add to contract if absent
  if (Number((yield call(fetchDoge, { payload: { ID } }))._status) === 0)
    yield call(arbitrablePermissionList.methods.requestRegistration(ID).send, {
      from: yield select(walletSelectors.getAccount),
      value: yield select(arbitrablePermissionListSelectors.getSubmitCost)
    })
  else throw new Error(errorConstants.DOGE_ALREADY_SUBMITTED)

  return yield call(fetchDoge, { payload: { ID } })
}

/**
 * Fetches a doge from the list.
 * @param {{ type: string, payload: ?object, meta: ?object }} action - The action object.
 * @returns {object} - The fetched doge.
 */
export function* fetchDoge({ payload: { ID, withDisputeData } }) {
  const doge = yield call(infuraArbitrablePermissionList.methods.items(ID).call)

  let status
  if (doge.disputed) status = dogeConstants.STATUS_ENUM.Challenged
  else
    switch (Number(doge.status)) {
      case dogeConstants.IN_CONTRACT_STATUS_ENUM.Resubmitted:
      case dogeConstants.IN_CONTRACT_STATUS_ENUM.Submitted:
        status = dogeConstants.STATUS_ENUM.Pending
        break
      case dogeConstants.IN_CONTRACT_STATUS_ENUM.Registered:
        status = dogeConstants.STATUS_ENUM.Accepted
        break
      case dogeConstants.IN_CONTRACT_STATUS_ENUM.Cleared:
        status = dogeConstants.STATUS_ENUM.Rejected
        break
      default:
        console.error('Invalid doge status.')
        break
    }

  let disputeData = null
  if (withDisputeData) {
    // Update arbitrable permission list data
    const arbitrablePermissionListData = yield call(
      fetchArbitrablePermissionListData
    )
    yield put(
      action(
        arbitrablePermissionListActions.arbitrablePermissionListData.RECEIVE,
        { arbitrablePermissionListData }
      )
    )

    // Fetch dispute data
    arbitrator.options.address = arbitrablePermissionListData.arbitrator
    try {
      const d = yield all({
        disputeStatus: call(
          infuraArbitrator.methods.disputeStatus(doge.disputeID).call
        ),
        currentRuling: call(
          infuraArbitrator.methods.currentRuling(doge.disputeID).call
        ),
        appealCost: call(
          infuraArbitrator.methods.appealCost(doge.disputeID, '0x00').call
        )
      })
      disputeData = {
        disputeStatus: Number(d.disputeStatus),
        currentRuling: Number(d.currentRuling),
        appealCost: String(d.appealCost)
      }
    } catch (err) {
      console.error(err)
      disputeData = {
        disputeStatus: 0,
        currentRuling: 0,
        appealCost: '0'
      }
    }
  }

  return {
    ID,
    status,
    _status: doge.status,
    lastAction: doge.lastAction
      ? new Date(Number(doge.lastAction * 1000))
      : null,
    submitter: doge.submitter,
    challenger: doge.challenger,
    balance: String(doge.balance),
    disputed: doge.disputed,
    disputeID: doge.disputeID,
    ...disputeData
  }
}

/**
 * Executes a doge's request.
 * @param {{ type: string, payload: ?object, meta: ?object }} action - The action object.
 * @returns {object} - The `lessdux` collection mod object for updating the list of doges.
 */
function* executeDogeRequest({ payload: { ID } }) {
  yield call(arbitrablePermissionList.methods.executeRequest(ID).send, {
    from: yield select(walletSelectors.getAccount)
  })

  return yield call(fetchDoge, {
    payload: { ID, withDisputeData: true }
  })
}

/**
 * Submits a doge challenge.
 * @param {{ type: string, payload: ?object, meta: ?object }} action - The action object.
 * @returns {object} - The `lessdux` collection mod object for updating the list of doges.
 */
function* submitDogeChallenge({ payload: { ID } }) {
  yield call(arbitrablePermissionList.methods.challengeRegistration(ID).send, {
    from: yield select(walletSelectors.getAccount),
    value: yield select(arbitrablePermissionListSelectors.getSubmitCost)
  })

  return yield call(fetchDoge, {
    payload: { ID, withDisputeData: true }
  })
}

/**
 * Appeals a doge's ruling.
 * @param {{ type: string, payload: ?object, meta: ?object }} action - The action object.
 * @returns {object} - The `lessdux` collection mod object for updating the list of doges.
 */
function* appealDogeRuling({ payload: { ID } }) {
  yield call(arbitrablePermissionList.methods.appeal(ID).send, {
    from: yield select(walletSelectors.getAccount),
    value: yield select(dogeSelectors.getDogeAppealCost)
  })

  return yield call(fetchDoge, {
    payload: { ID, withDisputeData: true }
  })
}

/**
 * Executes a doge's ruling.
 * @param {{ type: string, payload: ?object, meta: ?object }} action - The action object.
 * @returns {object} - The `lessdux` collection mod object for updating the list of doges.
 */
function* executeDogeRuling({ payload: { ID } }) {
  yield call(
    arbitrator.methods.executeRuling(
      yield select(dogeSelectors.getDogeDisputeID)
    ).send,
    {
      from: yield select(walletSelectors.getAccount)
    }
  )

  return yield call(fetchDoge, {
    payload: { ID, withDisputeData: true }
  })
}

// Update collection mod flows
const updateDogesCollectionModFlow = {
  flow: 'update',
  collection: dogeActions.doges.self,
  updating: ({ payload: { ID } }) => ID,
  find: ({ payload: { ID } }) => d => d.ID === ID
}

/**
 * The root of the doge saga.
 */
export default function* dogeSaga() {
  // Doges
  yield takeLatest(
    dogeActions.doges.FETCH,
    lessduxSaga,
    'fetch',
    dogeActions.doges,
    fetchDoges
  )

  // Doge
  yield takeLatest(
    dogeActions.doge.CREATE,
    lessduxSaga,
    {
      flow: 'create',
      collection: dogeActions.doges.self
    },
    dogeActions.doge,
    createDoge
  )
  yield takeLatest(
    dogeActions.doge.FETCH,
    lessduxSaga,
    'fetch',
    dogeActions.doge,
    fetchDoge
  )
  yield takeLatest(
    dogeActions.doge.EXECUTE_REQUEST,
    lessduxSaga,
    updateDogesCollectionModFlow,
    dogeActions.doge,
    executeDogeRequest
  )
  yield takeLatest(
    dogeActions.doge.SUBMIT_CHALLENGE,
    lessduxSaga,
    updateDogesCollectionModFlow,
    dogeActions.doge,
    submitDogeChallenge
  )
  yield takeLatest(
    dogeActions.doge.APPEAL_RULING,
    lessduxSaga,
    updateDogesCollectionModFlow,
    dogeActions.doge,
    appealDogeRuling
  )
  yield takeLatest(
    dogeActions.doge.EXECUTE_RULING,
    lessduxSaga,
    updateDogesCollectionModFlow,
    dogeActions.doge,
    executeDogeRuling
  )
}
