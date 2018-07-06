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

// Parsers
const parseDogeStatus = (dogeStatus, disputed) => {
  if (disputed) return dogeConstants.STATUS_ENUM.Challenged
  switch (Number(dogeStatus)) {
    case dogeConstants.IN_CONTRACT_STATUS_ENUM.Resubmitted:
    case dogeConstants.IN_CONTRACT_STATUS_ENUM.Submitted:
      return dogeConstants.STATUS_ENUM.Pending
    case dogeConstants.IN_CONTRACT_STATUS_ENUM.Registered:
      return dogeConstants.STATUS_ENUM.Accepted
    case dogeConstants.IN_CONTRACT_STATUS_ENUM.Cleared:
      return dogeConstants.STATUS_ENUM.Rejected
    default:
      throw new Error('Invalid doge status.')
  }
}
const parseDoge = (doge, ID) => ({
  ID,
  status: parseDogeStatus(doge.status, doge.disputed),
  lastAction: doge.lastAction ? new Date(Number(doge.lastAction)) : null,
  submitter: doge.submitter,
  challenger: doge.challenger,
  balance: String(doge.balance),
  disputed: doge.disputed,
  disputeID: doge.disputeID
})

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

  return (yield all(
    dogeIDs.map(ID => call(arbitrablePermissionList.methods.items(ID).call))
  )).map((doge, i) => parseDoge(doge, dogeIDs[i]))
}

/**
 * Submits a doge to the list.
 * @param {{ type: string, payload: ?object, meta: ?object }} action - The action object.
 * @returns {object} - The `lessdux` collection mod object for updating the list of doges.
 */
function* createDoge({ payload: { imageFileDataURL } }) {
  const hash = web3.utils.keccak256(imageFileDataURL)

  // Add to contract if absent
  if (
    Number(
      (yield call(arbitrablePermissionList.methods.items(hash).call)).status
    ) === 0
  )
    yield call(arbitrablePermissionList.methods.requestRegistering(hash).send, {
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
    resource: parseDoge(
      yield call(arbitrablePermissionList.methods.items(hash).call),
      hash
    )
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
}
