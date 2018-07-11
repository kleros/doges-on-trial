import React from 'react'
import PropTypes from 'prop-types'
import { RenderIf } from 'lessdux'

import { web3, IMAGES_BASE_URL } from '../../../../bootstrap/dapp-api'
import * as arbitrablePermissionListSelectors from '../../../../reducers/arbitrable-permission-list'
import * as dogeSelectors from '../../../../reducers/doge'
import * as dogeConstants from '../../../../constants/doge'
import InfoCard from '../../../../components/info-card'
import DogeImage from '../../../../components/doge-image'
import ValueList from '../../../../components/value-list'
import Button from '../../../../components/button'

import './details.css'

const Details = ({
  arbitrablePermissionListData,
  doge,
  onExecuteRequestClick,
  onSubmitChallengeClick,
  onAppealClick,
  onExecuteRulingClick
}) => {
  let infoCardMessage
  let title
  let valueListItems
  let button
  if (arbitrablePermissionListData.data && doge.data)
    switch (doge.data.status) {
      case dogeConstants.STATUS_ENUM.Pending: // You can challenge the doge
        if (
          Date.now() - doge.data.lastAction >=
          arbitrablePermissionListData.data.timeToChallenge
        ) {
          title = 'This Doge Has Been Judged'
          button = {
            children: 'Execute Request',
            onClick: onExecuteRequestClick
          }
        } else {
          title = 'Send Doge to Trial?'
          valueListItems = [
            {
              label: 'Deposit',
              value: String(
                web3.utils.fromWei(
                  web3.utils
                    .toBN(arbitrablePermissionListData.data.stake)
                    .add(
                      web3.utils.toBN(
                        arbitrablePermissionListData.data.arbitrationCost
                      )
                    )
                )
              )
            }
          ]
          button = {
            children: 'Submit Challenge',
            onClick: onSubmitChallengeClick
          }
        }
        break
      case dogeConstants.STATUS_ENUM.Challenged: // The doge has an ongoing challenge
        switch (doge.disputeStatus) {
          case dogeConstants.DISPUTE_STATUS_ENUM.Waiting: // The dispute is waiting for a ruling
            title = 'This Doge is Being Judged'
            valueListItems = [
              {
                label: 'Total Deposited',
                value: String(
                  web3.utils.fromWei(
                    web3.utils
                      .toBN(arbitrablePermissionListData.data.stake)
                      .add(
                        web3.utils.toBN(
                          arbitrablePermissionListData.data.arbitrationCost
                        )
                      )
                      .muln(2)
                  )
                )
              }
            ]
            break
          case dogeConstants.DISPUTE_STATUS_ENUM.Appealable: // You can appeal the dispute's ruling
            title = 'This Doge Has Been Judged'
            valueListItems = [
              {
                label: 'Total Deposited',
                value: String(
                  web3.utils.fromWei(
                    web3.utils
                      .toBN(arbitrablePermissionListData.data.stake)
                      .add(
                        web3.utils.toBN(
                          arbitrablePermissionListData.data.arbitrationCost
                        )
                      )
                      .muln(2)
                  )
                )
              },
              {
                label: 'Appeal Fees',
                value: String(web3.utils.fromWei(doge.data.appealCost))
              }
            ]
            button = { children: 'Appeal', onClick: onAppealClick }
            break
          case dogeConstants.DISPUTE_STATUS_ENUM.Solved: // You can execute the dispute's ruling
            title = 'This Doge Has Been Judged'
            valueListItems = [
              {
                label: 'Total Deposited',
                value: String(
                  web3.utils.fromWei(
                    web3.utils
                      .toBN(arbitrablePermissionListData.data.stake)
                      .add(
                        web3.utils.toBN(
                          arbitrablePermissionListData.data.arbitrationCost
                        )
                      )
                      .muln(2)
                  )
                )
              }
            ]
            button = {
              children: 'Execute Ruling',
              onClick: onExecuteRulingClick
            }
            break
          default:
            throw new Error('Invalid doge challenged state.')
        }
        break
      case dogeConstants.STATUS_ENUM.Accepted:
      case dogeConstants.STATUS_ENUM.Rejected: // The doge has been accepted or rejected
        title = 'This Doge Has Been Judged'
        break
      default:
        throw new Error('Invalid doge state.')
    }
  return (
    <RenderIf
      resource={arbitrablePermissionListData}
      loading="Loading list data..."
      done={
        <RenderIf
          resource={doge}
          loading="Loading doge..."
          updating="Updating doge..."
          done={
            doge.data && (
              <div className="Details">
                {infoCardMessage && <InfoCard message={infoCardMessage} />}
                {title && <h1>{title}</h1>}
                <DogeImage
                  status={doge.data.status}
                  imageSrc={IMAGES_BASE_URL + doge.data.ID}
                />
                {valueListItems && (
                  <ValueList
                    items={valueListItems}
                    className="Details-valueList"
                  />
                )}
                {button && (
                  <Button
                    id={doge.data.ID}
                    className="Details-button"
                    {...button}
                  />
                )}
              </div>
            )
          }
          failedLoading="There was an error fetching the doge."
          failedUpdating="There was an error updating the doge."
        />
      }
      failedLoading="There was an error fetching the list data."
    />
  )
}

Details.propTypes = {
  // State
  arbitrablePermissionListData:
    arbitrablePermissionListSelectors.arbitrablePermissionListDataShape
      .isRequired,
  doge: dogeSelectors.dogeShape.isRequired,

  // Handlers
  onExecuteRequestClick: PropTypes.func.isRequired,
  onSubmitChallengeClick: PropTypes.func.isRequired,
  onAppealClick: PropTypes.func.isRequired,
  onExecuteRulingClick: PropTypes.func.isRequired
}

export default Details
