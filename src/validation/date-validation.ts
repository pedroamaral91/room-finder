/* eslint-disable no-useless-escape */
import { Validation } from '@/presentation/protocols/validation'
import { BAD_REQUEST } from '../presentation/errors/bad-request'
export class DateValidation implements Validation {
  private readonly REGEX = /^\d{2}([\/])\d{2}\1\d{4}$/
  constructor (
    private readonly fieldName: string
  ) {}

  validate (input: any): Error {
    if (!this.REGEX.test(input[this.fieldName])) return new BAD_REQUEST(`${this.fieldName} must be in dd/MM/yyyy format`)
  }
}
