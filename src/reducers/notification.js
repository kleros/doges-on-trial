import PropTypes from 'prop-types'
import createReducer, { createResource } from 'lessdux'

// Common Shapes
export const _notificationShape = PropTypes.shape({})
export const _notificationsShape = PropTypes.arrayOf(
  _notificationShape.isRequired
)

// Shapes
const {
  shape: notificationsShape,
  initialState: notificationsInitialState
} = createResource(_notificationsShape)
const {
  shape: notificationShape,
  initialState: notificationInitialState
} = createResource(_notificationShape, { withCreate: true, withDelete: true })
export { notificationsShape, notificationShape }

// Reducer
export default createReducer({
  notifications: notificationsInitialState,
  notification: notificationInitialState
})
