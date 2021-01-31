export interface RoomFinderRepository {
  loadRoomByDate: (
    params: RoomFinderRepository.Params
  ) => Promise<RoomFinderRepository.Result[]>
}

export namespace RoomFinderRepository {
  export interface Params {
    checkin: string
    checkout: string
  }
  export interface Result {
    name: string
    price: string
    description: string
    images: string[]
  }
}
