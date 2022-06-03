import { Router } from 'express'
import UserController from '../controllers/User'

const routes = Router()

routes.post('/register', UserController.Register)

export default routes
