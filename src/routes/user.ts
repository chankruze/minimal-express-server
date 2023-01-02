/*
Author: chankruze (chankruze@gmail.com)
Created: Tue Oct 18 2022 07:45:38 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import { Router, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import prisma from '../lib/prisma'
import config from '../config'
import { makeSerializable } from '../utils'

const router = Router()

router.get('/profile', async (req: Request, res: Response) => {
  try {
    // get the jwt token
    const token = req.signedCookies[`${config.APP_NAME}_user`]

    // verify token  signature
    const user = <jwt.JwtPayload>jwt.verify(token, process.env.JWT_SECRET)

    // get the user profile
    const profile = await prisma.profile.findUnique({
      where: {
        userId: user.id
      },
      include: {
        user: true
      }
    })

    res.json(makeSerializable(profile))
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        message: 'auth token is not provided'
      })
    }
  }
})

export default router
