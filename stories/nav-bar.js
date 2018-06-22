import React from 'react'
import { storiesOf } from '@storybook/react'

import NavBar from '../src/components/nav-bar'
import Button from '../src/components/button'

storiesOf('Nav Bar', module).add('default', () => (
  <div style={{ width: '700px' }}>
    <NavBar
      routes={[
        { title: 'Doges', to: '/' },
        { title: 'How it Works', to: '/how-it-works' },
        { title: 'Crypto Meme', to: '/crypto-meme' },
        { title: 'Twitterverse', to: 'https://twitter.com', isExternal: true }
      ]}
      extras={[
        <Button key="0" type="ternary" size="small">
          Submit Doge
        </Button>,
        <Button key="1" type="ternary" size="small">
          Identicon
        </Button>
      ]}
    />
  </div>
))
