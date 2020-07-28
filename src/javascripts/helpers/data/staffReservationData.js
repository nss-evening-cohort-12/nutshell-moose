import axios from 'axios';
import apiKeys from '../apiKeys.json';
import utils from '../utils';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getStaffReservations = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/StaffReservation.json`)
    .then(({ data }) => resolve(utils.firebaseArray(data)))
    .catch((err) => reject(err));
});

const getStaffReservationById = (StaffReservationId) => axios.get(`${baseUrl}/StaffReservation/${StaffReservationId}.json`);

const deleteStaffReservationById = (StaffReservationId) => axios.delete(`${baseUrl}/StaffReservation/${StaffReservationId}.json`);

const addStaffReservation = (newStaffReservationObj) => axios.post(`${baseUrl}/StaffReservation.json`, newStaffReservationObj);

const updateStaffReservation = (StaffReservationId, editedStaffReservation) => axios.put(`${baseUrl}/StaffReservation/${StaffReservationId}.json`, editedStaffReservation);

export default {
  getStaffReservations,
  getStaffReservationById,
  deleteStaffReservationById,
  addStaffReservation,
  updateStaffReservation,
};