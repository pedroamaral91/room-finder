import { HttpException } from './http-error'

export class NOT_FOUND extends HttpException {
  constructor (param: string) {
    super(`${param} was not found`, 400)
    this.name = 'NOT_FOUND'
  }
}
