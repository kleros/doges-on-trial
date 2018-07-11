import { call, put } from 'redux-saga/effects'

import { action as _action, errorAction } from './action'

/**
 * Calls a saga with the `lessdux` flow.
 * @param {string|{ collection: string, updating: function, find: function }} flowOrUpdateCollectionMod - The `lessdux` flow that should be used, (create, fetch, update, delete) or an object with the data for updating a collection.
 * @param {object} resourceActions - The `lessdux` resource actions object.
 * @param {object} saga - The saga being called.
 * @param {{ type: string, payload: ?object, meta: ?object }} action - The action object that triggered the saga.
 */
export function* lessduxSaga(
  flowOrUpdateCollectionMod,
  resourceActions,
  saga,
  action
) {
  let receiveWord
  let failWord
  switch (
    flowOrUpdateCollectionMod.collection ? 'update' : flowOrUpdateCollectionMod
  ) {
    case 'create':
      receiveWord = '_CREATED'
      failWord = '_CREATE'
      break
    case 'fetch':
      receiveWord = ''
      failWord = '_FETCH'
      break
    case 'update':
      receiveWord = '_UPDATED'
      failWord = '_UPDATE'
      yield put(
        _action(
          resourceActions.UPDATE, // Updates are not called directly so call it here to set .updating on the resource
          flowOrUpdateCollectionMod.collection
            ? {
                collectionMod: {
                  collection: flowOrUpdateCollectionMod.collection,
                  updating: [flowOrUpdateCollectionMod.updating(action)]
                }
              }
            : undefined
        )
      )
      break
    case 'delete':
      receiveWord = '_DELETED'
      failWord = '_DELETE'
      break
    default:
      throw new TypeError('Invalid lessdux flow.')
  }

  try {
    const result = flowOrUpdateCollectionMod.collection
      ? {
          collection: flowOrUpdateCollectionMod.collection,
          resource: yield call(saga, action),
          find: flowOrUpdateCollectionMod.find(action),
          updating: flowOrUpdateCollectionMod.updating(action)
        }
      : yield call(saga, action)

    yield put(
      _action(resourceActions['RECEIVE' + receiveWord], {
        [result.collection ? 'collectionMod' : resourceActions.self]: result
      })
    )
  } catch (err) {
    err.message &&
      console.info(
        'Your connection is unstable, please check your network and refresh the page.'
      )
    yield put(
      errorAction(
        resourceActions['FAIL' + failWord],
        flowOrUpdateCollectionMod.collection
          ? {
              collectionMod: {
                collection: flowOrUpdateCollectionMod.collection,
                updating: flowOrUpdateCollectionMod.updating(action)
              }
            }
          : err
      )
    )
  }
}
