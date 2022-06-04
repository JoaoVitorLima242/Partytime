import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import UserSchema from '../models/User'
import { UserInterface } from '../models/User/index.d'

interface TokenRequest extends Request {
  user?: string | jwt.JwtPayload;
}

class Token {
  public check = (req: TokenRequest, res: Response, next: NextFunction): Response => {
    const token = req.header('auth-token')

    if (!token) {
      return res.status(401).json({ error: 'Acesso negado!' })
    }

    try {
      const verified = jwt.verify(token, process.env.TOKEN_SECRET)
      req.user = verified
      next()
    } catch (error) {
      res.status(400).json({ error: 'O token é invalido!' })
    }
  }

  public getUser = async (res: Response, token: string): Promise<UserInterface | null> => {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
    if (!token) {
      res.status(401).json({ error: 'Acesso negado!' })
      return null
    }
    const user = await UserSchema.findOne({ _id: (<jwt.JwtPayload>decoded).id })

    return user
  }
}

export default new Token()
