/*
Author: chankruze (chankruze@geekofia.in)
Created: Sun Feb 13 2022 19:05:12 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import os from 'os'
import { Prisma } from '@prisma/client'
import { Response } from 'express'

export const getNetWorkUrl = () => {
  const networkInterfaces = os.networkInterfaces()

  const validInterfaceKeys = Object.keys(networkInterfaces).filter(
    (nic) => !nic.toLowerCase().includes('lo')
  )

  const validInterfaces = Object.values(
    networkInterfaces[validInterfaceKeys[0]]
  ).filter(
    (alias) =>
      alias.family === 'IPv4' &&
      alias.address !== '127.0.0.1' &&
      !alias.internal
  )

  return validInterfaces[0].address || '0.0.0.0'
}

export const isDevEnv = () => process.env.NODE_ENV === 'development'

export const banner = (port) => {
  console.log('├───────────────────────────┤')
  console.log('├ 🚀 server is listening on ┤')
  console.log('├───────────────────────────┤')

  if (isDevEnv()) console.log(`└── <localhost>\thttp://localhost:${port}`)

  return console.log(`└── <network>\thttp://${getNetWorkUrl()}:${port}`)
}

export const makeSerializable = <T>(o: T): T => {
  return JSON.parse(JSON.stringify(o))
}

export const handleError = (e: Error, res: Response) => {
  console.error(e)

  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    // https://www.prisma.io/docs/reference/api-reference/error-reference#prisma-client-query-engine
    switch (e.code) {
      default:
        return res.status(400).json(
          makeSerializable({
            message: e.message
          })
        )
    }
  }

  return res.status(500).json(
    makeSerializable({
      message: e.message || 'something bad had happened in the server.'
    })
  )
}
