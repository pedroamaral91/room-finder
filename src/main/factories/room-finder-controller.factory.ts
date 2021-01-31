import { Controller } from '@/presentation/protocols'
import { Validation } from '../../presentation/protocols/validation'
import { DateValidation } from '../../validation/date-validation'
import { ValidationComposite } from '../../validation/validation-composite'
import { DbRoomFinder } from '../../application/usecases/db-room-finder'
import { OmnibeesPlayWrightAdapter } from '../../infra/api/omnibees/omnibees-playwright-adapter'
import { RoomFinderController } from '../../presentation/controllers/room-finder.controller'

export const roomFinderControllerFactory = (): Controller => {
  const requiredDateFields = ['checkin', 'checkout']
  const validations: Validation[] = requiredDateFields.map(field => new DateValidation(field))
  const compositeValdiation = new ValidationComposite(validations)
  const roomFinderRepository = new OmnibeesPlayWrightAdapter()
  const roomFinder = new DbRoomFinder(roomFinderRepository)
  return new RoomFinderController(compositeValdiation, roomFinder)
}
