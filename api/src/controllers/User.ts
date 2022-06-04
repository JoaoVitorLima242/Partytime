import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import UserSchema from '../models/User'
import Token from '../helpers/Token'

type UpdateUser = {
    email: string;
    name: string;
    password?: string;
    updatedAt: Date
}

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
      name,
      email,
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

    const updateUser: UpdateUser = {
      email,
      name,
      updatedAt: new Date()
    }

    if (password !== confirmPassword) {
      return res.status(401).json({ error: 'As senhas não conferem!' })
    } else if (password === confirmPassword && password !== undefined) {
      const salt = await bcrypt.genSalt(12)
      const passwordHash = await bcrypt.hash(password, salt)

      updateUser.password = passwordHash
    }

    try {
      const updatedUser = await UserSchema.findOneAndUpdate({ _id: user._id }, { $set: updateUser }, { new: true })
      return res.json({ error: null, msg: 'Usuario atualizado com sucesso!', data: updateUser })
    } catch (error) {
      return res.status(401).json({ error })
    }
  }
}

export default new UserControllers()
