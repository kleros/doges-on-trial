import PropTypes from 'prop-types'
import createReducer from 'lessdux'

import * as modalActions from '../actions/modal'
import * as modalConstants from '../constants/modal'

// Shapes
const openDogeModalShape = PropTypes.oneOf(
  modalConstants.DOGE_MODAL_ENUM.indexes
)
export { openDogeModalShape }

// Reducer
export default createReducer(
  {
    openDogeModal: null
  },
  {
    [modalActions.OPEN_DOGE_MODAL]: (state, { payload: { dogeModal } }) => ({
      ...state,
      openDogeModal: dogeModal
    }),
    [modalActions.CLOSE_DOGE_MODAL]: state => ({
      ...state,
      openDogeModal: null
    })
  }
)
