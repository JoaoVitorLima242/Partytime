import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

class App {
  public express : express.Application

  public constructor () {
    this.express = express()
    this.middlewares()
    this.database()
    this.routes()
  }

  private middlewares () :void {
    this.express.use(express.json())
    this.express.use(cors())
  }

  private database () :void {
    mongoose.connect('mongodb://27017/partytime', { useNewUrlParser: true, useUnifiedTopology: true })
  }

  private routes () :void {
    this.express.get('/', (req, res) => {
      return res.send('API is runnig!')
    })
  }
}

export default new App().express