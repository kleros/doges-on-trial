import React from 'react'
import ReactTooltip from 'react-tooltip'

import DogeModal from '../containers/doge-modal'

export default () => (
  <div>
    <ReactTooltip multiline className="Tooltip" html />
    {process.env.NODE_ENV !== 'test' && <DogeModal />}
  </div>
)
