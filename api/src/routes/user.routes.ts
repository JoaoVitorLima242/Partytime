import { Router } from 'express'
import UserController from '../controllers/User'

const routes = Router()

routes.get('/', (req, res) => {
  res.send('tega')
})

export default routes
