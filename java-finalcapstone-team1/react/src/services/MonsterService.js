import axios from "axios";
const API_URL = "/monsters";

const token = localStorage.getItem('token');
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

const getAllMonsters = () => {
  return axios.get(API_URL);
};

const getMonsterById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

const getActiveMonsters = () => {
  return axios.get(`${API_URL}/active`);
};

export default {
  getActiveMonsters,
  getAllMonsters,
  getMonsterById,
};
