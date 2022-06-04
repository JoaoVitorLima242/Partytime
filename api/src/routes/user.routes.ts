import { Router } from 'express'
import UserController from '../controllers/User'
import Token from '../helpers/Token'

const routes = Router()

routes.get('/:id', Token.check, UserController.getUserById)
routes.put('/', Token.check, UserController.updateUserByToken)

export default routes
