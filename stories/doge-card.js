import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import DogeCard from '../src/components/doge-card'
import doge from '../src/assets/images/doge.jpg'

storiesOf('Doge Card', module)
  .add('pending', () => (
    <DogeCard
      id={1}
      status="pending"
      imageSrc={doge}
      onClick={action('onClick')}
    />
  ))
  .add('challenged', () => (
    <DogeCard
      id={1}
      status="challenged"
      imageSrc={doge}
      onClick={action('onClick')}
    />
  ))
  .add('accepted', () => (
    <DogeCard
      id={1}
      status="accepted"
      imageSrc={doge}
      onClick={action('onClick')}
    />
  ))
  .add('rejected', () => (
    <DogeCard
      id={1}
      status="rejected"
      imageSrc={doge}
      onClick={action('onClick')}
    />
  ))
