import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getAllOrders = () => axios.get(`${baseUrl}/order.json`);

const getOrderByReserveId = (reservationsId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/order.json?orderBy="reservationsId"&equalTo="${reservationsId}"`)
    .then((response) => {
      const orderObjects = response.data;
      const orderArr = [];
      Object.keys(orderObjects).forEach((orderId) => {
        orderObjects[orderId].id = orderId;
        orderArr.push(orderObjects[orderId]);
      });
      // console.warn('this is the order obj to return ', orderArr);
      resolve(orderArr);
    })
    .catch((err) => reject(err));
});

const addorder = (newOrder) => axios.post(`${baseUrl}/order.json`, newOrder);

export default { getOrderByReserveId, addorder, getAllOrders };
