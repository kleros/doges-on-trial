import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Img from 'react-image'
import { DotLoader } from 'react-spinners'

import * as dogeConstants from '../../constants/doge'

import './doge-card.css'

class DogeCardImageLoader extends PureComponent {
  static propTypes = {
    // State
    failed: PropTypes.bool,

    // Callbacks
    debouncedUpdatePacking: PropTypes.func
  }

  static defaultProps = {
    // State
    failed: false,

    // Callbacks
    debouncedUpdatePacking: null
  }

  componentWillUnmount() {
    const { debouncedUpdatePacking } = this.props
    if (debouncedUpdatePacking) {
      debouncedUpdatePacking()
      console.info('debouncedUpdatePacking called.')
    }
  }

  render() {
    const { failed } = this.props
    return (
      <div className="DogeCard-image-loader">
        {failed ? (
          'There was an error fetching the image or it has not been uploaded properly. Try submitting it again.'
        ) : (
          <DotLoader color="#3d464d" />
        )}
      </div>
    )
  }
}
const DogeCard = ({
  id,
  status,
  imageSrc,
  onClick,
  debouncedUpdatePacking
}) => (
  <div
    id={id}
    onClick={onClick}
    className={`DogeCard DogeCard--${status.toLowerCase()}`}
  >
    <Img
      src={imageSrc}
      alt={`Doge List Submission`}
      loader={
        <DogeCardImageLoader debouncedUpdatePacking={debouncedUpdatePacking} />
      }
      unloader={<DogeCardImageLoader failed />}
      className="DogeCard-image"
    />
    <div
      className="DogeCard-tag"
      data-tip={
        {
          Pending:
            "This image can still be challenged. If you think it's not a doge, challenge it!",
          Challenged:
            'This image is currently being challenged. Stay tuned for the ruling!',
          Accepted:
            'This image has been accepted into the list and can no longer be challenged.',
          Rejected: 'This image has been rejected from the list.'
        }[status]
      }
    >
      ?
    </div>
    <div className="DogeCard-label">{status.toUpperCase()}</div>
  </div>
)

DogeCard.propTypes = {
  // State
  id: PropTypes.string.isRequired,
  status: PropTypes.oneOf(dogeConstants.STATUS_ENUM.values).isRequired,
  imageSrc: PropTypes.string.isRequired,

  // Handlers
  onClick: PropTypes.func.isRequired,

  // Callbacks
  debouncedUpdatePacking: PropTypes.func
}

DogeCard.defaultProps = {
  // Callbacks
  debouncedUpdatePacking: null
}

export default DogeCard
