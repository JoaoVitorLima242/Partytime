import { Router } from 'express'
import UserController from '../controllers/User'

const routes = Router()

routes.get('/:id', UserController.getUserById)

export default routes
