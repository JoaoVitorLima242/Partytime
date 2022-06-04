import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import UserSchema from '../models/User'

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

  public getUser = async (req: TokenRequest, res: Response, token: string): Promise<Response> => {
    if (!token) {
      return res.status(401).json({ error: 'Acesso negado!' })
    }

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
  }
}

export default new Token()
