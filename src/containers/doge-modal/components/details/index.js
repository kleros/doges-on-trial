import React from 'react'
import { RenderIf } from 'lessdux'

import * as dogeSelectors from '../../../../reducers/doge'

import './details.css'

const Details = ({ doge }) => (
  <RenderIf
    resource={doge}
    loading="Loading doge..."
    done={doge.data && <div className="DogeModal-details">Details</div>}
    failedLoading="There was an error fetching the doge."
  />
)

Details.propTypes = {
  // State
  doge: dogeSelectors.dogeShape.isRequired
}

export default Details
