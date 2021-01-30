import { RoomFinderController } from './room-finder.controller'
import { ValidationSpy } from '../mocks/mock-validation'
import { Validation } from '../protocols/validation'
import { BAD_REQUEST } from '../errors/bad-request'
import { RoomFinderSpy, mockRooms } from '../mocks/room-finder.mock'
import { RoomFinder } from '@/domain/usecases/room-finder.interface'

type RoomFinderControllerFactory = {
  validation: Validation
  controller: RoomFinderController
  roomFinder: RoomFinder
}

const roomFinderControllerFactory = (): RoomFinderControllerFactory => {
  const validation = new ValidationSpy('checkin')
  const roomFinder = new RoomFinderSpy()
  const controller = new RoomFinderController(validation, roomFinder)
  return { validation, controller, roomFinder }
}

describe('RoomFinderController Tests', () => {
  const mockValidParams = { checkin: '01/01/2020', checkout: '01/01/2020' }
  it('should return a valid room', async () => {
    const { controller, validation } = roomFinderControllerFactory()
    jest.spyOn(validation, 'validate').mockImplementation(() => null)
    const response = await controller.handle(mockValidParams)
    expect(response.statusCode).toBe(200)
    expect(response.body).toMatchObject(mockRooms)
  })
  it('should return a BAD_REQUEST error', async () => {
    const { controller } = roomFinderControllerFactory()
    const response = await controller.handle({ checkin: 'any', checkout: 'invalid' })
    expect(response.statusCode).toBe(400)
    expect(response.body.response).toBe('Invalid param error: checkin')
    expect(response.body).toBeInstanceOf(BAD_REQUEST)
  })
})
