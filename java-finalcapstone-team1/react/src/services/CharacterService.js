import axios from 'axios';
//Fixes the random axios errors in our console
const token = localStorage.getItem('token');
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export default {

    getCharacters() {
      return axios.get('/characters');
    },

    getAliveCharacters() {
        return axios.get('/characters/alive');
    },

    getLeaderboard() {
        return axios.get('/leaderboard');
    },

    getFallenHeroes(){
        return axios.get('/fallen-heroes');
    },

    getDeadCharacters() {
        return axios.get('/characters/dead');
    },

    getAllAliveCharacters() {
        return axios.get('/all-characters/alive');
    },

    getAllDeadCharacters() {
        return axios.get('/all-characters/dead');
    },

    getCharacterById(characterId) {
        return axios.get(`/characters/${characterId}`);
    },

    postNewCharacter(character) {
        return axios.post('/characters', character);
    },

    updateCharacter(character){
        return axios.put('/characters', character)
    },
    
    deleteCharacter(characterId){
        return axios.delete(`/characters/${characterId}`);        
    }
  }
  