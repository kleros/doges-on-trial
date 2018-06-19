import React from 'react'
import { storiesOf } from '@storybook/react'
import { withState } from '@dump247/storybook-state'

import Dropdown from '../src/components/dropdown'

storiesOf('Dropdown', module)
  .add(
    'radio',
    withState(
      {
        value: 0
      },
      store => (
        <Dropdown
          {...store.state}
          type="radio"
          options={['Newest', 'Oldest', 'Challenges ↑', 'Challenges ↓']}
          onChange={value => store.set({ value })} // eslint-disable-line react/jsx-no-bind
        />
      )
    )
  )
  .add(
    'checkbox',
    withState(
      {
        value: [0]
      },
      store => (
        <Dropdown
          {...store.state}
          type="checkbox"
          label="Filter"
          options={[
            { label: 'Pending', count: 2, color: '#0059ab' },
            { label: 'Challenged', count: 5, color: '#ffbe61' },
            { label: 'Accepted', count: 8, color: '#47cf73' },
            { label: 'Rejected', count: 1, color: '#ff364f' },
            { label: 'My Submissions', count: 2 },
            { label: 'My Challenges', count: 5 }
          ]}
          onChange={value => store.set({ value })} // eslint-disable-line react/jsx-no-bind
        />
      )
    )
  )
