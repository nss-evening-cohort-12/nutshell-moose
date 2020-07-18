import axios from 'axios';
import apiKeys from '../apiKeys.json';
import utils from '../utils';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getSeating = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/seating.json`)
    .then(({ data }) => resolve(utils.firebaseArray(data)))
    .catch((err) => reject(err));
});

const addTable = (newSeatingObj) => axios.post(`${baseUrl}/seating.json`, newSeatingObj);

// WIP: this function was to checkexisting table numbers and return the one table if it matched, and return null if not

// const getTableById = (tableNumber) => new Promise((resolve, reject) => {
//   axios.get(`${baseUrl}/seating.json?orderBy="tableNum"&equalTo"${tableNumber}"`)
//     .then(({ data }) => resolve(utils.firebaseArray(data)))
//     .catch((err) => reject(err));
// });

export default { getSeating, addTable };
