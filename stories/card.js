import React from 'react'
import { storiesOf } from '@storybook/react'

import Card from '../src/components/card'

storiesOf('Card', module).add('default', () => <Card>This is a card.</Card>)
