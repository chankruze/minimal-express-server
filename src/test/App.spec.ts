/*
Author: chankruze (chankruze@geekofia.in)
Created: Sun Feb 13 2022 15:31:30 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import axios from 'axios'
import { describe, it } from 'mocha'
import { expect } from 'chai'

const API_URL = 'http://localhost:6767'

describe('App', () => {
  it('server /auth/signup should create a new user', async () => {
    const data = {
      email: 'demo@mes.com',
      password: 'demo'
    }

    const response = await axios.post(`${API_URL}/auth/signup`, data)

    expect(response.status).to.equal(201)
    expect(response.data.message).to.equal('successfully signed up')
  })

  it('server /auth/signin should let a user sign in', async () => {
    const data = {
      email: 'demo@mes.com',
      password: 'demo'
    }

    const response = await axios.post(`${API_URL}/auth/signin`, data)

    expect(response.status).to.equal(200)
    expect(response.data.message).to.equal('you are signed in successfully')
  })

  it('server /auth/signin (wrong email) should give 404 not found response', async () => {
    const data = {
      email: 'wrong@mes.com',
      password: 'demo'
    }

    try {
      await axios.post(`${API_URL}/auth/signin`, data)
    } catch (error) {
      expect(error.response.status).to.equal(404)
      expect(error.response.data.message).to.equal(
        `no user exists with ${data.email}`
      )
    }
  })

  it('server /auth/signin (wrong password) should restrict a user from signing in (401 unauthorized)', async () => {
    const data = {
      email: 'demo@mes.com',
      password: 'wrong'
    }

    try {
      await axios.post(`${API_URL}/auth/signin`, data)
    } catch (error) {
      expect(error.response.status).to.equal(401)
      expect(error.response.data.message).to.equal('wrong password provided')
    }
  })
})
