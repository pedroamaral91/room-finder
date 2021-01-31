import { HttpResponse } from '../protocols/http'
import { NOT_FOUND } from '../errors/not-found'

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const notFound = (entity: string): HttpResponse => ({
  statusCode: 404,
  body: new NOT_FOUND(entity)
})

export const genericError = (): HttpResponse => ({
  statusCode: 500,
  body: new Error('INTERNAL SERVER ERROR')
})
