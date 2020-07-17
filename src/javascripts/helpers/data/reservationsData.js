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

const addReservation = (newResObj) => axios.post(`${baseUrl}/reservations.json`, newResObj);

const deleteReservation = (reservationId) => axios.delete(`${baseUrl}/reservations/${reservationId}.json`);

// const updatePin = (pinId, newBoard) => new Promise((resolve, reject) => {
//   axios.get(`${baseUrl}/pins/${pinId}.json`)
//     .then((pin) => {
//       const newPinObj = pin.data;
//       newPinObj.boardId = newBoard;
//       axios.put(`${baseUrl}/pins/${pinId}.json`, newPinObj)
//         .then(resolve());
//     })
//     .catch((err) => reject(err));
// });

const updateReservation = (reservationId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/reservations/${reservationId}.json`)
    .then((reservation) => {
      const existingResObj = reservation.data;
      console.error(existingResObj);
    })
    .catch((err) => reject(err));
});

export default {
  getReservations, getReservationById, addReservation, deleteReservation, updateReservation,
};
