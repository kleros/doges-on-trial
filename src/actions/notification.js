import { createActions } from 'lessdux'

/* Actions */

// Notifications
export const notifications = createActions('NOTIFICATIONS')

// Notification
export const notification = createActions('NOTIFICATION', {
  withCreate: true,
  withDelete: true
})

/* Action Creators */

// Notification
export const deleteNotification = ID => ({
  type: notification.DELETE,
  payload: { ID }
})
