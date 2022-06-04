import { Router } from 'express'
import UserController from '../controllers/User'
import bcrypt from 'bcrypt'
import UserSchema from '../models/User'

const routes = Router()

routes.get('/:id', UserController.index)

export default routes
