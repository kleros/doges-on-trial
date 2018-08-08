import React from 'react'
import { storiesOf } from '@storybook/react'

import ValueList from '../src/components/value-list'
import doge from '../src/assets/images/doge.jpg'

storiesOf('Value List', module)
  .add('with icons', () => (
    <div style={{ width: '600px' }}>
      <ValueList
        items={[
          { label: 'At Stake', value: 0.00123, icon: doge },
          { label: 'Number of Challenges', value: 2, icon: doge },
          { label: 'Number of Appeals', value: 1, icon: doge }
        ]}
      />
    </div>
  ))
  .add('without icons', () => (
    <div style={{ width: '500px' }}>
      <ValueList items={[{ label: 'Deposit', value: 0.00123 }]} />
    </div>
  ))
