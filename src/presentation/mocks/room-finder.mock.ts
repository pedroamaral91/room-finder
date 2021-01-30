import { RoomFinder } from '@/domain/usecases/room-finder.interface'

export const mockRooms: RoomFinder.Result[] = [{
  description: 'valid_description',
  image_url: 'image_url',
  name: 'valid_name',
  price: 'price'
}
]

export class RoomFinderSpy implements RoomFinder {
  async fetchRoom (params: RoomFinder.Params): Promise<RoomFinder.Result[]> {
    return mockRooms
  }
}
