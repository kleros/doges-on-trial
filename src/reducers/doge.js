import PropTypes from 'prop-types'
import createReducer, { createResource } from 'lessdux'

// Common Shapes
export const _dogeShape = PropTypes.shape({
  ID: PropTypes.string.isRequired,
  lastAction: PropTypes.instanceOf(Date),
  submitter: PropTypes.string.isRequired,
  challenger: PropTypes.string.isRequired,
  balance: PropTypes.number.isRequired,
  disputed: PropTypes.bool.isRequired,
  disputeID: PropTypes.string.isRequired
})
export const _dogesShape = PropTypes.arrayOf(_dogeShape.isRequired)

// Shapes
const { shape: dogesShape, initialState: dogesInitialState } = createResource(
  _dogesShape
)
const { shape: dogeShape, initialState: dogeInitialState } = createResource(
  _dogeShape
)
export { dogesShape, dogeShape }

// Reducer
export default createReducer({
  doges: dogesInitialState,
  doge: dogeInitialState
})
