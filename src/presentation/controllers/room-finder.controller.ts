import { ok, badRequest, notFound } from '../helpers'
import { HttpResponse } from '../protocols'
import { Controller } from '../protocols/controller'
import { Validation } from '../protocols/validation'
import { genericError } from '../helpers/http-response.helpers'
import { RoomFinder } from '../../domain/usecases/room-finder.interface'

export class RoomFinderController implements Controller {
  constructor (
    private readonly validator: Validation,
    private readonly roomFinder: RoomFinder
  ) {}

  async handle (request: RoomFinderController.Request): Promise<HttpResponse> {
    try {
      const error = this.validator.validate(request)
      if (error) return badRequest(error)

      const rooms = await this.roomFinder.fetchRoom(request)
      if (!rooms) return notFound('Room')
      return ok(rooms)
    } catch (er) {
      return genericError()
    }
  }
}

namespace RoomFinderController {
  export type Request = {
    checkin: string
    checkout: string
  }
}
