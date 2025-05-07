import axios from 'axios';
//Fixes the random axios errors in our console
const token = localStorage.getItem('token');
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export default {

    getShops() {
        return axios.get(`/shop`);
    },

    getStartingShops() {
        return axios.get(`/startingshop`);
    },

}