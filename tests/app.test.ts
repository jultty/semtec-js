import {describe, expect } from '@jest/globals'
import app from '../src/app'
import request from 'supertest'
import { term, termSchema } from '../src/models/term'

let server: any
let memory_term: any

describe('semtec-js', () => {
  beforeAll((done) => {
    server = app.listen(3000, () => {

    memory_term = new term({ term: 'memory', definition: 'All of the addressable storage space in a processing unit and other internal storages that is used to execute instructions.', source: 'Dictionary of IBM & Computing Terminology'})

      done()
    })
  })

  afterAll((done) => {
    server.close(() => {
      done()
    })
  })

  describe('the server', () => {
    it('replies with 200 "OK" to a GET request at the root', async () => {
      const response = await request(server).get('/')
      expect(response.status).toBe(200)
      expect(response.text).toBe('OK')
    })
  })

  describe('the term "memory"', () => {
    it('is defined', () => {
      expect(memory_term).toBeDefined()
    })

    it('has a definition containing the word "storage"', () => {
      expect(memory_term.definition).toContain('storage')
    })

    it('has a source containing the word "Dictionary"', () => {
      expect(memory_term.source).toContain('Dictionary')
    })
  })
})

