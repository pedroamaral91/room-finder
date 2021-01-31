import { RoomFinderRepository } from '@/application/protocols/room-finder-repository.interface'
import { chromium } from 'playwright'

type RoomDetails = {
  description: string
  price: string
  name: string
  images: string[]
}

export class OmnibeesPlayWrightAdapter implements RoomFinderRepository {
  async loadRoomByDate (params: RoomFinderRepository.Params): Promise<RoomFinderRepository.Result[]> {
    const browser = await chromium.launch({ headless: true })
    const page = await browser.newPage()

    const PARAMS = this.generateParamsURL(params)

    await page.goto(`${process.env.API_OMNIBEES_URL}/default.aspx?${PARAMS}`, { waitUntil: 'networkidle' })

    await page.waitForSelector('#results', { state: 'visible' })

    const roomsDetails = await page.$$eval('#results .roomExcerpt', this.getRoomsDetails)

    await page.close()
    await browser.close()
    return roomsDetails
  }

  private async getRoomsDetails (elements: HTMLElement[]): Promise<RoomDetails[]> {
    return elements.map((element) => ({
      description: element.querySelector('div.excerpt p a').textContent,
      price: element.querySelector('.bestPriceTextColor .sincePriceContent h6').textContent,
      name: element.querySelector('div.excerpt h5').textContent,
      images: [...element.querySelectorAll('.roomSlider .slide a')].map((imgElement) => {
        return `https://myreservations.omnibees.com${imgElement.getAttribute('href')}`
      })
    }))
  }

  private generateParamsURL (params: RoomFinderRepository.Params): string {
    const url = new URLSearchParams()
    url.set('version', 'MyReservation')
    url.set('q', '5462')
    const checkin = params.checkin.replace(/[/]/g, '')
    const checkout = params.checkout.replace(/[/]/g, '')
    return `${url.toString()}#/&diff=false&CheckIn=${checkin}&CheckOut=${checkout}&Code=&group_code=&loyality_card=&NRooms=1&ad=1&ch=0&ag=-`
  }
}
