/*
Author: chankruze (chankruze@gmail.com)
Created: Mon Jan 02 2023 14:00:42 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2023 and beyond
*/

import { User } from '@prisma/client'
import jwt from 'jsonwebtoken'

export const generateJWT = (user: User) => {
  return jwt.sign(
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
}
