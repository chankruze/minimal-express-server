/*
Author: chankruze (chankruze@gmail.com)
Created: Mon Oct 17 2022 18:41:00 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'John Doe',
    email: 'john.doe@mes.com',
    password: '123',
    role: 'admin'
  },
  {
    name: 'Jane Doe',
    email: 'jane.doe@mes.com',
    password: '123',
    role: 'user'
  }
]

async function main () {
  console.log('🌱 seeding ...')
  for (const user of userData) {
    const result = await prisma.user.create({
      data: user
    })
    console.log(result)
  }
  console.log('🌱 seeding done.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
