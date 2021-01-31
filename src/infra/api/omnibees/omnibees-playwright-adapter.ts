import { RoomFinderRepository } from '@/application/protocols/room-finder-repository.interface'
import { chromium } from 'playwright'

type RoomDetails = {
  description: string
  price: string
  name: string
  images: string[]
}

export class OmnibeesPlayWrightAdapter implements RoomFinderRepository {
  private PARAMS_URL = '#/&diff=false&CheckIn=10022021&CheckOut=12022021&Code=&group_code=&loyality_card=&NRooms=1&ad=1&ch=0&ag=-'
  private readonly BASE_URL = 'https://myreservations.omnibees.com'

  async loadRoomByDate (params: RoomFinderRepository.Params): Promise<RoomFinderRepository.Result[]> {
    const browser = await chromium.launch({ headless: true })
    const page = await browser.newPage()

    this.generateSearchURL(params)

    await page.goto(`${this.BASE_URL}/default.aspx?${this.PARAMS_URL}`, { waitUntil: 'networkidle' })

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

  private generateSearchURL (params: RoomFinderRepository.Params): void {
    const url = new URLSearchParams()
    url.set('version', 'MyReservation')
    url.set('q', '5462')
    url.set('checkin', params.checkin.replace(/[/]/g, ''))
    url.set('checkout', params.checkout.replace(/[/]/g, ''))
    this.PARAMS_URL = `${url.toString()}${this.PARAMS_URL}`
  }
}
