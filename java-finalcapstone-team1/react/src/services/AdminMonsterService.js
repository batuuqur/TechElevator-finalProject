import axios from "axios";

const API_URL = "/adminMonsterPicks";

const submitAdminPicks = (adminMonsterPicksDTO) => {
  return axios.post(API_URL, adminMonsterPicksDTO);
};

export default {
  submitAdminPicks,
};
