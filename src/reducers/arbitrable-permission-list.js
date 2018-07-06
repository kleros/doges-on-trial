import PropTypes from 'prop-types'
import createReducer, { createResource } from 'lessdux'

// Shapes
const {
  shape: arbitrablePermissionListDataShape,
  initialState: arbitrablePermissionListDataInitialState
} = createResource(
  PropTypes.shape({
    arbitrator: PropTypes.string.isRequired,
    stake: PropTypes.number.isRequired,
    timeToChallenge: PropTypes.number.isRequired,
    arbitrationCost: PropTypes.number.isRequired
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
  state.arbitrablePermissionList.arbitrablePermissionListData.data.stake +
    state.arbitrablePermissionList.arbitrablePermissionListData.data
      .arbitrationCost
