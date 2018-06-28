import PropTypes from 'prop-types'
import createReducer, { createResource } from 'lessdux'

// Common Shapes
export const _dogeShape = PropTypes.shape({})
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
