/* eslint-disable node/no-path-concat */
import { Express, Router } from 'express'
import { adaptRoute } from '@/main/adapters'
import { roomFinderControllerFactory } from '@/main/factories'

export default (app: Express): void => {
  const router = Router()
  app.use(router)
  router.post('/buscar', adaptRoute(roomFinderControllerFactory()))
}
