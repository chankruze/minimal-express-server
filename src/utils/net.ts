/*
Author: chankruze (chankruze@gmail.com)
Created: Mon Jan 02 2023 13:57:53 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2023 and beyond
*/

import os from 'os'

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
