import { Router } from 'express'
import UserController from '../controllers/User'
import TokenHelpers from '../helpers/Token'

const routes = Router()

routes.get('/:id', TokenHelpers.check, UserController.getUserById)
/* routes.put('/', TokenHelpers.check, UserController.updateUserByToken)
 */
export default routes
