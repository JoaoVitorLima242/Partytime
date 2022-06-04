import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import UserSchema from '../models/User'

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
    const token = req.header('auth-header')
  }
}

export default new UserControllers()
