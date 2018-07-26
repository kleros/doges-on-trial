import React from 'react'
import PropTypes from 'prop-types'
import { RenderIf } from 'lessdux'
import { Link } from 'react-router-dom'
import { BeatLoader } from 'react-spinners'

import { web3, IMAGES_BASE_URL } from '../../../../bootstrap/dapp-api'
import * as arbitrablePermissionListSelectors from '../../../../reducers/arbitrable-permission-list'
import * as dogeSelectors from '../../../../reducers/doge'
import * as dogeConstants from '../../../../constants/doge'
import InfoCard from '../../../../components/info-card'
import DogeImage from '../../../../components/doge-image'
import ValueList from '../../../../components/value-list'
import Button from '../../../../components/button'
import deposit from '../../../../assets/images/deposit.svg'
import appealFees from '../../../../assets/images/appeal-fees.svg'

import './details.css'

const renderDogeDetails = (
  arbitrablePermissionListData,
  doge,
  onExecuteRequestClick,
  onSubmitChallengeClick,
  onAppealClick
) => {
  let status = doge.status
  let infoCardMessage
  let title
  let valueListItems
  let button
  switch (doge.status) {
    case dogeConstants.STATUS_ENUM.Pending: // You can challenge the doge
      if (
        Date.now() - doge.lastAction >=
        arbitrablePermissionListData.timeToChallenge
      ) {
        title = 'This Doge Has Been Judged'
        button = {
          children: 'Finalize Registration',
          onClick: onExecuteRequestClick
        }
      } else {
        title = 'Send Image to Trial?'
        valueListItems = [
          {
            label: 'Deposit',
            value: String(
              web3.utils.fromWei(
                String(
                  web3.utils
                    .toBN(arbitrablePermissionListData.stake)
                    .add(
                      web3.utils.toBN(
                        arbitrablePermissionListData.arbitrationCost
                      )
                    )
                )
              )
            ),
            icon: deposit,
            tooltip:
              'This is the amount of ETH that you need to submit to cover arbitration fees and reward the counter party if they win.'
          }
        ]
        button = {
          children: 'Send to Trial!',
          onClick: onSubmitChallengeClick
        }
      }
      break
    case dogeConstants.STATUS_ENUM.Challenged: // The doge has an ongoing challenge
      switch (doge.disputeStatus) {
        case dogeConstants.DISPUTE_STATUS_ENUM.Waiting: // The dispute is waiting for a ruling
          title = 'This Doge Is Being Judged'
          valueListItems = [
            {
              label: 'Total Deposited',
              value: String(
                web3.utils.fromWei(
                  String(
                    web3.utils
                      .toBN(arbitrablePermissionListData.stake)
                      .add(
                        web3.utils.toBN(
                          arbitrablePermissionListData.arbitrationCost
                        )
                      )
                      .muln(2)
                  )
                )
              ),
              icon: deposit,
              tooltip:
                'This is the total amount of ETH submitted by both parties. It will be used to pay arbitration fees and the remaining amount will go to the winner.'
            }
          ]
          break
        case dogeConstants.DISPUTE_STATUS_ENUM.Appealable: // You can appeal the dispute's ruling
          status =
            dogeConstants.STATUS_ENUM[
              dogeConstants.RULING_ENUM[doge.currentRuling]
            ]
          title = 'This Doge Has Been Judged'
          valueListItems = [
            {
              label: 'Total Deposited',
              value: String(
                web3.utils.fromWei(
                  String(
                    web3.utils
                      .toBN(arbitrablePermissionListData.stake)
                      .add(
                        web3.utils.toBN(
                          arbitrablePermissionListData.arbitrationCost
                        )
                      )
                      .muln(2)
                  )
                )
              ),
              icon: deposit,
              tooltip:
                'This is the total amount of ETH submitted by both parties. It will be used to pay arbitration fees and the remaining amount will go to the winner.'
            },
            {
              label: 'Appeal Fees',
              value: String(web3.utils.fromWei(doge.appealCost)),
              icon: appealFees,
              tooltip: 'This is the cost of appealing the ruling, in ETH.'
            }
          ]
          button = { children: 'Appeal', onClick: onAppealClick }
          break
        case dogeConstants.DISPUTE_STATUS_ENUM.Solved: // You can execute the dispute's ruling
          status =
            dogeConstants.STATUS_ENUM[
              dogeConstants.RULING_ENUM[doge.currentRuling]
            ]
          title = 'This Doge Has Been Judged'
          valueListItems = [
            {
              label: 'Total Deposited',
              value: String(
                web3.utils.fromWei(
                  String(
                    web3.utils
                      .toBN(arbitrablePermissionListData.stake)
                      .add(
                        web3.utils.toBN(
                          arbitrablePermissionListData.arbitrationCost
                        )
                      )
                      .muln(2)
                  )
                )
              ),
              icon: deposit,
              tooltip:
                'This is the total amount of ETH submitted by both parties. It will be used to pay arbitration fees and the remaining amount will go to the winner.'
            }
          ]
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
    <div className="Details">
      {infoCardMessage && <InfoCard message={infoCardMessage} />}
      {title && <h1>{title}</h1>}
      <DogeImage status={status} imageSrc={IMAGES_BASE_URL + doge.ID} />
      {valueListItems && (
        <ValueList items={valueListItems} className="Details-valueList" />
      )}
      {button && <Button id={doge.ID} className="Details-button" {...button} />}
      <br />
      <small>
        Set an email in <Link to="/settings">settings</Link> to receive email
        notifications.
      </small>
    </div>
  )
}
const Details = ({
  arbitrablePermissionListData,
  doge,
  onExecuteRequestClick,
  onSubmitChallengeClick,
  onAppealClick,
  onExecuteRulingClick
}) => (
  <RenderIf
    resource={arbitrablePermissionListData}
    loading={<BeatLoader color="#3d464d" />}
    done={
      arbitrablePermissionListData.data && (
        <RenderIf
          resource={doge}
          loading={<BeatLoader color="#3d464d" />}
          updating={<BeatLoader color="#3d464d" />}
          done={
            doge.data &&
            !doge.updating &&
            renderDogeDetails(
              arbitrablePermissionListData.data,
              doge.data,
              onExecuteRequestClick,
              onSubmitChallengeClick,
              onAppealClick,
              onExecuteRulingClick
            )
          }
          failedLoading="There was an error fetching the doge."
          failedUpdating="There was an error updating the doge."
        />
      )
    }
    failedLoading="There was an error fetching the list data."
  />
)

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
