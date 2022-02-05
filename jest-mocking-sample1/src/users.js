const axios = require('axios')

const BASE_URL = 'https://jsonplaceholder.typicode.com'

const getUsers = async () => {
  try {
    return await axios.get('https://jsonplaceholder.typicode.com/users')
  } catch (e) {
    return []
  }
}

module.exports = {
  getUsers,
  BASE_URL,
}
