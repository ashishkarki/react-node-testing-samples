const { UNPROCESSABLE_ENTITY, CREATED, NOT_FOUND, OK } = require('http-codes')
const request = require('supertest')

const app = require('./app')

describe('App', () => {
  it('should be able to load', () => {
    expect(true).toBe(true)
  })

  describe('GET ', () => {
    it('/todos should return an array of todos', async () => {
      const res = await request(app)
        .get('/todos')
        .expect(OK)
        .expect('Content-Type', /json/)

      expect(res.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            title: expect.any(String),
            completed: expect.any(Boolean),
          }),
        ]),
      )
    })

    it('/todos/:id should return specific todo by ID', async () => {
      const res = await request(app)
        .get('/todos/1')
        .expect(OK)
        .expect('Content-Type', /json/)

      expect(res.body).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          title: expect.any(String),
          completed: expect.any(Boolean),
        }),
      )
    })

    it('/todos/:id should return 404 if todo not found', async () => {
      const res = await request(app)
        .get('/todos/-1')
        .expect(NOT_FOUND)
        .expect('Content-Type', /json/)

      expect(res.body).toEqual(
        expect.objectContaining({
          message: 'Todo not found',
        }),
      )
    })
  })

  describe('POST', () => {
    it('/todos should create a new todo', async () => {
      const res = await request(app)
        .post('/todos')
        .send({
          title: 'test',
          completed: false,
        })
        .expect(CREATED)
        .expect('Content-Type', /json/)

      expect(res.body).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          title: 'test',
          completed: false,
        }),
      )
    })

    it('/todos should validate request body', async () => {
      const res = await request(app)
        .post('/todos')
        .send({
          title: '',
        })
        .expect(UNPROCESSABLE_ENTITY)
    })
  })
})
