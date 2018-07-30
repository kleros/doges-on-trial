import { createActions } from 'lessdux'

/* Actions */

// Arbitrable Permission List Data
export const arbitrablePermissionListData = createActions(
  'ARBITRABLE_PERMISSION_LIST_DATA'
)

/* Action Creators */

// Arbitrable Permission List Data
export const fetchArbitrablePermissionListData = () => ({
  type: arbitrablePermissionListData.FETCH
})
