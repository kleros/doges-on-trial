import { takeLatest, call, all } from 'redux-saga/effects'

import * as dogeActions from '../actions/doge'
import { lessduxSaga } from '../utils/saga'
import { web3, arbitrablePermissionList } from '../bootstrap/dapp-api'
import * as dogeConstants from '../constants/doge'

// Parsers
const parseDoge = (doge, ID) => ({
  ID,
  lastAction: doge.lastAction ? new Date(doge.lastAction) : null,
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
  const dogeIDs = yield call(
    arbitrablePermissionList.methods.queryItems(
      cursor,
      count,
      dogeConstants.FILTER_OPTIONS_ENUM.values.map((_, i) =>
        filterValue.includes(i)
      ),
      sortValue
    ).call
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
