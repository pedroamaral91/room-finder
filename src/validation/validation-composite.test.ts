import { DateValidation } from './date-validation'
import { BAD_REQUEST } from '../presentation/errors/bad-request'
import { ValidationComposite } from './validation-composite'
describe('Validation Composite tests', () => {
  it('should pass in all validations', () => {
    const validation1 = new DateValidation('checkin')
    const validation2 = new DateValidation('checkout')
    const composite = new ValidationComposite([validation1, validation2])
    expect(composite.validate({ checkin: '01/01/2001', checkout: '01/01/2001' })).toBeUndefined()
  })
  it('should return BAD_REQUEST error', () => {
    const validation1 = new DateValidation('checkin')
    const validation2 = new DateValidation('checkout')
    const composite = new ValidationComposite([validation1, validation2])
    expect(composite.validate({ checkin: '01/01/2001', checkout: '01' })).toBeInstanceOf(BAD_REQUEST)
  })
})
