import React from 'react'
import { storiesOf } from '@storybook/react'

import InfoCard from '../src/components/info-card'

storiesOf('Info Card', module).add('default', () => (
  <InfoCard message="THE OTHER PARTY HAS APPEALED THE COURT’S DECISION. PLEASE PAY YOUR PART OF THE APPEAL FEES TO AVOID LOSING THE DISPUTE." />
))
