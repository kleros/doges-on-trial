import { takeLatest, select, call, all } from 'redux-saga/effects'

import * as dogeActions from '../actions/doge'
import * as walletSelectors from '../reducers/wallet'
import * as arbitrablePermissionListSelectors from '../reducers/arbitrable-permission-list'
import { lessduxSaga } from '../utils/saga'
import {
  web3,
  arbitrablePermissionList,
  IMAGE_UPLOAD_URL
} from '../bootstrap/dapp-api'
import * as dogeConstants from '../constants/doge'

/**
 * Fetches a paginatable list of doges.
 * @param {{ type: string, payload: ?object, meta: ?object }} action - The action object.
 * @returns {object[]} - The fetched doges.
 */
function* fetchDoges({ payload: { cursor, count, filterValue, sortValue } }) {
  const dogeIDs = (yield call(
    arbitrablePermissionList.methods.queryItems(
      cursor,
      count,
      dogeConstants.FILTER_OPTIONS_ENUM.values.map((_, i) =>
        filterValue.includes(i)
      ),
      sortValue
    ).call
  )).filter(
    ID =>
      ID !==
      '0x0000000000000000000000000000000000000000000000000000000000000000'
  )

  return yield all(dogeIDs.map(ID => call(fetchDoge, { payload: { ID } })))
}

/**
 * Submits a doge to the list.
 * @param {{ type: string, payload: ?object, meta: ?object }} action - The action object.
 * @returns {object} - The `lessdux` collection mod object for updating the list of doges.
 */
function* createDoge({ payload: { imageFileDataURL } }) {
  const ID = web3.utils.keccak256(imageFileDataURL)

  // Add to contract if absent
  if (Number((yield call(fetchDoge, { payload: { ID } }))._status) === 0)
    yield call(arbitrablePermissionList.methods.requestRegistering(ID).send, {
      from: yield select(walletSelectors.getAccount),
      value: yield select(arbitrablePermissionListSelectors.getSubmitCost)
    })

  // Upload image
  yield call(fetch, IMAGE_UPLOAD_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ payload: { imageFileDataURL } })
  })

  return {
    collection: dogeActions.doges.self,
    resource: yield call(fetchDoge, { payload: { ID } })
  }
}

/**
 * Fetches a doge from the list.
 * @param {{ type: string, payload: ?object, meta: ?object }} action - The action object.
 * @returns {object} - The fetched doge.
 */
function* fetchDoge({ payload: { ID } }) {
  const doge = yield call(arbitrablePermissionList.methods.items(ID).call)

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

  return {
    ID,
    status,
    _status: doge.status,
    lastAction: doge.lastAction ? new Date(Number(doge.lastAction)) : null,
    submitter: doge.submitter,
    challenger: doge.challenger,
    balance: String(doge.balance),
    disputed: doge.disputed,
    disputeID: doge.disputeID
  }
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
    'create',
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
}
