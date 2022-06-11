import { Router } from 'express'
import UserController from '../controllers/User'
import Token from '../helpers/Token'

const routes = Router()

routes.get('/', Token.check, UserController.getUserByToken)
routes.put('/', Token.check, UserController.updateUserByToken)

export default routes
