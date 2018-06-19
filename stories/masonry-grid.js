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
const createRenderMasonryGridStory = ({ filter, sort } = {}) => () => (
  <MasonryGrid filter={filter} sort={sort} className="MasonryGridStory">
    {bricks}
  </MasonryGrid>
)

storiesOf('Masonry Grid', module)
  .add('default', createRenderMasonryGridStory())
  .add('filter odds', createRenderMasonryGridStory({ filter: ['even'] }))
  .add('filter evens', createRenderMasonryGridStory({ filter: ['odd'] }))
  .add(
    'sort ascending',
    createRenderMasonryGridStory({ sort: { index: 'ascending' } })
  )
  .add(
    'sort descending',
    createRenderMasonryGridStory({ sort: { index: 'descending' } })
  )
