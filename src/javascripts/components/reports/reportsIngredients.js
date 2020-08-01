import moment from 'moment';
import utils from '../../helpers/utils';
import reservationsData from '../../helpers/data/reservationsData';
import orderData from '../../helpers/data/orderData';
import menuIngrediantData from '../../helpers/data/menuIngrediantData';
import ingredData from '../../helpers/data/ingredData';

const drawIngredients = () => {
  const today = moment(Date.now()).format('YYYY-MM-DD');
  const domString = ` 
    <div class="row d-flex justify-content-center">
    <div class="col-6 d-flex flex-column">
      <label class="btn btn-secondary active">
      <input type="radio" name="options" id="1Day" checked> 1 Day
      </label>
      <label class="btn btn-secondary">
      <input type="radio" name="options" id="7Day" value="7Day"> Date Range
      </label>
      <label class="btn btn-secondary">
        <input type="radio" name="options" id="allDays" value="allDays"> All Days
      </label>
    </div>
    <div id="dateContainer" class="col-6 d-flex flex-row inline-block">
    <div class="m-1">
    <label for="1date">1 Day/Start Date</label>
    <input type="date" class="m-1 form-control" id="1date" value="${today}">
    </div>
    <div class="m-1">
    <label for="1date">End Date</label>
    <input type="date" class="m-1 form-control" id="7date" value="${today}">
    </div>
    </div>
    <div>
    <button id="ingredientsSubmit" class="m5 btn btn-secondary submit">Submit</button>
    </div>
    </div>
    <div id="reportsDisplay">cards go here</div>`;
  utils.printToDom('#ingredientsDiv', domString);
};

const get7DayIngredients = () => {
  const pickDate1 = $('#1date').val();
  const pickDate2 = $('#7date').val();
  let domString = '';
  // get reservations in the range of these dates
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
              domString += `
              <div class="mt-3 card text-center">
                <div class="card-header">
                  Multi-Day Range Revenue
                </div>
                <div class="card-body">
                  <h2 class="card-title">${pickDate1} to ${pickDate2}</h2>`;
              console.warn('test');
              ingredientsUsed.forEach((ingredient) => {
                ingredData.getIngredientById(ingredient)
                  .then((ingredObj) => {
                    const singleIngredObj = ingredObj.data;
                    domString += `<h3 class="card-text">Total quantity of ingredients used : ${singleIngredObj} </h3>`;
                  });
              });
              domString += `
                  
                </div>
                <div class="card-footer text-muted">
                </div>
              </div>
            `;
              utils.printToDom('div #reportsDisplay', domString);
              console.warn(domString);
            });
        });
    })
    .catch((err) => console.warn('did not bring the reservation ', err));
};

// const getAllIngredients = () => {
//   let domString = '';
//   let totalCost = 0;
//   reservationsData.getReservations()
//     .then((response) => {
//       const resObj = response;
//       resObj.forEach((res) => {
//         totalCost += res.totalCost;
//       });
//       domString += `
//         <div class="mt-3 card text-center">
//           <div class="card-header">
//             All Revenue
//           </div>
//           <div class="card-body">
//             <h2 class="card-title">All Revenue</h2>
//             <h3 class="card-text">Total revenue : $${totalCost}.00</h3>
//           </div>
//           <div class="card-footer text-muted">
//           </div>
//         </div>
//       `;
//       utils.printToDom('#reportsDisplay', domString);
//     })
//     .catch((err) => console.warn('did not bring the reservation ', err));
// };

const pickReport = () => {
  const radioVal = $('input[name="options"]:checked').val();
  let pickDate1;
  let pickDate2;
  switch (radioVal) {
    case '1Day':
      // console.warn('this is one day report', valid);
      pickDate1 = $('#1date').val();
      if (pickDate1) {
        // eslint-disable-next-line no-use-before-define
        // getOneDayRevenue();
        // console.warn('there is date selected', pickDate1, valid);
      } else {
        utils.printToDom('#reportsDisplay', 'Please select the date to get the report for it!!');
      }
      break;
    case '7Day':
      // console.warn('this is 7 days report', valid);
      pickDate2 = $('#7date').val();
      pickDate1 = $('#1date').val();
      if (pickDate1 && pickDate2) {
        get7DayIngredients();
        // console.warn('there is date selected', pickDate1, pickDate2, valid);
      }
      break;
    case 'allDays':
      // console.warn('this is all days report');
      // getAllRevenue();
      break;
    default:
      // do nothing
  }
};

// const getOneDayRevenue = () => {
//   const pickDate1 = $('#1date').val();
//   let domString = '';
//   let totalCost = 0;
//   reservationsData.getReservations(pickDate1)
//     .then((response) => {
//       const resObj = response;
//       resObj.forEach((res) => {
//         totalCost += res.totalCost;
//       });
//       domString += `
//         <div class="mt-3 card text-center">
//           <div class="card-header">
//             One Day Revenue
//           </div>
//           <div class="card-body">
//             <h2 class="card-title">${pickDate1}</h2>
//             <h3 class="card-text">Total revenue for that day : $${totalCost}.00</h3>
//           </div>
//           <div class="card-footer text-muted">
//           </div>
//         </div>
//       `;
//       utils.printToDom('#reportsDisplay', domString);
//     })
//     .catch((err) => console.warn('did not bring the reservation ', err));
// };

export default { drawIngredients, pickReport };
