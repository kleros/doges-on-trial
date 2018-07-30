import React from 'react'
import { storiesOf } from '@storybook/react'

import FAQGroup from '../src/components/faq-group'

storiesOf('FAQ Group', module).add('default', () => (
  <FAQGroup
    questions={[
      {
        question: 'Who are the direct users of Kleros?',
        answer:
          'In Kleros, we have two sides to the party. The arbitrators that rule on disputes and the arbitrable parties (we like this word) that create the disputes in the first place.'
      },
      {
        question: 'Who are the direct users of Kleros?',
        answer:
          'In Kleros, we have two sides to the party. The arbitrators that rule on disputes and the arbitrable parties (we like this word) that create the disputes in the first place.'
      },
      {
        question: 'Who are the direct users of Kleros?',
        answer:
          'In Kleros, we have two sides to the party. The arbitrators that rule on disputes and the arbitrable parties (we like this word) that create the disputes in the first place.'
      },
      {
        question: 'Who are the direct users of Kleros?',
        answer:
          'In Kleros, we have two sides to the party. The arbitrators that rule on disputes and the arbitrable parties (we like this word) that create the disputes in the first place.'
      }
    ]}
  />
))
