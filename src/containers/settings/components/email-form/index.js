import { form } from '../../../../utils/form-generator'
import { required, email } from '../../../../utils/validation'

export const {
  Form: EmailForm,
  isInvalid: getEmailFormIsInvalid,
  submit: submitEmailForm
} = form('emailForm', {
  email: {
    type: 'text',
    validate: [required, email]
  }
})
