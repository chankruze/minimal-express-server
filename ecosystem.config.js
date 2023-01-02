/*
Author: chankruze (chankruze@gmail.com)
Created: Mon Jan 02 2023 14:13:16 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2023 and beyond
*/

import config from './src/config'

module.exports = {
  apps: [
    {
      name: `${config.APP_NAME}`,
      script: './dist/index.js',
      instances: 3,
      exec_mode: 'cluster',
      env_production: {
        NODE_ENV: 'production'
      },
      env_development: {
        NODE_ENV: 'development'
      }
    }
  ]
}
