import axios from 'axios';
import apiKeys from '../apiKeys.json';
import utils from '../utils';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getIngredients = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/ingredients.json`)
    .then(({ data }) => resolve(utils.firebaseArray(data)))
    .catch((err) => reject(err));
});

const getIngredientById = (ingredientId) => axios.get(`${baseUrl}/ingredients/${ingredientId}.json`);

const deleteIngredient = (ingredientId) => axios.delete(`${baseUrl}/ingredients/${ingredientId}.json`);

const addIngredient = (ingredientObj) => axios.post(`${baseUrl}/ingredients.json`, ingredientObj);

const updateIngredients = (ingredientId, editedIngredient) => axios.put(`${baseUrl}/ingredients/${ingredientId}.json`, editedIngredient);

export default {
  getIngredients,
  getIngredientById,
  deleteIngredient,
  addIngredient,
  updateIngredients,
};
