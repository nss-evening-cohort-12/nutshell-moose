import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getAllRS = () => axios.get(`${baseUrl}/reservationSeating.json`);

const addReservationSeating = (resSeatObj) => axios.post(`${baseUrl}/reservationSeating.json`, resSeatObj);

const updateReservationSeating = (reservationSeatingId, editedObject) => axios.put(`${baseUrl}/reservationSeating/${reservationSeatingId}.json`, editedObject);

const delRS = (rsId) => axios.delete(`${baseUrl}/reservationSeating/${rsId}.json`);

export default {
  addReservationSeating,
  updateReservationSeating,
  getAllRS,
  delRS,
};
