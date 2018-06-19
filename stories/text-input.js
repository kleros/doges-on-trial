import React from 'react'
import { storiesOf } from '@storybook/react'
import { withState } from '@dump247/storybook-state'
import { action } from '@storybook/addon-actions'

import TextInput from '../src/components/text-input'

const onBlur = action('onBlur')
const createRenderTextInputStory = ({ valid, touched, error } = {}) =>
  withState(
    {
      input: { value: '', onBlur, onChange: null },
      meta: { valid, touched, error },
      placeholder: 'EMAIL'
    },
    store => (
      <TextInput
        {...store.state}
        input={{
          ...store.state.input,
          onChange: event =>
            store.set({
              input: {
                value: event.currentTarget.value,
                onBlur: null,
                onChange: null
              }
            })
        }}
      />
    )
  )

storiesOf('Text Input', module)
  .add('default', createRenderTextInputStory())
  .add('touched', createRenderTextInputStory({ touched: true }))
  .add('valid', createRenderTextInputStory({ valid: true }))
  .add(
    'error',
    createRenderTextInputStory({
      error: 'Please enter a valid email.'
    })
  )
