import { DbRoomFinder } from './db-room-finder'
import { RoomFinderRepositorySpy, mockLoadedRoomByDate } from '../mocks/index'
import { RoomFinderRepository } from '../protocols/room-finder-repository.interface'
import { RoomFinder } from '@/domain/usecases/room-finder.interface'

interface DbRoomFinderFactory {
  roomFinderRepository: RoomFinderRepository
  dbRoomFinder: RoomFinder
}

const dbRoomFinderFactory = (): DbRoomFinderFactory => {
  const roomFinderRepository = new RoomFinderRepositorySpy()
  const dbRoomFinder = new DbRoomFinder(roomFinderRepository)
  return { dbRoomFinder, roomFinderRepository }
}

describe('DbRoomFinder Tests', () => {
  const mockParam = { checkin: '01/01/2001', checkout: '01/01/2001' }
  it('should return a valid room', async () => {
    const { dbRoomFinder } = dbRoomFinderFactory()
    const response = await dbRoomFinder.fetchRoom(mockParam)
    expect(response).toMatchObject(mockLoadedRoomByDate)
  })
  it('should call [roomFinderRepository] with correct values', async () => {
    const { dbRoomFinder, roomFinderRepository } = dbRoomFinderFactory()
    jest.spyOn(roomFinderRepository, 'loadRoomByDate')
    await dbRoomFinder.fetchRoom(mockParam)
    expect(roomFinderRepository.loadRoomByDate).toHaveBeenCalledTimes(1)
    expect(roomFinderRepository.loadRoomByDate).toHaveBeenCalledWith(mockParam)
  })
  it('should throw if [roomFinderRepository] throws', () => {
    const { dbRoomFinder, roomFinderRepository } = dbRoomFinderFactory()
    jest.spyOn(roomFinderRepository, 'loadRoomByDate').mockRejectedValueOnce(new Error())
    expect(dbRoomFinder.fetchRoom(mockParam)).rejects.toThrowError()
  })
})
