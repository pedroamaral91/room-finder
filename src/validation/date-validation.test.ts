import { DateValidation } from './date-validation'
import { BAD_REQUEST } from '../presentation/errors/bad-request'
describe('Date Validation tests', () => {
  it('should pass in Date Validation', () => {
    const validation = new DateValidation('checkin')
    expect(validation.validate({ checkin: '01/01/2001' })).toBeUndefined()
  })
  it('should return BAD_REQUEST error', () => {
    const validation = new DateValidation('checkin')
    expect(validation.validate({ checkin: '01/01/201' })).toBeInstanceOf(BAD_REQUEST)
  })
})
