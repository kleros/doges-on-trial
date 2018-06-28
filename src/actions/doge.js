import { createActions } from 'lessdux'

/* Actions */

// Doges
export const doges = createActions('DOGES')

/* Action Creators */

// Doges
export const fetchDoges = () => ({ type: doges.FETCH })
