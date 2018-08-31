import React from 'react'
import { storiesOf } from '@storybook/react'

import Banner from '../src/components/banner'

storiesOf('Banner', module).add('default', () => (
  <Banner>This is a Banner.</Banner>
))
