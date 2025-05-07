import axios from "axios";

const token = localStorage.getItem('token');
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export default {
  postNewBattle(battleData) {
    return axios.post('/battle', battleData);
  },

  getBattles() {
    return axios.get('/battles');
  },

};
