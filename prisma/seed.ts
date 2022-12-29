/*
Author: chankruze (chankruze@gmail.com)
Created: Mon Oct 17 2022 18:41:00 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
  {
    email: 'john.doe@mes.com',
    password: '$2a$12$M.DPr3ktx3YTA1//byp9ieo.nr.cYsh7hGdt38T/5y5DaKLP6dhDu', // 123
    role: 'admin',
    profile: {
      create: {
        name: 'John Doe',
        bio: '🤴🏻Maa Ka Magarmachh 😎'
      }
    }
  },
  {
    email: 'jane.doe@mes.com',
    password: '$2a$12$M.DPr3ktx3YTA1//byp9ieo.nr.cYsh7hGdt38T/5y5DaKLP6dhDu', // 123
    role: 'user',
    profile: {
      create: {
        name: 'Jane Doe',
        bio: '😘Papa KI Paree👰'
      }
    }
  }
]

const main = async () => {
  for (const user of userData) {
    const result = await prisma.user.create({
      data: user
    })
    console.log(result)
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
