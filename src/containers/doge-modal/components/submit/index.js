import React from 'react'
import PropTypes from 'prop-types'
import { RenderIf } from 'lessdux'
import { Link } from 'react-router-dom'
import { BeatLoader } from 'react-spinners'

import { web3 } from '../../../../bootstrap/dapp-api'
import * as arbitrablePermissionListSelectors from '../../../../reducers/arbitrable-permission-list'
import * as dogeSelectors from '../../../../reducers/doge'
import InfoCard from '../../../../components/info-card'
import FilePicker from '../../../../components/file-picker'
import ValueList from '../../../../components/value-list'
import Button from '../../../../components/button'
import deposit from '../../../../assets/images/deposit.svg'

import './submit.css'

const Submit = ({
  arbitrablePermissionListData,
  doge,
  imageFileDataURL,
  imageFileInfoMessage,
  handleOnFileDropAccepted,
  handleSubmitDogeClick
}) => (
  <div className="Submit">
    {imageFileInfoMessage && <InfoCard message={imageFileInfoMessage} />}
    <h1>Submit your Doge</h1>
    {doge.creating ? (
      'Submitting doge...'
    ) : (
      <FilePicker
        multiple={false}
        onDropAccepted={handleOnFileDropAccepted}
        message={
          <span>
            (Max Size: 300KB)
            <br />
            <br />
            (Min W/H: 100px/100px)
            <br />
            <br />
            Drag file here or
          </span>
        }
        imageFilePreviewURL={imageFileDataURL}
      />
    )}
    <br />
    <br />
    <RenderIf
      resource={arbitrablePermissionListData}
      loading={<BeatLoader color="#3d464d" />}
      done={
        arbitrablePermissionListData.data && (
          <div className="Submit-bottom">
            <ValueList
              items={[
                {
                  label: 'Deposit',
                  value: String(
                    web3.utils.fromWei(
                      String(
                        web3.utils
                          .toBN(arbitrablePermissionListData.data.stake)
                          .add(
                            web3.utils.toBN(
                              arbitrablePermissionListData.data.arbitrationCost
                            )
                          )
                      )
                    )
                  ),
                  icon: deposit,
                  tooltip:
                    'This is the amount of ETH that you need to submit to cover arbitration fees and reward the counter party if they win a challenge against your submission.'
                }
              ]}
            />
            <br />
            <br />
            <Button
              onClick={handleSubmitDogeClick}
              disabled={!imageFileDataURL || doge.creating}
            >
              {doge.creating ? 'Submitting...' : 'Submit Doge'}
            </Button>
            <br />
            <small>
              Set an email in <Link to="/settings">settings</Link> to receive
              email notifications.
            </small>
          </div>
        )
      }
      failedLoading="There was an error fetching the list's data."
    />
  </div>
)

Submit.propTypes = {
  // State
  arbitrablePermissionListData:
    arbitrablePermissionListSelectors.arbitrablePermissionListDataShape
      .isRequired,
  doge: dogeSelectors.dogeShape.isRequired,
  imageFileDataURL: PropTypes.string,
  imageFileInfoMessage: PropTypes.string,

  // Handlers
  handleOnFileDropAccepted: PropTypes.func.isRequired,
  handleSubmitDogeClick: PropTypes.func.isRequired
}

Submit.defaultProps = {
  // State
  imageFileDataURL: null,
  imageFileInfoMessage: null
}

export default Submit
