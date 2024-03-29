/*
Author: chankruze (chankruze@gmail.com)
Created: Sun Oct 16 2022 23:45:06 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import { PrismaClient } from '@prisma/client'
import { isDev } from '../utils'

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more:
// https://pris.ly/d/help/next-js-best-practices

let prisma: PrismaClient

if (isDev()) {
  prisma = new PrismaClient()
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }
  prisma = global.prisma
}

export default prisma
