import reservationsData from './reservationsData';
import utils from '../utils';
import orderData from './orderData';
import menuIngrediantData from './menuIngrediantData';
import ingredData from './ingredData';

const get7DayIngredAmount = (pickDate2, pickDate1) => new Promise((resolve, reject) => {
  reservationsData.getReservationsByDateRange(pickDate2, pickDate1)
    .then((response) => {
      const reservationsList = utils.firebaseArray(response.data);
      // get all the orders
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
          console.warn(filterdOrdersList);
          // Get all menungredients
          menuIngrediantData.getAllMenuIngredients()
            .then((menuIngredients) => {
              const menuIngredientsList = utils.firebaseArray(menuIngredients.data);
              console.warn(menuIngredientsList);
              const selectedIngredientList = [];
              // filter only menuingredients that were ordered by menuId
              filterdOrdersList.forEach((menuItem) => {
                const filteredMeuIngredientList = menuIngredientsList.filter((m) => m.menuId === menuItem.menuId);
                selectedIngredientList.push(...filteredMeuIngredientList);
              });
              console.warn(selectedIngredientList);
              // just get the clean list of ingredients used in those orders or menu items
              const cleanIngredientsList = selectedIngredientList.map((x) => x.ingredientId);
              console.warn(cleanIngredientsList);
              // const uniqueNamesList = [];
              // cleanIngredientsList.forEach((ingredient) => {
              //   ingredData.getIngredientById(ingredient)
              //     .then((ingredObj) => {
              //       const singleIngredObj = ingredObj.data;
              //       uniqueNamesList.push(singleIngredObj.name);
              //     });
              // });
              // console.warn(uniqueNamesList);

              const uniqueValueAndCount = {};
              cleanIngredientsList.forEach((ingredient) => {
                if (ingredient in uniqueValueAndCount) {
                  uniqueValueAndCount[ingredient] += 1;
                } else {
                  uniqueValueAndCount[ingredient] = 1;
                }
              });
              console.warn(uniqueValueAndCount);
              const ingredientsUsed = Object.keys(uniqueValueAndCount);
              console.warn('test');
              const uniqueNameAndCount = {};
              ingredData.getIngredients()
                .then((ingredients) => {
                  const ingredientsArray = [];
                  ingredientsUsed.forEach((ingredient) => {
                    const filteredIngredients = ingredients.filter((m) => m.id === ingredient);
                    ingredientsArray.push(...filteredIngredients);
                    uniqueNameAndCount[filteredIngredients[ingredient].name] = uniqueValueAndCount[ingredient];
                  });
                  console.warn(uniqueNameAndCount);
                  resolve(uniqueNameAndCount);
                });
            });
        });
    })
    .catch((err) => reject(err));
});

export default { get7DayIngredAmount };
