/* Actions */

// Doge Modal
export const OPEN_DOGE_MODAL = 'OPEN_DOGE_MODAL'
export const CLOSE_DOGE_MODAL = 'CLOSE_DOGE_MODAL'

/* Action Creators */

// Doge Modal
export const openDogeModal = dogeModal => ({
  type: OPEN_DOGE_MODAL,
  payload: { dogeModal }
})
export const closeDogeModal = () => ({ type: CLOSE_DOGE_MODAL })
