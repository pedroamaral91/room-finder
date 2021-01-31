import 'module-alias/register'
import { env } from '@/main/config/env'
import app from './config/app'

app.listen(env.PORT, () => console.log('ready..'))
