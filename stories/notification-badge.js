import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import NotificationBadge from '../src/components/notification-badge'
import Identicon from '../src/components/identicon'
import doge from '../src/assets/images/doge.jpg'

const now = Date.now()
const notifications = [
  {
    id: '0',
    date: new Date(now),
    message: 'This is a notification.',
    thumbnailURL: doge
  },
  {
    id: '1',
    date: new Date(now - 8.64e7),
    message: 'This is a notification.',
    thumbnailURL: doge
  },
  {
    id: '2',
    date: new Date(now - 6.048e8),
    message: 'This is a notification.',
    thumbnailURL: doge
  },
  {
    id: '3',
    date: new Date(now - 2.628e9),
    message: 'This is a notification.',
    thumbnailURL: doge
  },
  {
    id: '4',
    date: new Date(now - 1.577e10),
    message: 'This is a notification.',
    thumbnailURL: doge
  }
]
const onNotificationClick = action('onNotificationClick')

storiesOf('Notification Badge', module)
  .add('default', () => (
    <NotificationBadge
      notifications={notifications}
      onNotificationClick={onNotificationClick}
    >
      <Identicon address="Placeholder" round />
    </NotificationBadge>
  ))
  .add('with a limit', () => (
    <NotificationBadge
      notifications={notifications}
      maxShown={4}
      onNotificationClick={onNotificationClick}
      onShowAll={action('onShowAll')}
    >
      <Identicon address="Placeholder" round />
    </NotificationBadge>
  ))
