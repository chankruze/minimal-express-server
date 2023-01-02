/*
Author: chankruze (chankruze@gmail.com)
Created: Mon Jan 02 2023 13:58:16 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2023 and beyond
*/

import { getNetWorkUrl } from './net'

export const isDev = () => process.env.NODE_ENV === 'development'
export const isProd = () => process.env.NODE_ENV === 'production'
export const isStagging = () => process.env.NODE_ENV === 'stagging'
export const isPreview = () => process.env.NODE_ENV === 'preview'

export const banner = (port) => {
  console.log('├───────────────────────────┤')
  console.log('├ 🚀 server is listening on ┤')
  console.log('├───────────────────────────┤')

  if (isDev()) console.log(`└── <localhost>\thttp://localhost:${port}`)

  return console.log(`└── <network>\thttp://${getNetWorkUrl()}:${port}`)
}

export const makeSerializable = <T>(o: T): T => {
  return JSON.parse(JSON.stringify(o))
}
