import React, { PureComponent, Children } from 'react'
import PropTypes from 'prop-types'
import memoizeOne from 'memoize-one'
import Bricks from 'bricks.js'
import debounce from 'debounce'

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
      { columns: 1, gutter: 10 }, // 250px
      { mq: '510px', columns: 2, gutter: 10 },
      { mq: '770px', columns: 3, gutter: 10 },
      { mq: '1030px', columns: 4, gutter: 10 },
      { mq: '1290px', columns: 5, gutter: 10 },
      { mq: '1550px', columns: 6, gutter: 10 },
      { mq: '1810px', columns: 7, gutter: 10 },
      { mq: '2070px', columns: 8, gutter: 10 }
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
    setTimeout(() => this.bricks.pack(), 500)
  }

  filter = memoizeOne((children, filter) => {
    console.info('MasonryGrid filter cache miss.')
    if (!filter) return children

    const debouncedUpdatePacking = debounce(() =>
      setTimeout(() => this.bricks.pack(), 1000)
    )
    return Children.map(
      children,
      child =>
        child.props.masonryGridFilterValues.some(filterValue =>
          filter.includes(filterValue)
        )
          ? React.cloneElement(child, { debouncedUpdatePacking })
          : null
    )
  })

  sort = memoizeOne((children, sort) => {
    console.info('MasonryGrid sort cache miss.')
    if (!sort) return children

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
    this.bricks && setTimeout(() => this.bricks.pack(), 500)
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
