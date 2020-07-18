import axios from 'axios';
import apiKeys from '../apiKeys.json';
import utils from '../utils';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getReservations = (date) => new Promise((resolve, reject) => {
  axios.get(date ? `${baseUrl}/reservations.json?orderBy="date"&equalTo="${date}"` : `${baseUrl}/reservations.json`)
    .then(({ data }) => resolve(utils.firebaseArray(data)))
    .catch((err) => reject(err));
});

const getReservationById = (id) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/reservations/${id}.json`)
    .then((result) => resolve(result.data))
    .catch((err) => reject(err));
});

const addReservation = (newResObj) => axios.post(`${baseUrl}/reservations.json`, newResObj);

const deleteReservation = (reservationId) => axios.delete(`${baseUrl}/reservations/${reservationId}.json`);

const updateReservation = (reservationId, newResObject) => new Promise((resolve, reject) => {
  axios.put(`${baseUrl}/reservations/${reservationId}.json`, newResObject)
    .then(() => resolve())
    .catch((err) => reject(err));
});

export default {
  getReservations, getReservationById, addReservation, deleteReservation, updateReservation,
};
