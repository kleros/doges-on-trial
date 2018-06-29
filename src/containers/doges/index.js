import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import memoizeOne from 'memoize-one'

import * as dogeSelectors from '../../reducers/doge'
import * as dogeActions from '../../actions/doge'
import Dropdown from '../../components/dropdown'
import MasonryGrid from '../../components/masonry-grid'
import DogeCard from '../../components/doge-card'
import doge from '../../assets/images/doge.jpg'
import * as dogeConstants from '../../constants/doge'

import './doges.css'

const bricks = [
  <DogeCard
    key={0}
    id={0}
    status={dogeConstants.STATUS_ENUM[dogeConstants.STATUS_ENUM.Pending]}
    imageSrc={doge}
    masonryGridFilterValues={[
      dogeConstants.STATUS_ENUM[dogeConstants.STATUS_ENUM.Pending]
    ]}
    masonryGridSortValues={{
      Newest: 1,
      Oldest: 1,
      'Challenges ↑': 1,
      'Challenges ↓': -1
    }}
  >
    Pending
  </DogeCard>,
  <DogeCard
    key={1}
    id={1}
    status={dogeConstants.STATUS_ENUM[dogeConstants.STATUS_ENUM.Challenged]}
    imageSrc={doge}
    masonryGridFilterValues={[
      dogeConstants.STATUS_ENUM[dogeConstants.STATUS_ENUM.Challenged]
    ]}
    masonryGridSortValues={{
      Newest: 2,
      Oldest: 2,
      'Challenges ↑': 2,
      'Challenges ↓': -2
    }}
  >
    Challenged
  </DogeCard>,
  <DogeCard
    key={2}
    id={2}
    status={dogeConstants.STATUS_ENUM[dogeConstants.STATUS_ENUM.Accepted]}
    imageSrc={doge}
    masonryGridFilterValues={[
      dogeConstants.STATUS_ENUM[dogeConstants.STATUS_ENUM.Accepted]
    ]}
    masonryGridSortValues={{
      Newest: 3,
      Oldest: 3,
      'Challenges ↑': 3,
      'Challenges ↓': -3
    }}
  >
    Accepted
  </DogeCard>,
  <DogeCard
    key={3}
    id={3}
    status={dogeConstants.STATUS_ENUM[dogeConstants.STATUS_ENUM.Rejected]}
    imageSrc={doge}
    masonryGridFilterValues={[
      dogeConstants.STATUS_ENUM[dogeConstants.STATUS_ENUM.Rejected]
    ]}
    masonryGridSortValues={{
      Newest: 4,
      Oldest: 4,
      'Challenges ↑': 4,
      'Challenges ↓': -4
    }}
  >
    Rejected
  </DogeCard>
]

class Doges extends PureComponent {
  static propTypes = {
    // Redux State
    doges: dogeSelectors.dogesShape.isRequired,

    // Action Dispatchers
    fetchDoges: PropTypes.func.isRequired
  }

  state = {
    filterValue: dogeConstants.FILTER_OPTIONS_ENUM.values.map((_, i) => i),
    filter: dogeConstants.FILTER_OPTIONS_ENUM.values,
    sortValue: 0,
    sort: { [dogeConstants.SORT_OPTIONS_ENUM[0]]: 'ascending' }
  }

  componentDidMount() {
    const { fetchDoges } = this.props
    const { filterValue, sortValue } = this.state
    fetchDoges(0, 10, filterValue, sortValue)
  }

  getFilterOptionsWithCountsAndColors = memoizeOne(() =>
    dogeConstants.FILTER_OPTIONS_ENUM.values.map(value => ({
      label: value,
      count: 5,
      color: dogeConstants.STATUS_COLOR_ENUM[dogeConstants.STATUS_ENUM[value]]
    }))
  )

  handleFilterChange = value =>
    this.setState({
      filterValue: value,
      filter: value.map(v => dogeConstants.FILTER_OPTIONS_ENUM[v])
    })

  handleSortChange = value =>
    this.setState({
      sortValue: value,
      sort: {
        [dogeConstants.SORT_OPTIONS_ENUM[value]]: 'ascending'
      }
    })

  render() {
    const { doges } = this.props
    const { filterValue, filter, sortValue, sort } = this.state
    console.log(doges)
    return (
      <div className="Doges">
        <div className="Doges-settingsBar">
          <h3 className="Doges-settingsBar-count">
            <span className="Doges-settingsBar-count-label">
              Doges submitted:
            </span>{' '}
            <span className="Doges-settingsBar-count-number">1245</span>
          </h3>
          <div className="Doges-settingsBar-dropdowns">
            <Dropdown
              value={filterValue}
              type="checkbox"
              label="Filter"
              options={this.getFilterOptionsWithCountsAndColors()}
              onChange={this.handleFilterChange}
              inverted
              className="Doges-settingsBar-dropdowns-dropdown"
            />
            <Dropdown
              value={sortValue}
              type="radio"
              options={dogeConstants.SORT_OPTIONS_ENUM.values}
              onChange={this.handleSortChange}
              className="Doges-settingsBar-dropdowns-dropdown"
            />
          </div>
        </div>
        <MasonryGrid filter={filter} sort={sort} className="Doges-masonryGrid">
          {bricks}
        </MasonryGrid>
      </div>
    )
  }
}

export default connect(
  state => ({ doges: state.doge.doges }),
  { fetchDoges: dogeActions.fetchDoges }
)(Doges)
