import { createActions } from 'lessdux'

/* Actions */

// Doges
export const doges = createActions('DOGES')

// Doge
export const doge = createActions('DOGE', { withCreate: true })

/* Action Creators */

// Doges
export const fetchDoges = (cursor, count, filterValue, sortValue) => ({
  type: doges.FETCH,
  payload: { cursor, count, filterValue, sortValue }
})

// Doge
export const createDoge = imageFileDataURL => ({
  type: doge.CREATE,
  payload: { imageFileDataURL }
})
