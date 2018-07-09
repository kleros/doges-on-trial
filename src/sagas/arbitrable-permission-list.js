import { takeLatest, call, all } from 'redux-saga/effects'

import * as arbitrablePermissionListActions from '../actions/arbitrable-permission-list'
import { lessduxSaga } from '../utils/saga'
import { arbitrablePermissionList, arbitrator } from '../bootstrap/dapp-api'

/**
 * Fetches the arbitrable permission list's data.
 * @param {{ type: string, payload: ?object, meta: ?object }} action - The action object.
 * @returns {object} - The fetched data.
 */
export function* fetchArbitrablePermissionListData() {
  const d = yield all({
    arbitrator: call(arbitrablePermissionList.methods.arbitrator().call),
    stake: call(arbitrablePermissionList.methods.stake().call),
    timeToChallenge: call(
      arbitrablePermissionList.methods.timeToChallenge().call
    )
  })

  arbitrator.options.address = d.arbitrator
  const arbitrationCost = yield call(
    arbitrator.methods.arbitrationCost('0x00').call
  )

  return {
    arbitrator: d.arbitrator,
    stake: String(d.stake),
    timeToChallenge: Number(d.timeToChallenge) * 1000,
    arbitrationCost: String(arbitrationCost)
  }
}

/**
 * The root of the arbitrable permission list saga.
 */
export default function* arbitrablePermissionListSaga() {
  // Arbitrable Permission List Data
  yield takeLatest(
    arbitrablePermissionListActions.arbitrablePermissionListData.FETCH,
    lessduxSaga,
    'fetch',
    arbitrablePermissionListActions.arbitrablePermissionListData,
    fetchArbitrablePermissionListData
  )
}
