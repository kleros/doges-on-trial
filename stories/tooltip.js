import React from 'react'
import { storiesOf } from '@storybook/react'

storiesOf('Tooltip', module).add('default', () => (
  <div
    style={{ background: '#f5f8fa', height: '50px', width: '50px' }}
    data-tip="This is a tooltip."
  />
))
