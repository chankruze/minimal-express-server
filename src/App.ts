/*
Author: chankruze (chankruze@geekofia.in)
Created: Sun Feb 13 2022 15:31:12 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import cookieparser from 'cookie-parser'
// custom middlewares
import { iam } from './middlewares/iam'
// routes
import authRoutes from './routes/auth'
import userRoutes from './routes/user'

// update this according to the frontend to be able to
// store the cookie to localstorage with axios
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true
}

class App {
  public app

  constructor () {
    this.app = express()
    this.useMiddlewares()
    this.mountRoutes()
  }

  private useMiddlewares (): void {
    this.app.use(
      helmet(),
      cors(corsOptions),
      morgan('dev'),
      express.json(),
      express.urlencoded({ extended: false }),
      cookieparser(process.env.COOKIE_SECRET)
    )
  }

  private mountRoutes (): void {
    // mount routes
    this.app.use('/auth', authRoutes)
    this.app.use('/user', iam(), userRoutes)
  }
}

export default new App().app
