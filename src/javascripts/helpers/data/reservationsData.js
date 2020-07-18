import moment from 'moment';
import axios from 'axios';
import apiKeys from '../apiKeys.json';
import utils from '../utils';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const timestamp = (reservation) => moment(`${reservation.date} ${reservation.time}`, 'YYYY-MM-DD hhmm').format('YYYYMMDDHHmm');

const getReservations = (date) => new Promise((resolve, reject) => {
  axios.get(date ? `${baseUrl}/reservations.json?orderBy="date"&equalTo="${date}"` : `${baseUrl}/reservations.json`)
    .then(({ data }) => {
      const reservations = utils.firebaseArray(data);
      reservations.sort((a, b) => ((timestamp(a) > timestamp(b)) ? 1 : -1));
      console.warn(moment(`${reservations[0].date} ${reservations[0].time}`, 'YYYY-MM-DD hhmm').format('YYYYMMDDHHmm'));
      resolve(reservations);
    })
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
