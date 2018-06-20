import React, { PureComponent, Children } from 'react'
import PropTypes from 'prop-types'
import memoizeOne from 'memoize-one'
import Bricks from 'bricks.js'

import './masonry-grid.css'

export default class MasonryGrid extends PureComponent {
  static propTypes = {
    // State
    children: PropTypes.arrayOf(PropTypes.element.isRequired).isRequired,
    filter: PropTypes.arrayOf(PropTypes.string.isRequired),
    sort: PropTypes.objectOf(
      PropTypes.oneOf(['ascending', 'descending']).isRequired
    ),

    // Modifiers
    sizes: PropTypes.arrayOf(
      PropTypes.shape({
        mq: PropTypes.string,
        columns: PropTypes.number.isRequired,
        gutter: PropTypes.number.isRequired
      }).isRequired
    ),
    className: PropTypes.string,
    style: PropTypes.shape({})
  }

  static defaultProps = {
    // State
    filter: null,
    sort: null,

    // Modifiers
    sizes: [
      { columns: 2, gutter: 10 },
      { mq: '768px', columns: 3, gutter: 25 },
      { mq: '1024px', columns: 4, gutter: 50 }
    ],
    className: '',
    style: undefined
  }

  ref = React.createRef()
  bricks = null

  componentDidMount() {
    if (process.env.NODE_ENV === 'test') return
    const { sizes } = this.props

    this.bricks = Bricks({
      container: this.ref.current,
      packed: 'packed',
      sizes
    })
    this.bricks.resize(true)
    this.bricks.pack()
  }

  filter = memoizeOne((children, filter) => {
    console.info('MasonryGrid filter cache miss.')
    if (!filter || filter.length === 0) return children

    return Children.map(
      children,
      child =>
        child.props.masonryGridFilterValues.some(filterValue =>
          filter.includes(filterValue)
        )
          ? child
          : null
    )
  })

  sort = memoizeOne((children, sort) => {
    console.info('MasonryGrid sort cache miss.')
    if (!sort || sort.length === 0) return children

    const sortKeys = Object.keys(sort)
    const defaultSortValues = sortKeys.reduce((acc, sortKey) => {
      acc[sortKey] = 0
      return acc
    }, {})

    return Children.toArray(children).sort((childA, childB) => {
      const childASortValues = {
        ...defaultSortValues,
        ...childA.props.masonryGridSortValues
      }
      const childBSortValues = {
        ...defaultSortValues,
        ...childB.props.masonryGridSortValues
      }

      for (const sortKey of sortKeys) {
        const diff = childASortValues[sortKey] - childBSortValues[sortKey]
        if (diff === 0) continue

        return sort[sortKey] === 'ascending' ? diff : -diff
      }

      return 0
    })
  })

  updatePacking = memoizeOne(children => {
    console.info('MasonryGrid updatePacking cache miss.')
    this.bricks && this.bricks.update()
    return children
  })

  render() {
    const { children, filter, sort, className, style } = this.props
    return (
      <div ref={this.ref} className={`MasonryGrid ${className}`} style={style}>
        {this.updatePacking(this.sort(this.filter(children, filter), sort))}
      </div>
    )
  }
}
