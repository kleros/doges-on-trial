import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import memoizeOne from 'memoize-one'
import { RenderIf } from 'lessdux'
import ReactInfiniteScroller from 'react-infinite-scroller'
import PieChart from 'react-minimal-pie-chart'
import { BeatLoader, ClimbingBoxLoader } from 'react-spinners'

import { IMAGES_BASE_URL } from '../../bootstrap/dapp-api'
import * as walletSelectors from '../../reducers/wallet'
import * as arbitrablePermissionListSelectors from '../../reducers/arbitrable-permission-list'
import * as arbitrablePermissionListActions from '../../actions/arbitrable-permission-list'
import * as dogeSelectors from '../../reducers/doge'
import * as dogeActions from '../../actions/doge'
import * as modalActions from '../../actions/modal'
import Dropdown from '../../components/dropdown'
import MasonryGrid from '../../components/masonry-grid'
import DogeCard from '../../components/doge-card'
import * as dogeConstants from '../../constants/doge'
import * as modalConstants from '../../constants/modal'

import './doges.css'

class Doges extends PureComponent {
  static propTypes = {
    // Redux State
    accounts: walletSelectors.accountsShape.isRequired,
    arbitrablePermissionListData:
      arbitrablePermissionListSelectors.arbitrablePermissionListDataShape
        .isRequired,
    doges: dogeSelectors.dogesShape.isRequired,

    // Action Dispatchers
    fetchArbitrablePermissionListData: PropTypes.func.isRequired,
    fetchDoges: PropTypes.func.isRequired,
    fetchDoge: PropTypes.func.isRequired,
    openDogeModal: PropTypes.func.isRequired
  }

  state = {
    filterValue: dogeConstants.FILTER_OPTIONS_ENUM.indexes,
    filter: dogeConstants.FILTER_OPTIONS_ENUM.values,
    sortValue: 0,
    sort: { [dogeConstants.SORT_OPTIONS_ENUM[0]]: 'ascending' }
  }

  componentDidMount() {
    const { fetchArbitrablePermissionListData } = this.props
    fetchArbitrablePermissionListData()
    this.fetchDoges(true)
  }

  getFilterOptionsWithCountsAndColors = memoizeOne((accounts, doges = []) =>
    dogeConstants.FILTER_OPTIONS_ENUM.values.map(value => {
      let count
      switch (dogeConstants.FILTER_OPTIONS_ENUM[value]) {
        case dogeConstants.FILTER_OPTIONS_ENUM.Pending:
        case dogeConstants.FILTER_OPTIONS_ENUM.Challenged:
        case dogeConstants.FILTER_OPTIONS_ENUM.Accepted:
        case dogeConstants.FILTER_OPTIONS_ENUM.Rejected:
          count = doges.filter(
            doge => doge.status === dogeConstants.FILTER_OPTIONS_ENUM[value]
          ).length
          break
        case dogeConstants.FILTER_OPTIONS_ENUM['My Submissions']:
          count = doges.filter(doge => doge.submitter === accounts[0]).length
          break
        case dogeConstants.FILTER_OPTIONS_ENUM['My Challenges']:
          count = doges.filter(doge => doge.challenger === accounts[0]).length
          break
        default:
          count = 0
          break
      }

      return {
        label: value,
        count,
        color: dogeConstants.STATUS_COLOR_ENUM[dogeConstants.STATUS_ENUM[value]]
      }
    })
  )

  mapDoges = memoizeOne((accounts, doges) =>
    doges.map(doge => (
      <DogeCard
        key={doge.ID}
        id={doge.ID}
        status={dogeConstants.STATUS_ENUM[doge.status]}
        imageSrc={IMAGES_BASE_URL + doge.ID}
        onClick={this.handleDogeCardClick}
        masonryGridFilterValues={[
          dogeConstants.STATUS_ENUM[doge.status],
          accounts[0] === doge.submitter &&
            dogeConstants.FILTER_OPTIONS_ENUM[
              dogeConstants.FILTER_OPTIONS_ENUM['My Submissions']
            ],
          accounts[0] === doge.challenger &&
            dogeConstants.FILTER_OPTIONS_ENUM[
              dogeConstants.FILTER_OPTIONS_ENUM['My Challenges']
            ]
        ]}
        masonryGridSortValues={{
          Newest: -doge.lastAction,
          Oldest: doge.lastAction,
          'Challenges ↑': doge.disputed,
          'Challenges ↓': !doge.disputed
        }}
      >
        {dogeConstants.STATUS_ENUM[doge.status]}
      </DogeCard>
    ))
  )

  handleFilterChange = value =>
    this.setState(
      {
        filterValue: value,
        filter: value.map(v => dogeConstants.FILTER_OPTIONS_ENUM[v])
      },
      () => this.fetchDoges(true)
    )

  handleSortChange = value =>
    this.setState(
      {
        sortValue: value,
        sort: {
          [dogeConstants.SORT_OPTIONS_ENUM[value]]: 'ascending'
        }
      },
      () => this.fetchDoges(true)
    )

  handleDogeCardClick = ({ currentTarget: { id } }) => {
    const { fetchDoge, openDogeModal } = this.props
    fetchDoge(id, true)
    openDogeModal(modalConstants.DOGE_MODAL_ENUM.Details)
  }

  fetchDoges = clear => {
    const { doges, fetchDoges } = this.props
    const { filterValue, sortValue } = this.state
    fetchDoges(
      doges.data && clear !== true
        ? doges.data[doges.data.length - 1].ID
        : '0x00',
      10,
      filterValue,
      sortValue
    )
  }

  render() {
    const { accounts, arbitrablePermissionListData, doges } = this.props
    const { filterValue, filter, sortValue, sort } = this.state
    return (
      <div className="Doges">
        <ReactInfiniteScroller
          hasMore={!doges.loading && doges.data ? doges.data.hasMore : false}
          loadMore={this.fetchDoges}
          loader={
            <div key={0} className="Doges-masonryGridLoader">
              <BeatLoader color="#3d464d" />
            </div>
          }
          useWindow={false}
        >
          <div className="Doges-settingsBar">
            <RenderIf
              resource={arbitrablePermissionListData}
              loading={
                <div className="Doges-settingsBar-countsLoader">
                  <BeatLoader color="#3d464d" />
                </div>
              }
              done={
                arbitrablePermissionListData.data && (
                  <div className="Doges-settingsBar-counts">
                    <div className="Doges-settingsBar-counts-counters">
                      {Object.keys(
                        arbitrablePermissionListData.data.itemsCounts
                      ).map(label => (
                        <div
                          key={label}
                          className="Doges-settingsBar-counts-counters-counter"
                        >
                          <span className="Doges-settingsBar-counts-counters-counter-label">
                            {label}:
                          </span>{' '}
                          <span className="Doges-settingsBar-counts-counters-counter-number">
                            {
                              arbitrablePermissionListData.data.itemsCounts[
                                label
                              ]
                            }
                            <div
                              className={`Doges-settingsBar-counts-counters-counter-number-tag Doges-settingsBar-counts-counters-counter-number-tag--${label.toLowerCase()}`}
                            />
                          </span>
                        </div>
                      ))}
                    </div>
                    <PieChart
                      data={[
                        {
                          value:
                            arbitrablePermissionListData.data.itemsCounts
                              .Pending,
                          color: '#0059ab'
                        },
                        {
                          value:
                            arbitrablePermissionListData.data.itemsCounts
                              .Challenged,
                          color: '#ffbe61'
                        },
                        {
                          value:
                            arbitrablePermissionListData.data.itemsCounts
                              .Accepted,
                          color: '#47cf73'
                        },
                        {
                          value:
                            arbitrablePermissionListData.data.itemsCounts
                              .Rejected,
                          color: '#ff364f'
                        }
                      ]}
                      lineWidth={25}
                      animate
                      className="Doges-settingsBar-counts-pie"
                    />
                  </div>
                )
              }
              failedLoading={null}
            />
            <div className="Doges-settingsBar-dropdowns">
              <Dropdown
                value={filterValue}
                type="checkbox"
                label="Filter"
                options={this.getFilterOptionsWithCountsAndColors(
                  accounts.data,
                  doges.data || undefined
                )}
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
          <RenderIf
            resource={doges}
            loading={
              doges.data ? (
                <MasonryGrid filter={filter} sort={sort}>
                  {this.mapDoges(accounts.data, doges.data)}
                </MasonryGrid>
              ) : (
                <div className="Doges-masonryGridLoader">
                  <ClimbingBoxLoader color="#3d464d" />
                </div>
              )
            }
            done={
              doges.data && (
                <MasonryGrid filter={filter} sort={sort}>
                  {this.mapDoges(accounts.data, doges.data)}
                </MasonryGrid>
              )
            }
            failedLoading="There was an error fetching the doges. Make sure you are connected to the right Ethereum network."
          />
        </ReactInfiniteScroller>
      </div>
    )
  }
}

export default connect(
  state => ({
    accounts: state.wallet.accounts,
    arbitrablePermissionListData:
      state.arbitrablePermissionList.arbitrablePermissionListData,
    doges: state.doge.doges
  }),
  {
    fetchArbitrablePermissionListData:
      arbitrablePermissionListActions.fetchArbitrablePermissionListData,
    fetchDoges: dogeActions.fetchDoges,
    fetchDoge: dogeActions.fetchDoge,
    openDogeModal: modalActions.openDogeModal
  }
)(Doges)
