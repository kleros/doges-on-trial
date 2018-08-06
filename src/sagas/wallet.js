import { takeLatest, select, call } from 'redux-saga/effects'

import * as walletSelectors from '../reducers/wallet'
import * as walletActions from '../actions/wallet'
import { lessduxSaga } from '../utils/saga'
import { web3, PATCH_USER_SETTINGS_URL } from '../bootstrap/dapp-api'

/**
 * Fetches the current wallet's accounts.
 * @returns {string[]} - The accounts.
 */
function* fetchAccounts() {
  return yield call(web3.eth.getAccounts)
}

/**
 * Fetches the current wallet's ethereum balance.
 * @returns {string} - The balance.
 */
function* fetchBalance() {
  const balance = yield call(
    web3.eth.getBalance,
    yield select(walletSelectors.getAccount)
  )

  return String(balance)
}

/**
 * Updates the current wallet settings' email.
 * @param {{ type: string, payload: ?object, meta: ?object }} action - The action object.
 * @returns {object} - The updated settings object.
 */
function* updateEmail({ payload: { email } }) {
  // Prepare and sign update
  const address = yield select(walletSelectors.getAccount)
  const settings = { email: { S: email } }
  const signature = yield call(
    web3.eth.personal.sign,
    JSON.stringify(settings),
    address
  )

  // Send update
  const newSettings = yield call(fetch, PATCH_USER_SETTINGS_URL, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ payload: { address, settings, signature } })
  })

  // Return new settings
  return {
    email: (yield call(() => newSettings.json())).payload.settings.Attributes
      .email.S
  }
}

/**
 * The root of the wallet saga.
 */
export default function* walletSaga() {
  // Accounts
  yield takeLatest(
    walletActions.accounts.FETCH,
    lessduxSaga,
    'fetch',
    walletActions.accounts,
    fetchAccounts
  )

  // Balance
  yield takeLatest(
    walletActions.balance.FETCH,
    lessduxSaga,
    'fetch',
    walletActions.balance,
    fetchBalance
  )

  // Settings
  yield takeLatest(
    walletActions.settings.UPDATE_EMAIL,
    lessduxSaga,
    'update',
    walletActions.settings,
    updateEmail
  )
}
