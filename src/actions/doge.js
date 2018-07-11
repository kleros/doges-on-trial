import { createActions } from 'lessdux'

/* Actions */

// Doges
export const doges = createActions('DOGES')

// Doge
export const doge = {
  ...createActions('DOGE', {
    withCreate: true,
    withUpdate: true
  }),
  EXECUTE_REQUEST: 'EXECUTE_DOGE_REQUEST',
  SUBMIT_CHALLENGE: 'SUBMIT_DOGE_CHALLENGE',
  APPEAL_RULING: 'APPEAL_DOGE_RULING',
  EXECUTE_RULING: 'EXECUTE_DOGE_RULING'
}

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
export const fetchDoge = (ID, withDisputeStatus) => ({
  type: doge.FETCH,
  payload: { ID, withDisputeStatus }
})
export const executeDogeRequest = ID => ({
  type: doge.EXECUTE_REQUEST,
  payload: { ID }
})
export const submitDogeChallenge = ID => ({
  type: doge.SUBMIT_CHALLENGE,
  payload: { ID }
})
export const appealDogeRuling = ID => ({
  type: doge.APPEAL_RULING,
  payload: { ID }
})
export const executeDogeRuling = ID => ({
  type: doge.EXECUTE_RULING,
  payload: { ID }
})
