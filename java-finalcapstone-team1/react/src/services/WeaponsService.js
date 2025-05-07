import axios from "axios";

const API_URL = "/weapons"; 
const getAllWeapons = () => {
  return axios.get(API_URL);
};
const getWeaponById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};
const getCrudeWeaponByClass = (classString) => {
  return axios.get(`${API_URL}/crude/${classString}`);
};
export default {
  getCrudeWeaponByClass,
  getAllWeapons,
  getWeaponById,
};
