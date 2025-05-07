import axios from 'axios';

/**
 * This service class is used to interact with the server's Authentication API.
 * All methods return a Promise so that the calling code can handle both success and
 * error responses appropriately.
 */
export default {

  login(user) {
    return axios.post('/login', user);
  },

  register(user) {
    return axios.post('/register', user);
  },

  getUserProfile(userId) {
    return axios.get(`/users/${userId}`);
  },

}
