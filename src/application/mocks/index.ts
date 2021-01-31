import { RoomFinderRepository } from '../protocols/room-finder-repository.interface'

export const mockLoadedRoomByDate: RoomFinderRepository.Result = {
  description: 'valid_description',
  images: ['image_url'],
  name: 'valid_name',
  price: 'price'
}

export class RoomFinderRepositorySpy implements RoomFinderRepository {
  async loadRoomByDate (params: RoomFinderRepository.Params): Promise<RoomFinderRepository.Result[]> {
    return [mockLoadedRoomByDate]
  }
}
