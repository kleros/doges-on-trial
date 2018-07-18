import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import TimeAgo from 'timeago-react'

import * as notificationSelectors from '../../reducers/notification'

import './notification-badge.css'

export default class NotificationBadge extends PureComponent {
  static propTypes = {
    // State
    children: PropTypes.node.isRequired,
    notifications: notificationSelectors.notificationsShape.isRequired,
    maxShown: PropTypes.number,

    // Handlers
    onNotificationClick: PropTypes.func.isRequired,
    onShowAll: PropTypes.func
  }

  static defaultProps = {
    // State
    maxShown: null,

    // Handlers
    onShowAll: null
  }

  state = { isOpen: false }

  timeout = null

  componentWillUnmount() {
    clearTimeout(this.timeout)
  }

  handleMouseEnter = () => {
    clearTimeout(this.timeout)
    this.setState({ isOpen: true })
  }

  handleMouseLeave = () =>
    (this.timeout = setTimeout(() => this.setState({ isOpen: false }), 750))

  render() {
    const {
      children,
      notifications,
      maxShown,
      onNotificationClick,
      onShowAll
    } = this.props
    const { isOpen } = this.state
    if (!notifications.data) return null

    const useMaxShown = maxShown && notifications.data.length > maxShown
    return (
      <div className="NotificationBadge">
        {children}
        {notifications.data.length > 0 && (
          <div
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
            className="NotificationBadge-badge"
          >
            {notifications.data.length}
          </div>
        )}
        {isOpen && (
          <div
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
            className="NotificationBadge-notifications"
          >
            {(useMaxShown
              ? notifications.data.slice(0, maxShown)
              : notifications.data
            ).map(n => (
              <div
                key={n.ID}
                id={n.ID}
                onClick={onNotificationClick}
                className="NotificationBadge-notifications-notification"
              >
                <img
                  src={n.thumbnailURL}
                  alt="Notification Thumbnail"
                  className="NotificationBadge-notifications-notification-thumbnail"
                />
                <div className="NotificationBadge-notifications-notification-content">
                  {n.message}
                  <br />
                  <small>
                    <TimeAgo datetime={n.date} />
                  </small>
                </div>
              </div>
            ))}
            {useMaxShown && (
              <div
                onClick={onShowAll}
                className="NotificationBadge-notifications-showAll"
              >
                <small>SHOW ALL</small>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
}
