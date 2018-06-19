import React from 'react'
import { storiesOf } from '@storybook/react'

import DogeCard from '../src/components/doge-card'
import doge from '../src/assets/images/doge.jpg'

storiesOf('Doge Card', module)
  .add('pending', () => <DogeCard id={1} status="pending" imageSrc={doge} />)
  .add('challenged', () => (
    <DogeCard id={1} status="challenged" imageSrc={doge} />
  ))
  .add('accepted', () => <DogeCard id={1} status="accepted" imageSrc={doge} />)
  .add('rejected', () => <DogeCard id={1} status="rejected" imageSrc={doge} />)
