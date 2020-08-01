import reservationsData from './reservationsData';
import utils from '../utils';
import orderData from './orderData';
import menuIngrediantData from './menuIngrediantData';
import ingredData from './ingredData';

const getIngredsByfilteredOrder = (filteredOrdersList) => new Promise((resolve, reject) => {
  // Get all menungredients
  menuIngrediantData.getAllMenuIngredients()
    .then((menuIngredients) => {
      const menuIngredientsList = utils.firebaseArray(menuIngredients.data);
      // console.warn(menuIngredientsList);
      const selectedIngredientList = [];
      // filter only menuingredients that were ordered by menuId
      filteredOrdersList.forEach((menuItem) => {
        const filteredMeuIngredientList = menuIngredientsList.filter((m) => m.menuId === menuItem.menuId);
        selectedIngredientList.push(...filteredMeuIngredientList);
      });
      // console.warn(selectedIngredientList);
      // just get the clean list of ingredients used in those orders or menu items
      // ["ingredient9", "ingredient2", "ingredient7", "ingredient1", ....]
      const cleanIngredientsList = selectedIngredientList.map((x) => x.ingredientId);
      // console.warn(cleanIngredientsList);

      // get the distinct values of ingredient and their count
      // { ingredient7: 25, ingredient4: 15, ingredient2: 10, ingredient1: 5, ingredient8: 5, ...}
      const uniqueValueAndCount = {};
      cleanIngredientsList.forEach((ingredient) => {
        if (ingredient in uniqueValueAndCount) {
          uniqueValueAndCount[ingredient] += 1;
        } else {
          uniqueValueAndCount[ingredient] = 1;
        }
      });

      // console.warn(uniqueValueAndCount);
      const ingredientsUsed = Object.keys(uniqueValueAndCount);
      const uniqueNameAndCount = {};
      // get all the raw ingredients
      ingredData.getIngredients()
        .then((ingredients) => {
          // filter the raw ingredients based on the ingredients used in the orders
          ingredientsUsed.forEach((ingredient) => {
            const filteredIngredients = ingredients.filter((m) => m.id === ingredient);
            // insert the items in the uniqueNameAndCount object
            uniqueNameAndCount[filteredIngredients[0].name] = uniqueValueAndCount[ingredient];
          });
          // console.warn(uniqueNameAndCount);
          // prints {Beef: 25, Potato: 15, Spinach: 10, Rice: 5, Chicken: 5, ...}
          resolve(uniqueNameAndCount);
        });
    })
    .catch((err) => reject(err));
});

const get7DayIngredAmount = (pickDate2, pickDate1) => new Promise((resolve, reject) => {
  reservationsData.getReservationsByDateRange(pickDate2, pickDate1)
    .then((response) => {
      const reservationsList = utils.firebaseArray(response.data);
      // get all the orders
      // console.warn(reservationsList);
      orderData.getAllOrders()
        .then((orders) => {
          const ordersList = utils.firebaseArray(orders.data);
          // console.warn(ordersList);
          const filterdOrdersList = [];
          // filter orders list by reservations in the date ranges
          reservationsList.forEach((reservations) => {
            const filteredList = ordersList.filter((p) => p.reservationsId === reservations.id);
            filterdOrdersList.push(...filteredList);
          });
          getIngredsByfilteredOrder(filterdOrdersList)
            .then((uniqueNameAndCount) => {
              resolve(uniqueNameAndCount);
            });
        });
    })
    .catch((err) => reject(err));
});

const getOneDayIngredAmount = (pickDate1) => new Promise((resolve, reject) => {
  reservationsData.getReservations(pickDate1)
    .then((reservationsList) => {
      // get all the orders
      // console.warn(reservationsList);
      orderData.getAllOrders()
        .then((orders) => {
          const ordersList = utils.firebaseArray(orders.data);
          // console.warn(ordersList);
          const filterdOrdersList = [];
          // filter orders list by reservations in the date ranges
          reservationsList.forEach((reservations) => {
            const filteredList = ordersList.filter((p) => p.reservationsId === reservations.id);
            filterdOrdersList.push(...filteredList);
          });
          getIngredsByfilteredOrder(filterdOrdersList)
            .then((uniqueNameAndCount) => {
              resolve(uniqueNameAndCount);
            });
        });
    })
    .catch((err) => reject(err));
});

const getAllDayIngredAmount = () => new Promise((resolve, reject) => {
  reservationsData.getAllReservations()
    .then((allReservations) => {
      const reservationsList = utils.firebaseArray(allReservations.data);
      // get all the orders
      console.warn(reservationsList);
      orderData.getAllOrders()
        .then((orders) => {
          const ordersList = utils.firebaseArray(orders.data);
          console.warn(ordersList);
          const filterdOrdersList = [];
          // filter orders list by reservations in the date ranges
          reservationsList.forEach((reservations) => {
            const filteredList = ordersList.filter((p) => p.reservationsId === reservations.id);
            filterdOrdersList.push(...filteredList);
          });
          getIngredsByfilteredOrder(filterdOrdersList)
            .then((uniqueNameAndCount) => {
              resolve(uniqueNameAndCount);
            });
        });
    })
    .catch((err) => reject(err));
});

export default { get7DayIngredAmount, getOneDayIngredAmount, getAllDayIngredAmount };
