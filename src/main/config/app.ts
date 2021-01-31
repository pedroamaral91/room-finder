import setupMiddlewares from './middlewares'
import setupRoutes from '@/main/routes'

import express from 'express'

const app = express()
setupMiddlewares(app)
setupRoutes(app)
export default app
