import axios from "axios";

const API_URL = "/armors"; 

const getAllArmors = () => {
  return axios.get(API_URL);
};

const getArmorById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

const getCrudeArmorByClass = (classString) => {
  return axios.get(`${API_URL}/crude/${classString}`);
};

export default {
  getCrudeArmorByClass,
  getAllArmors,
  getArmorById,
};
















