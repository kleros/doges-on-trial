import React from 'react'
import { storiesOf } from '@storybook/react'

import Identicon from '../src/components/identicon'

storiesOf('Identicon', module)
  .add('default', () => <Identicon address="Placeholder" />)
  .add('round', () => <Identicon address="Placeholder" round />)
