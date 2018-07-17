import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import { reducer as form } from 'redux-form'

import wallet from './wallet'
import notification from './notification'
import arbitrablePermissionList from './arbitrable-permission-list'
import doge from './doge'
import modal from './modal'

// Export root reducer
export default combineReducers({
  router,
  form,
  wallet,
  notification,
  arbitrablePermissionList,
  doge,
  modal
})
