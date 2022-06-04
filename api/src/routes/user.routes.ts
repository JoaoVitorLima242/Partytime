import { Router } from 'express'
import UserController from '../controllers/User'
import checkToken from '../helpers/check-token'

const routes = Router()

routes.get('/:id', checkToken, UserController.getUserById)

export default routes
