import React from 'react'
import ReactDOM from 'react-dom'

import configureStore from './bootstrap/configure-store'
import App from './bootstrap/app'
import registerServiceWorker from './bootstrap/register-service-worker'
import { arbitrablePermissionList } from './bootstrap/dapp-api'

const { store, history } = configureStore()
export default store

const render = Component => {
  ReactDOM.render(
    <Component
      key={process.env.NODE_ENV === 'development' ? Math.random() : undefined}
      store={store}
      history={history}
    />,
    document.getElementById('root')
  )
}
render(App)
registerServiceWorker()

window.addEventListener('unload', () =>
  localStorage.setItem(
    arbitrablePermissionList.options.address + 'notifications',
    JSON.stringify(store.getState().notification.notifications.data)
  )
)

if (module.hot)
  module.hot.accept('./bootstrap/app', () => {
    render(App)
  })
