import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import DogeCard from '../src/components/doge-card'
import doge from '../src/assets/images/doge.jpg'

const onClick = action('onClick')
const createRenderDogeCardStory = status => () => (
  <DogeCard id={1} status={status} imageSrc={doge} onClick={onClick} />
)

storiesOf('Doge Card', module)
  .add('pending', createRenderDogeCardStory('Pending'))
  .add('challenged', createRenderDogeCardStory('Challenged'))
  .add('accepted', createRenderDogeCardStory('Accepted'))
  .add('rejected', createRenderDogeCardStory('Rejected'))
