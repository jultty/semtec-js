import { expect, describe } from '@jest/globals'
import app from '../src/app'
import request from 'supertest'

let server: any

beforeEach((done) => {
  server = app.listen(3000, () => {
    done()
  })
})

afterEach((done) => {
  server.close(() => {
    done()
  })
})

describe('GET /', () => {
  it('sends "OK"', async () => {
    const response = await request(app).get('/')
    expect(response.status).toBe(200)
    expect(response.text).toBe('OK')
  })
})


