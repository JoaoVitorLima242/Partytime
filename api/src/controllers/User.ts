import { Request, Response } from 'express'

class UserControllers {
  public async index (req: Request, res: Response): Promise<Response> {
    return res.send('teste')
  }
}

export default new UserControllers()
