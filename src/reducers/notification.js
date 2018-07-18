import PropTypes from 'prop-types'
import createReducer, { createResource } from 'lessdux'

// Common Shapes
export const _notificationShape = PropTypes.shape({
  ID: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  message: PropTypes.string.isRequired,
  thumbnailURL: PropTypes.string.isRequired
})
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
const cachedNotifications = localStorage.getItem('notifications')
export default createReducer({
  notifications: {
    ...notificationsInitialState,
    data: cachedNotifications
      ? JSON.parse(cachedNotifications).map(n => ({
          ...n,
          date: new Date(n.date)
        }))
      : []
  },
  notification: notificationInitialState
})
