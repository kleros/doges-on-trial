import createEnum from '../utils/create-enum'

// Doge
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
export const SORT_OPTIONS_ENUM = createEnum([
  'Newest',
  'Oldest',
  'Challenges ↑',
  'Challenges ↓'
])
