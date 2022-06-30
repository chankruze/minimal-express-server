/*
Author: chankruze (chankruze@geekofia.in)
Created: Sun Feb 13 2022 15:31:30 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import axios from 'axios'
import { describe, it } from 'mocha'
import { expect } from 'chai'

describe('App', () => {
  it('server / should return 200', async () => {
    const response = await axios.get('http://localhost:6767/')
    expect(response.status).to.equal(200)
  })

  it('server /random/50/50 should return only 50', async () => {
    const response = await axios.get('http://localhost:6767/random/50/50')
    expect(response.data.randomNo).to.equal(50)
  })

  it('server /random/4/5 should return 4 or 5', async () => {
    const response = await axios.get('http://localhost:6767/random/4/5')
    expect(response.data.randomNo).to.greaterThanOrEqual(4).lessThanOrEqual(5)
  })

  it('server /random/20/50 should return 20 or 50', async () => {
    const response = await axios.get('http://localhost:6767/random/20/50')
    expect(response.data.randomNo).to.greaterThanOrEqual(20).lessThanOrEqual(50)
  })
})
