import { HttpResponse } from '../protocols/http'

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const genericError = (): HttpResponse => ({
  statusCode: 500,
  body: new Error('INTERNAL SERVER ERROR')
})
