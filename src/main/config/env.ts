import dotenv from 'dotenv'
import path from 'path'

const envPath = (file: string): string => path.join(__dirname, file)

const envs = {
  dev: envPath('../../../.env.dev'),
  test: envPath('../../../.env.test')
}

dotenv.config({ path: envs[process.env.NODE_ENV ?? 'dev'] })

export const env = {
  PORT: process.env.PORT,
  API_OMNIBEES_URL: process.env.API_OMNIBEES_URL
}
