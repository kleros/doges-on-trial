import { createActions } from 'lessdux'

/* Actions */

// Doges
export const doges = createActions('DOGES')

/* Action Creators */

// Doges
export const fetchDoges = (cursor, count, filterValue, sortValue) => ({
  type: doges.FETCH,
  payload: { cursor, count, filterValue, sortValue }
})
