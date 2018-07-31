import PropTypes from 'prop-types'
import createReducer, { createResource } from 'lessdux'

import * as dogeConstants from '../constants/doge'

// Common Shapes
export const _dogeShape = PropTypes.shape({
  ID: PropTypes.string.isRequired,
  status: PropTypes.oneOf(dogeConstants.STATUS_ENUM.indexes).isRequired,
  lastAction: PropTypes.instanceOf(Date),
  submitter: PropTypes.string.isRequired,
  challenger: PropTypes.string.isRequired,
  balance: PropTypes.string.isRequired,
  disputed: PropTypes.bool.isRequired,
  disputeID: PropTypes.string.isRequired,
  disputeStatus: PropTypes.oneOf(dogeConstants.DISPUTE_STATUS_ENUM.indexes),
  appealCost: PropTypes.string
})
export const _dogesShape = PropTypes.arrayOf(_dogeShape.isRequired)

// Shapes
const { shape: dogesShape, initialState: dogesInitialState } = createResource(
  _dogesShape
)
const { shape: dogeShape, initialState: dogeInitialState } = createResource(
  _dogeShape,
  { withCreate: true, withUpdate: true }
)
export { dogesShape, dogeShape }

// Reducer
export default createReducer({
  doges: dogesInitialState,
  doge: dogeInitialState
})

// Selectors
export const getDoges = state => state.doge.doges.data
export const getDogeDisputeID = state =>
  state.doge.doge.data && state.doge.doge.data.disputeID
export const getDogeAppealCost = state =>
  state.doge.doge.data && state.doge.doge.data.appealCost
