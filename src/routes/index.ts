/*
Author: chankruze (chankruze@geekofia.in)
Created: Sun Feb 13 2022 15:43:14 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
  res.json({
    message: 'Hello World!'
  })
})

router.get('/random/:min/:max', (req, res) => {
  const [min, max] = Object.keys(req.params).map((k) => parseInt(req.params[k]))

  const randomNo = Math.floor(Math.random() * (max - min + 1) + min)

  res.json({
    randomNo
  })
})

export default router
