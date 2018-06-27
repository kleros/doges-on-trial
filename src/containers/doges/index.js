import React, { PureComponent } from 'react'
import memoizeOne from 'memoize-one'

import Dropdown from '../../components/dropdown'
import * as dogeConstants from '../../constants/doge'

import './doges.css'

export default class Doges extends PureComponent {
  state = { filterValue: [0], sortValue: 0 }

  getFilterOptionCounts = memoizeOne(() =>
    dogeConstants.FILTER_OPTIONS_ENUM.values.map(value => ({
      label: value,
      count: 5,
      color: dogeConstants.STATUS_COLOR_ENUM[dogeConstants.STATUS_ENUM[value]]
    }))
  )

  handleFilterChange = value => this.setState({ filterValue: value })

  handleSortChange = value => this.setState({ sortValue: value })

  render() {
    const { filterValue, sortValue } = this.state
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
              options={this.getFilterOptionCounts()}
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
      </div>
    )
  }
}
