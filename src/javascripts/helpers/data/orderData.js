import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getAllOrders = () => axios.get(`${baseUrl}/order.json`);

export default { getAllOrders };
