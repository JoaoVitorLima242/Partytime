import { Router } from 'express'
import UserController from '../controllers/User'

const routes = Router()

routes.get('/', UserController.index)

export default routes
