import { Validation } from '../protocols/validation'
import { BAD_REQUEST } from '../errors/bad-request'

export class ValidationSpy implements Validation {
  constructor (private readonly fieldName: string) {}

  validate (input: any): Error {
    return new BAD_REQUEST(this.fieldName)
  }
}
