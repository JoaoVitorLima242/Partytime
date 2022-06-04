import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

interface TokenRequest extends Request {
    user?: string | jwt.JwtPayload;
}

const checkToken = (req: TokenRequest, res: Response, next: NextFunction): Response => {
  const token = req.header('auth-token')

  if (!token) {
    return res.status(401).json({ error: 'Acesso negado!' })
  }

  try {
    const verified = jwt.verify(token, 'nossosecret')
    req.user = verified
    next()
  } catch (error) {
    res.status(400).json({ error: 'O token é invalido!' })
  }
}

export default checkToken
