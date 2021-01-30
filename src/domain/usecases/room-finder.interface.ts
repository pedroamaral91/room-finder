export interface RoomFinder {
  fetchRoom: (params: RoomFinder.Params) => Promise<RoomFinder.Result[]>
}

export namespace RoomFinder {
  export interface Params {
    checkin: string
    checkout: string
  }
  export interface Result {
    name: string
    price: string
    description: string
    image_url: string
  }
}
