import React from 'react'
import { storiesOf } from '@storybook/react'
import { withState } from '@dump247/storybook-state'

import Modal from '../src/components/modal'
import Button from '../src/components/button'

storiesOf('Modal', module).add(
  'default',
  withState({ isOpen: false }, store => (
    <div>
      <Modal
        {...store.state}
        onRequestClose={() => store.set({ isOpen: false })} // eslint-disable-line react/jsx-no-bind
      >
        This is a modal.
      </Modal>
      <Button
        onClick={() => store.set({ isOpen: true })} // eslint-disable-line react/jsx-no-bind
      >
        OPEN
      </Button>
    </div>
  ))
)
