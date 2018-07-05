import createEnum from '../utils/create-enum'

// Doge
export const IN_CONTRACT_STATUS_ENUM = createEnum([
  'Absent', // The item has never been submitted.
  'Cleared', // The item has been submitted and the dispute resolution process determined it should not be added or a clearing request has been submitted and not contested.
  'Resubmitted', // The item has been cleared but someone has resubmitted it.
  'Registered', // The item has been submitted and the dispute resolution process determined it should be added or the submission was never contested.
  'Submitted', // The item has been submitted.
  'ClearingRequested', // The item is registered, but someone has requested to remove it.
  'PreventiveClearingRequested' // The item has never been registered, but someone asked to clear it preemptively to avoid it being shown as not registered during the dispute resolution process.
])
export const STATUS_ENUM = createEnum([
  'Pending',
  'Challenged',
  'Accepted',
  'Rejected'
])
export const STATUS_COLOR_ENUM = createEnum([
  '#0059ab',
  '#ffbe61',
  '#47cf73',
  '#ff364f'
])

// Gallery Settings
export const FILTER_OPTIONS_ENUM = createEnum([
  ...STATUS_ENUM.values,
  'My Submissions',
  'My Challenges'
])
export const SORT_OPTIONS_ENUM = createEnum(['Newest', 'Oldest'])
