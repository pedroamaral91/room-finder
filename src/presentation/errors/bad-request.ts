import { HttpException } from './http-error'

export class BAD_REQUEST extends HttpException {
  constructor (param: string) {
    super(`Invalid param error: ${param}`, 400)
    this.name = 'BAD_REQUEST'
  }
}
