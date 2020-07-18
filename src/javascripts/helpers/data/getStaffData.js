import axios from 'axios';
import apiKeys from '../apiKeys.json';
import utils from '../utils';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getStaff = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/staff.json`)
    .then(({ data }) => resolve(utils.firebaseArray(data)))
    .catch((err) => reject(err));
});

const getStaffByType = (staffType) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/staff.json?orderBy="type"&equalTo="${staffType}"`)
    .then(({ data }) => resolve(utils.firebaseArray(data)))
    .catch((err) => reject(err));
});

const getStaffById = (staffId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/staff.json?orderBy="type"&equalTo="${staffId}"`)
    .then(({ data }) => resolve(utils.firebaseArray(data)))
    .catch((err) => reject(err));
});

const addStaff = (newStaffObj) => axios.post(`${baseUrl}/staff.json`, newStaffObj);

const deleteStaff = (staffId) => axios.delete(`${baseUrl}/staff/${staffId}.json`);

const editStaff = (staffId, editedStaff) => axios.put(`${baseUrl}/staff/${staffId}.json`, editedStaff);

export default {
  getStaff,
  addStaff,
  deleteStaff,
  editStaff,
  getStaffByType,
  getStaffById,
};
