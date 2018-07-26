import { takeLatest, call, all } from 'redux-saga/effects'

import * as arbitrablePermissionListActions from '../actions/arbitrable-permission-list'
import { lessduxSaga } from '../utils/saga'
import { arbitrablePermissionList, arbitrator } from '../bootstrap/dapp-api'
import * as dogeConstants from '../constants/doge'

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
    ),
    itemsCounts: call(arbitrablePermissionList.methods.itemsCounts().call)
  })

  arbitrator.options.address = d.arbitrator
  const arbitrationCost = yield call(
    arbitrator.methods.arbitrationCost('0x00').call
  )

  return {
    arbitrator: d.arbitrator,
    stake: String(d.stake),
    timeToChallenge: Number(d.timeToChallenge) * 1000,
    itemsCounts: dogeConstants.STATUS_ENUM.values.reduce((acc, value) => {
      acc[value] = Number(d.itemsCounts[value.toLowerCase()])
      return acc
    }, {}),
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
