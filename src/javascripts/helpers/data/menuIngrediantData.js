import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getMenuIngByMenuId = (menuId) => new Promise((resolve, reject) => {
  console.warn('inside getMenuIngByMenuId before call the db axios');
  axios.get(`${baseUrl}/menuIngredient.json?orderBy="menuId"&equalTo="${menuId}"`)
    .then((response) => {
      const menuIngObjects = response.data;
      const menuIngreds = [];
      Object.keys(menuIngObjects).forEach((menuIngrediantsId) => {
        menuIngObjects[menuIngrediantsId].id = menuIngrediantsId;
        menuIngreds.push(menuIngObjects[menuIngrediantsId]);
      });
      resolve(menuIngreds);
    })
    .catch((err) => reject(err));
});

export default { getMenuIngByMenuId };
