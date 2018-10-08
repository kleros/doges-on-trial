import { createActions } from 'lessdux'

/* Actions */

// Accounts
export const accounts = createActions('ACCOUNTS')

// Balance
export const balance = createActions('BALANCE')

// Settings
export const settings = {
  ...createActions('SETTINGS', { withUpdate: true }),
  UPDATE_EMAIL: 'UPDATE_SETTINGS_EMAIL',
  UPDATE_DOGECOIN_ADDRESS: 'UPDATE_DOGECOIN_ADDRESS'
}

/* Action Creators */

// Accounts
export const fetchAccounts = () => ({ type: accounts.FETCH })

// Balance
export const fetchBalance = () => ({ type: balance.FETCH })

// Settings
export const updateEmail = ({ email }) => ({
  type: settings.UPDATE_EMAIL,
  payload: { email }
})
export const updateDogecoinAddress = ({ dogecoinAddress }) => ({
  type: settings.UPDATE_DOGECOIN_ADDRESS,
  payload: { dogecoinAddress }
})
