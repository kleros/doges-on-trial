import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Button from '../src/components/button'

const onClick = action('onClick')
const createRenderButtonStory = type => () => (
  <div>
    <Button onClick={onClick} type={type} size="small">
      CLICK ME
    </Button>
    &nbsp;&nbsp;&nbsp;
    <Button onClick={onClick} type={type} size="normal">
      CLICK ME
    </Button>
    &nbsp;&nbsp;&nbsp;
    <Button onClick={onClick} type={type} size="large">
      CLICK ME
    </Button>
  </div>
)

storiesOf('Button', module)
  .add('primary', createRenderButtonStory('primary'))
  .add('secondary', createRenderButtonStory('secondary'))
  .add('ternary', createRenderButtonStory('ternary'))
  .add('disabled', () => (
    <Button onClick={onClick} disabled>
      CLICK ME
    </Button>
  ))
  .add('with lots of text', () => (
    <Button onClick={onClick}>CLICK ME, CLICK ME, CLICK ME</Button>
  ))
