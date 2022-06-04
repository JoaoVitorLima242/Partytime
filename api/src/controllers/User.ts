import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import UserSchema from '../models/User'
import Token from '../helpers/Token'

class UserControllers {
  public async getUserById (req: Request, res: Response): Promise<Response> {
    const {
      id
    } = req.params

    try {
      const user = await UserSchema.findOne({ _id: id }, { password: 0 })
      return res.json({ error: null, user })
    } catch (error) {
      res.status(400).json({ error: 'O usuário não foi encontrado!' })
    }
  }

  public async updateUserByToken (req: Request, res: Response): Promise<Response> {
    const {
      id,
      password,
      confirmPassword
    } = req.body

    const token = req.header('auth-token')
    if (!token) {
      return res.status(401).json({ error: 'Acesso negado!' })
    }
    const user = await Token.getUser(res, token)

    if (user._id.toString() !== id) {
      return res.status(401).json({ error: 'Acesso negado!' })
    }
  }
}

export default new UserControllers()
