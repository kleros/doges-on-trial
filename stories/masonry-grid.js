import React from 'react'
import { storiesOf } from '@storybook/react'

import MasonryGrid from '../src/components/masonry-grid'

const bricks = [...new Array(100)].map((_, i) => (
  <div
    key={i}
    className="MasonryGridStory-brick"
    style={{
      height: 100 + ((i ** i % 100) / 100) * 200
    }}
    masonryGridFilterValues={[i % 2 === 0 ? 'even' : 'odd']}
    masonryGridSortValues={{ index: i }}
  >
    BRICK {i}
  </div>
))

storiesOf('Masonry Grid', module)
  .add('default', () => (
    <MasonryGrid className="MasonryGridStory">{bricks}</MasonryGrid>
  ))
  .add('filter odds', () => (
    <MasonryGrid filter={['even']} className="MasonryGridStory">
      {bricks}
    </MasonryGrid>
  ))
  .add('filter evens', () => (
    <MasonryGrid filter={['odd']} className="MasonryGridStory">
      {bricks}
    </MasonryGrid>
  ))
  .add('sort ascending', () => (
    <MasonryGrid sort={{ index: 'ascending' }} className="MasonryGridStory">
      {bricks}
    </MasonryGrid>
  ))
  .add('sort descending', () => (
    <MasonryGrid sort={{ index: 'descending' }} className="MasonryGridStory">
      {bricks}
    </MasonryGrid>
  ))
