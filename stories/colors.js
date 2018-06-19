import React from 'react'
import { storiesOf } from '@storybook/react'

const createRenderColorStory = colors => () => (
  <div className="ColorsStory">
    {colors.map(c => (
      <div
        key={c.variableName}
        className={`ColorsStory-block ColorsStory-block--${c.variableName}`}
      >
        <div className="ColorsStory-block-label">
          {c.name}{' '}
          <div className="ColorsStory-block-label-hexCode">{c.hexCode}</div>
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
        variableName: 'darkGrey',
        name: 'DARK GREY',
        hexCode: '#47525D'
      },
      {
        variableName: 'lightGrey',
        name: 'LIGHT GREY',
        hexCode: '#A3A2A5'
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
      },
      {
        variableName: 'darkText',
        name: 'DARK TEXT',
        hexCode: '#1A1B23'
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
