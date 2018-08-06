import Web3 from 'web3'

import ArbitrablePermissionList from '../assets/contracts/arbitrable-permission-list.json'
import Arbitrator from '../assets/contracts/arbitrator.json'

const env = process.env.NODE_ENV === 'production' ? 'PROD' : 'DEV'
const ETHEREUM_PROVIDER = process.env[`REACT_APP_${env}_ETHEREUM_PROVIDER`]
const ARBITRABLE_PERMISSION_LIST_ADDRESS =
  process.env[`REACT_APP_${env}_ARBITRABLE_PERMISSION_LIST_ADDRESS`]
const IMAGES_BASE_URL = process.env[`REACT_APP_${env}_IMAGES_BASE_URL`]
const IMAGE_UPLOAD_URL = process.env[`REACT_APP_${env}_IMAGE_UPLOAD_URL`]
const PATCH_USER_SETTINGS_URL =
  process.env[`REACT_APP_${env}_PATCH_USER_SETTINGS_URL`]

let web3
let isInfura = false
if (process.env.NODE_ENV === 'test')
  web3 = new Web3(require('ganache-cli').provider())
else if (window.web3 && window.web3.currentProvider)
  web3 = new Web3(window.web3.currentProvider)
else {
  web3 = new Web3(new Web3.providers.HttpProvider(ETHEREUM_PROVIDER))
  isInfura = true
}

const network =
  web3.eth &&
  web3.eth.net
    .getId()
    .then(networkID => {
      switch (networkID) {
        case 1:
          return 'main'
        case 3:
          return 'ropsten'
        case 4:
          return 'rinkeby'
        case 42:
          return 'kovan'
        default:
          return null
      }
    })
    .catch(() => null)

const ETHAddressRegExpCaptureGroup = '(0x[a-fA-F0-9]{40})'
const ETHAddressRegExp = /0x[a-fA-F0-9]{40}/
const strictETHAddressRegExp = /^0x[a-fA-F0-9]{40}$/

const arbitrablePermissionList = new web3.eth.Contract(
  ArbitrablePermissionList.abi,
  ARBITRABLE_PERMISSION_LIST_ADDRESS
)
const arbitrator = new web3.eth.Contract(Arbitrator.abi)

export {
  web3,
  isInfura,
  network,
  ETHAddressRegExpCaptureGroup,
  ETHAddressRegExp,
  strictETHAddressRegExp,
  arbitrablePermissionList,
  arbitrator,
  IMAGES_BASE_URL,
  IMAGE_UPLOAD_URL,
  PATCH_USER_SETTINGS_URL
}
