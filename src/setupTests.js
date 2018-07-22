// eslint-disable-next-line unicorn/filename-case
import React from 'react'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import timezoneMock from 'timezone-mock'

import 'jest-enzyme'

// Configure
configure({ adapter: new Adapter() })

// Mock Modules
jest.mock('./components/identicon', () => () => <div>[Identicon]</div>)
jest.mock('./components/modal', () => () => <div>[Modal]</div>)
jest.mock('./containers/doge-modal', () => () => <div>[DogeModal]</div>)

// Mock Globals
Date.now = jest.fn(() => 1516916214006)
global.localStorage = {
  getItem() {},
  setItem() {}
}

// Mock Time
timezoneMock.register('UTC')
