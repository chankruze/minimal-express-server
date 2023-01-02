/*
Author: chankruze (chankruze@gmail.com)
Created: Sun Oct 16 2022 23:58:58 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import config from '../config'

export const iam = (options?) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // get the jwt token
      const token = req.signedCookies[`${config.APP_NAME}_user`]

      // verify token  signature
      const user = <jwt.JwtPayload>jwt.verify(token, process.env.JWT_SECRET)

      if (user) {
        return next()
      }
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        return res.status(401).json({
          message: 'auth token is not provided'
        })
      }
      if (error instanceof jwt.TokenExpiredError) {
        return res.status(401).json({
          message: 'your token is expired'
        })
      }
    }

    return res.status(401).json({
      message: 'you are unauthenticated'
    })
  }
}
