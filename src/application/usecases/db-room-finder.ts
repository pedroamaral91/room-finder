import { RoomFinder } from '@/domain/usecases/room-finder.interface'
import { RoomFinderRepository } from '../protocols/room-finder-repository.interface'

export class DbRoomFinder implements RoomFinder {
  constructor (private readonly roomFinderRepository: RoomFinderRepository) {}
  async fetchRoom (params: RoomFinder.Params): Promise<RoomFinder.Result[]> {
    const rooms = await this.roomFinderRepository.loadRoomByDate(params)
    if (!rooms || !rooms.length) return null
    return rooms
  }
}
