import PropTypes from 'prop-types'
import createReducer, { createResource } from 'lessdux'

import { web3 } from '../bootstrap/dapp-api'
import * as dogeConstants from '../constants/doge'

// Shapes
const {
  shape: arbitrablePermissionListDataShape,
  initialState: arbitrablePermissionListDataInitialState
} = createResource(
  PropTypes.shape({
    arbitrator: PropTypes.string.isRequired,
    stake: PropTypes.string.isRequired,
    timeToChallenge: PropTypes.number.isRequired,
    itemsCounts: PropTypes.shape(
      dogeConstants.STATUS_ENUM.values.reduce((acc, value) => {
        acc[value] = PropTypes.number.isRequired
        return acc
      }, {})
    ).isRequired,
    arbitrationCost: PropTypes.string.isRequired
  })
)
export { arbitrablePermissionListDataShape }

// Reducer
export default createReducer({
  arbitrablePermissionListData: arbitrablePermissionListDataInitialState
})

// Selectors
export const getSubmitCost = state =>
  state.arbitrablePermissionList.arbitrablePermissionListData.data &&
  web3.utils
    .toBN(
      state.arbitrablePermissionList.arbitrablePermissionListData.data.stake
    )
    .add(
      web3.utils.toBN(
        state.arbitrablePermissionList.arbitrablePermissionListData.data
          .arbitrationCost
      )
    )
export const getTimeToChallenge = state =>
  state.arbitrablePermissionList.arbitrablePermissionListData.data &&
  state.arbitrablePermissionList.arbitrablePermissionListData.data
    .timeToChallenge
export const getAppealCost = state =>
  state.arbitrablePermissionList.arbitrablePermissionListData.data &&
  state.arbitrablePermissionList.arbitrablePermissionListData.data.appealCost
