/*
Author: chankruze (chankruze@gmail.com)
Created: Sun Oct 16 2022 23:41:23 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import { PrismaClient } from '@prisma/client'

declare global {
  // eslint-disable-next-line no-var, no-unused-vars
  var prisma: PrismaClient
}

export {}
