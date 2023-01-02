/*
Author: chankruze (chankruze@gmail.com)
Created: Mon Jan 02 2023 13:59:02 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2023 and beyond
*/

import { Response } from 'express'
import { Prisma } from '@prisma/client'
import { makeSerializable } from './misc'

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
