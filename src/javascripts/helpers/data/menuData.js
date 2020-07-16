import axios from 'axios';
import apiKeys from '../apiKeys.json';
import utils from '../utils';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getMenuItems = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/menuItem.json`)
    .then(({ data }) => resolve(utils.firebaseArray(data)))
    .catch((err) => reject(err));
});

const getMenuItemById = (menuItemId) => axios.get(`${baseUrl}/menuItem/${menuItemId}.json`);

const deleteMenuItem = (menuItemId) => axios.delete(`${baseUrl}/menuItem/${menuItemId}.json`);

const addMenuItem = (newMenuItemObj) => axios.post(`${baseUrl}/menuItem.json`, newMenuItemObj);

const updateMenuItem = (menuItemId, editedMenuItem) => axios.put(`${baseUrl}/menuItem/${menuItemId}.json`, editedMenuItem);

export default {
  getMenuItems,
  getMenuItemById,
  deleteMenuItem,
  addMenuItem,
  updateMenuItem,
};
