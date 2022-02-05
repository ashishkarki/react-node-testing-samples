const axios = require('axios')

const { BASE_URL, getUsers } = require('../src/users')

jest.mock('axios')

describe('Users test => ', () => {
  it('should return a user with ID: 1', async () => {
    const testUser = {
      id: 1,
      name: 'Leanne Graham',
    }

    const testResponse = {
      data: testUser,
    }

    axios.get.mockImplementationOnce(() => Promise.resolve(testResponse))
    // axios.get.mockResolvedValueOnce(testResponse)

    const result = await getUsers()

    expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/users`)
    expect(result.data).toEqual(testUser)
  })
})
