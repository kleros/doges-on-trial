import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Button from '../src/components/button'

const createRenderButtons = type => () => (
  <div>
    <Button onClick={action('onClick')} type={type} size="small">
      CLICK ME
    </Button>
    &nbsp;&nbsp;&nbsp;
    <Button onClick={action('onClick')} type={type} size="normal">
      CLICK ME
    </Button>
    &nbsp;&nbsp;&nbsp;
    <Button onClick={action('onClick')} type={type} size="large">
      CLICK ME
    </Button>
  </div>
)

storiesOf('Button', module)
  .add('primary', createRenderButtons('primary'))
  .add('secondary', createRenderButtons('secondary'))
  .add('ternary', createRenderButtons('ternary'))
  .add('disabled', () => (
    <Button onClick={action('onClick')} disabled>
      CLICK ME
    </Button>
  ))
  .add('with lots of text', () => (
    <Button onClick={action('onClick')}>CLICK ME, CLICK ME, CLICK ME</Button>
  ))
