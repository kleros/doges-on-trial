import PropTypes from 'prop-types'
import createReducer, { createResource } from 'lessdux'

import { web3 } from '../bootstrap/dapp-api'

// Shapes
const {
  shape: arbitrablePermissionListDataShape,
  initialState: arbitrablePermissionListDataInitialState
} = createResource(
  PropTypes.shape({
    arbitrator: PropTypes.string.isRequired,
    stake: PropTypes.string.isRequired,
    timeToChallenge: PropTypes.number.isRequired,
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
export const getAppealCost = state =>
  state.arbitrablePermissionList.arbitrablePermissionListData.data &&
  state.arbitrablePermissionList.arbitrablePermissionListData.data.appealCost
