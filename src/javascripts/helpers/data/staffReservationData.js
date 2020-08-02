import axios from 'axios';
import apiKeys from '../apiKeys.json';
import utils from '../utils';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getStaffReservations = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/staffReservations.json`)
    .then(({ data }) => resolve(utils.firebaseArray(data)))
    .catch((err) => reject(err));
});

const getStaffResByResId = (resId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/staffReservations.json?orderBy="reservationsId"&equalTo="${resId}"`)
    .then(({ data }) => resolve(utils.firebaseArray(data)))
    .catch((err) => reject(err));
});

const getStaffReservationById = (StaffReservationId) => axios.get(`${baseUrl}/staffReservations/${StaffReservationId}.json`);

const deleteStaffReservationById = (StaffReservationId) => axios.delete(`${baseUrl}/staffReservations/${StaffReservationId}.json`);

const addStaffReservation = (newStaffReservationObj) => axios.post(`${baseUrl}/staffReservations.json`, newStaffReservationObj);

const updateStaffReservation = (StaffReservationId, editedStaffReservation) => axios.put(`${baseUrl}/staffReservations/${StaffReservationId}.json`, editedStaffReservation);

export default {
  getStaffReservations,
  getStaffReservationById,
  deleteStaffReservationById,
  addStaffReservation,
  updateStaffReservation,
  getStaffResByResId,
};
