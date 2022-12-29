/*
Author: chankruze (chankruze@gmail.com)
Created: Mon Oct 17 2022 23:26:08 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import { Request, Response, Router } from 'express'
import prisma from '../lib/prisma'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { handleError } from '../utils'

const router = Router()

router.post('/signup', async (req: Request, res: Response) => {
  try {
    // if the email field is empty
    if (!req.body.email) {
      throw new Error("Email can't be empty.")
    }

    // if the password field is empty
    if (!req.body.password) {
      throw new Error("Password can't be empty.")
    }

    if (req.body.email && req.body.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, 12)

      await prisma.user.create({
        data: {
          email: req.body.email,
          password: hashedPassword,
          role: req.body.role || 'user'
        }
      })

      res.status(201).json({
        message: 'successfully signed up'
      })
    }
  } catch (error) {
    return handleError(error, res)
  }
})

router.post('/signin', async (req: Request, res: Response) => {
  try {
    // if the email field is empty
    if (!req.body.email) {
      throw new Error("Email can't be empty.")
    }

    // if the password field is empty
    if (!req.body.password) {
      throw new Error("Password can't be empty.")
    }

    if (req.body.email && req.body.password) {
      // check in the db if there is any user with the given email
      const user = await prisma.user.findUnique({
        where: {
          email: req.body.email
        }
      })

      // if user don't exists
      if (!user) {
        return res.status(404).json({
          message: `no user exists with ${req.body.email}`
        })
      }

      // compare password hash
      const isMatch = await bcrypt.compare(req.body.password, user.password)

      // check password is matched or not
      if (!isMatch) {
        return res.status(401).json({
          message: 'wrong password provided'
        })
      }

      // create the jwt token
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: user.role
        },
        process.env.JWT_SECRET,
        {
          expiresIn: 1000 * 60 * 10
        }
      )

      // attach the jwt token to the response cookie
      res
        .cookie('mes-user', token, {
          maxAge: 1000 * 60 * 10,
          httpOnly: true,
          signed: true,
          secure: process.env.NODE_ENV === 'production'
        })
        .json({
          message: 'you are signed in successfully'
        })
    }
  } catch (error) {
    return handleError(error, res)
  }
})

export default router
