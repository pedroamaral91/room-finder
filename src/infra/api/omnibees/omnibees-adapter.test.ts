import { OmnibeesPlayWrightAdapter } from './omnibees-playwright-adapter'
import { chromium } from 'playwright'

jest.mock('playwright')
const mockParams = { checkin: '01/01/2001', checkout: '01/01/2001' }
const mockURL = `https://myreservations.omnibees.com/default.aspx?version=MyReservation&q=5462&checkin=${mockParams.checkin.replace(/[/]/g, '')}&checkout=${mockParams.checkout.replace(/[/]/g, '')}#/&diff=false&CheckIn=10022021&CheckOut=12022021&Code=&group_code=&loyality_card=&NRooms=1&ad=1&ch=0&ag=-`
const mockResultValue = {
  name: 'valid_name',
  price: 'valid_price',
  description: 'valid_description',
  images: ['valid_image_url']
}
const mockPlayWrightFactory = (): any => {
  const gotoMock = jest.fn()
  const waitForSelectorMock = jest.fn()
  const evalMock = jest.fn()
  jest.spyOn(chromium, 'launch').mockImplementationOnce(async () => ({
    close: jest.fn(),
    newPage: () => ({
      goto: gotoMock,
      waitForSelector: waitForSelectorMock,
      $$eval: evalMock.mockResolvedValueOnce(mockResultValue),
      close: jest.fn()
    })
  }) as any)
  return {
    gotoMock,
    waitForSelectorMock,
    evalMock
  }
}

describe('OmniBees Adatper tests', () => {
  beforeEach(() => jest.clearAllMocks())
  it('should return a valid rooms', async () => {
    mockPlayWrightFactory()
    const omnibeesAdapter = new OmnibeesPlayWrightAdapter()
    const response = await omnibeesAdapter.loadRoomByDate(mockParams)
    expect(response).toMatchObject({
      name: 'valid_name',
      price: 'valid_price',
      description: 'valid_description',
      images: ['valid_image_url']
    })
  })
  it('should call [playwright] functions with correct values', async () => {
    const { gotoMock, waitForSelectorMock, evalMock } = mockPlayWrightFactory()
    const omnibeesAdapter = new OmnibeesPlayWrightAdapter()
    await omnibeesAdapter.loadRoomByDate(mockParams)
    expect(chromium.launch).toBeCalledTimes(1)
    expect(chromium.launch).toBeCalledWith({ headless: true })
    expect(gotoMock).toBeCalledTimes(1)
    expect(gotoMock).toBeCalledWith(mockURL, { waitUntil: 'networkidle' })
    expect(waitForSelectorMock).toBeCalledTimes(1)
    expect(waitForSelectorMock).toBeCalledWith('#results', { state: 'visible' })
    expect(evalMock).toBeCalledTimes(1)
  })
  it('should throw if [playwright] throws', () => {
    const { gotoMock } = mockPlayWrightFactory()
    gotoMock.mockRejectedValueOnce(new Error())
    const omnibeesAdapter = new OmnibeesPlayWrightAdapter()
    expect(omnibeesAdapter.loadRoomByDate(mockParams)).rejects.toThrowError()
  })
})
