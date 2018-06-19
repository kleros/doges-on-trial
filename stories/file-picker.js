import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import FilePicker from '../src/components/file-picker'

storiesOf('File Picker', module).add('default', () => (
  <FilePicker multiple={false} onDropAccepted={action('onDropAccepted')} />
))
