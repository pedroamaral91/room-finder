/**
 * Defines the base HTTP exception, which is handled by the default
 * Exceptions Handler.
 */
export class HttpException extends Error {
  private readonly response
  private readonly status
  constructor (response: string, status: number) {
    super()
    this.response = response
    this.status = status
  }
}
