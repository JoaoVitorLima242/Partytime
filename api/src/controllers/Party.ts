import { Request, Response } from 'express'
import multer from 'multer'
import jwt from 'jsonwebtoken'
import UserSchema from '../models/User'
import PartySchema from '../models/Party'
import Token from '../helpers/Token'
import { diskStorage } from '../helpers/diskStorage'

class PartyControllers {
  public index = (req: Request, res: Response): Response => {
    return res.send('partyyy')
  }
}

export default new PartyControllers()
