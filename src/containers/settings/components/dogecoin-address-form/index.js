import { form } from '../../../../utils/form-generator'
import { required, dogecoinAddress } from '../../../../utils/validation'

export const {
  Form: DogecoinAddressForm,
  isInvalid: getDogecoinAddressFormIsInvalid,
  submit: submitDogecoinAddressForm
} = form('dogecoinAddressForm', {
  dogecoinAddress: {
    type: 'text',
    validate: [required, dogecoinAddress]
  }
})
