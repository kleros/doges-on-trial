import React from 'react'
import { storiesOf } from '@storybook/react'

import DogeImage from '../src/components/doge-image'
import doge from '../src/assets/images/doge.jpg'

const createRenderDogeImageStory = status => () => (
  <DogeImage status={status} imageSrc={doge} />
)

storiesOf('Doge Image', module)
  .add('pending', createRenderDogeImageStory('pending'))
  .add('challenged', createRenderDogeImageStory('challenged'))
  .add('accepted', createRenderDogeImageStory('accepted'))
  .add('rejected', createRenderDogeImageStory('rejected'))
