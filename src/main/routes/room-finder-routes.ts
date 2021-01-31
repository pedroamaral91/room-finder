import { adaptRoute } from '@/main/adapters'
import { roomFinderControllerFactory } from '@/main/factories'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/buscar', adaptRoute(roomFinderControllerFactory()))
}
