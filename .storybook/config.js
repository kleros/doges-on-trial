import React from 'react'
import { configure, addDecorator } from '@storybook/react'
import { host } from 'storybook-host'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

import GlobalComponents from '../src/bootstrap/global-components'

import '../src/bootstrap/fontawesome'

import '../src/bootstrap/app.css'

// Storybook Host
addDecorator(
  host({
    title: 'Doges on Trial UI-Kit',
    align: 'center middle'
  })
)

// Integration Wrapper
const store = createStore(state => state)
addDecorator(story => (
  <Provider store={store}>
    <div>
      <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
      <GlobalComponents />
    </div>
  </Provider>
))

// Configure
configure(() => require('../stories/index.js'), module)
