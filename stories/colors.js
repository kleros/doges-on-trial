import React from 'react'
import { storiesOf } from '@storybook/react'

const createRenderColorStory = colors => () => (
  <div
    style={{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center'
    }}
  >
    {colors.map(c => (
      <div
        key={c.variableName}
        style={{
          background: c.hexCode,
          border: '2px solid $mint',
          borderRadius: '5px',
          height: '80px',
          margin: '40px',
          position: 'relative',
          width: '80px'
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '110%'
          }}
        >
          {c.name}
          <div style={{ color: '#a3a2a5' }}>{c.hexCode}</div>
        </div>
      </div>
    ))}
  </div>
)

storiesOf('Colors', module)
  .add(
    'bases',
    createRenderColorStory([
      {
        variableName: 'absoluteBlack',
        name: 'ABSOLUTE BLACK',
        hexCode: '#000'
      },
      {
        variableName: 'grey',
        name: 'GREY',
        hexCode: '#3D464D'
      },
      {
        variableName: 'lightGrey',
        name: 'LIGHT GREY',
        hexCode: '#A3A2A5'
      },
      {
        variableName: 'darkGrey',
        name: 'DARK GREY',
        hexCode: '#47525D'
      },
      {
        variableName: 'darkestGrey',
        name: 'DARKEST GREY',
        hexCode: '#1A1B23'
      },
      {
        variableName: 'mint',
        name: 'MINT',
        hexCode: '#F5F8FA'
      },
      {
        variableName: 'green',
        name: 'GREEN',
        hexCode: '#47CF73'
      },
      {
        variableName: 'red',
        name: 'RED',
        hexCode: '#FF364F'
      },
      {
        variableName: 'orange',
        name: 'ORANGE',
        hexCode: '#FFBE61'
      },
      {
        variableName: 'blue',
        name: 'BLUE',
        hexCode: '#0059AB'
      },
      {
        variableName: 'white',
        name: 'WHITE',
        hexCode: '#FFF'
      }
    ])
  )
  .add(
    'states',
    createRenderColorStory([
      { variableName: 'disabled', name: 'DISABLED', hexCode: '#47525D' },
      { variableName: 'info', name: 'INFO', hexCode: '#0059AB' },
      { variableName: 'warning', name: 'WARNING', hexCode: '#FFBE61' },
      { variableName: 'success', name: 'SUCCESS', hexCode: '#47CF73' },
      { variableName: 'error', name: 'ERROR', hexCode: '#FF364F' }
    ])
  )
  .add(
    'typography',
    createRenderColorStory([
      { variableName: 'heading', name: 'HEADING', hexCode: '#1A1B23' },
      { variableName: 'text', name: 'TEXT', hexCode: '#3D464D' },
      { variableName: 'lightText', name: 'LIGHT TEXT', hexCode: '#A3A2A5' },
      { variableName: 'mediumText', name: 'MEDIUM TEXT', hexCode: '#47525D' },
      {
        variableName: 'darkText',
        name: 'DARK TEXT',
        hexCode: '#1A1B23'
      },
      {
        variableName: 'invertedText',
        name: 'INVERTED TEXT',
        hexCode: '#FFF'
      }
    ])
  )
  .add(
    'backgrounds',
    createRenderColorStory([
      { variableName: 'background', name: 'BACKGROUND', hexCode: '#FFF' }
    ])
  )
