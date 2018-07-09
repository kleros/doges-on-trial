import React from 'react'
import { storiesOf } from '@storybook/react'

import DogeImage from '../src/components/doge-image'
import doge from '../src/assets/images/doge.jpg'
import * as dogeConstants from '../src/constants/doge'

const createRenderDogeImageStory = status => () => (
  <DogeImage status={status} imageSrc={doge} />
)

storiesOf('Doge Image', module)
  .add('pending', createRenderDogeImageStory(dogeConstants.STATUS_ENUM.Pending))
  .add(
    'challenged',
    createRenderDogeImageStory(dogeConstants.STATUS_ENUM.Challenged)
  )
  .add(
    'accepted',
    createRenderDogeImageStory(dogeConstants.STATUS_ENUM.Accepted)
  )
  .add(
    'rejected',
    createRenderDogeImageStory(dogeConstants.STATUS_ENUM.Rejected)
  )
