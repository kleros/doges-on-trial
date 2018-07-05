import { takeLatest, call, all } from 'redux-saga/effects'

import * as dogeActions from '../actions/doge'
import { lessduxSaga } from '../utils/saga'
import { web3, arbitrablePermissionList } from '../bootstrap/dapp-api'
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
  balance: Number(web3.utils.fromWei(doge.balance)),
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
}
