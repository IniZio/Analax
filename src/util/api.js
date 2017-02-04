const api = 'https://analax-backend.herokuapp.com/'

export default {
  authUser: {
    type: 'POST',
    url: api + 'auth'
  },
  verifyToken: {
    type: 'POST',
    url: api + 'auth/token'
  },
  getPinsById: {
    type: 'GET',
    url: api + 'pins/'
  }
}
