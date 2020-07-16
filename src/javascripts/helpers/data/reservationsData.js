import axios from 'axios';
import apiKeys from '../apiKeys.json';
import utils from '../utils';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getReservations = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/reservations.json`)
    .then(({ data }) => resolve(utils.firebaseArray(data)))
    .catch((err) => reject(err));
});

const getReservationById = (id) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/reservations/${id}.json`)
    // .then(({ data }) => resolve(utils.firebaseArray(data)))
    .then((result) => resolve(result.data))
    .catch((err) => reject(err));
});

export default { getReservations, getReservationById };
