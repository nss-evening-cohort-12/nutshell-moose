import moment from 'moment';
import menuIngrediantData from '../../helpers/data/menuIngrediantData';
import utils from '../../helpers/utils';
import reservationsData from '../../helpers/data/reservationsData';
import menuData from '../../helpers/data/menuData';
import menu from '../menu/menu';
import orderData from '../../helpers/data/orderData';

// let selectMyDate;
// call later
let reservationStoreObject = [];
let selectedMenuPrice = 0;
let selectedPerson = 0;
let totalCost = 0;
let resPartySize = 0;
// let resStoreId = '';
// let menuItemsStoreObject = [];

const reservationsFilter = (selectedDate) => {
  const today = moment(Date.now()).format('YYYY-MM-DD');
  let filteredDate = '';
  if (selectedDate) {
    filteredDate = selectedDate;
  }
  const domString = `
    <input type="date" min="${today}" class="form-control" id="filter-date" value="${filteredDate}">
  `;
  return domString;
};

const filterEventOrder = () => {
  const date = $('#filter-date').val();
  console.warn(date);
  // eslint-disable-next-line no-use-before-define
  // buildOrderConsole(date);
};
/*
const buildOrderConsole = (filterDate) => {
  let currentFilter = 'All';
  if (filterDate) {
    currentFilter = moment(filterDate).format('M/D/YYYY');
    // document.getElementById('myDate').value = moment(filterDate).format('M/D/YYYY');
  }
  console.warn('print to dom here to show the order page');
  const today = moment(Date.now()).format('YYYY-MM-DD');
  const tomorrow = moment(today).add(1, 'd').format('YYYY-MM-DD');
  const displayTime = moment(today).add(1, 'd').format('M/D/YYYY');
  console.warn(displayTime);
  console.warn('tomorow: ', tomorrow);
  let domString = '';
  domString = reservationsFilter();
  domString = `
    <div class="container">
      <div class="card">
        <h5 class="card-header">Featured</h5>
        <div class="card-body">
          <h5 class="card-title">Special title treatment</h5>  <div class="row justify-content-center">
          <div class="filter-buttons d-flex align-items-center">
            <div class="mr-2">Current view:</div>
            <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              ${currentFilter}
            </button>
            <div class="dropdown-menu dropdown-menu-right">
              <button type="button" class="dropdown-item" id="all-reservations">Show All</button>
              <div class="dropdown-divider"></div>
              <div class="dropdown-header">or select date:</div>
              ${reservationsFilter()}
            </div>
          </div>
          <input type="date" id="myDate" value="${today}">
          <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
      <div class="card">
        <h5 class="card-header">Featured</h5>
        <div class="card-body">
          <h5 class="card-title">Special title treatment</h5>
          <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
    </div>
  `;
  utils.printToDom('#console', domString);

  console.warn(document.getElementById('myDate').value);
  // selectMyDate = document.getElementById('myDate').value;

  menuIngrediantData.getMenuIngByMenuId('menuItem5')
    .then((response) => {
      const testData = response;
      console.warn(testData);
    })
    .catch((err) => console.warn('not working somthing wrong:', err));
};
*/
const buildOrderConsole2 = (filterDate) => {
  let currentFilter = 'All';
  if (filterDate) {
    currentFilter = moment(filterDate).format('M/D/YYYY');
    // document.getElementById('myDate').value = moment(filterDate).format('M/D/YYYY');
  }
  console.warn(currentFilter);
  // console.warn('print to dom here to show the order page');
  const today = moment(Date.now()).format('YYYY-MM-DD');
  // const tomorrow = moment(today).add(1, 'd').format('YYYY-MM-DD');
  // const displayTime = moment(today).add(1, 'd').format('M/D/YYYY');
  // console.warn(displayTime);
  // console.warn('tomorow: ', tomorrow);
  let domString = '';
  domString = reservationsFilter();
  domString = `
    <div class="container">
      <div class="card">
        <h5 class="card-header">Reservation</h5>
        <div class="card-body">
          <div class=float-right>
            <input class="" type="date" id="myDate" value="${today}">
            <br>
            <select  class="mt-3" id="resOrder">
              <option value="" selected disabled> select reservation: </option>
              <option value="1">c1</option>
              <option value="2">c2</option>
            </select>
          </div>
          <h5 id="forCard-title1" class="card-title">Reservation</h5>
        </div>
      </div>
  `;
  domString += `
      <div class="card">
        <h5 class="card-header">Menu Order</h5>
        <div class="card-body">
          <h5 class="card-title"></h5>
          <div id = "orderMenu-person">
          </div>
          <div id = "orderMenu-menu">
          </div>
          <p class="card-text"></p>
          <div id="addTotalBtn-rePrint">
          <a href="#" id="addToTotalCost" class="btn btn-primary">Add to total cost</a>
          </div>
        </div>
      </div>
      <form id="submitTotal">
        <div class="form-group">
          <label for=""></label>
        </div>
        <div class="form-group">
        </div>
        <div class="form-check">
        </div>
        <div id="submitBtn">
          <button type="submit" class="btn btn-primary">Submit</button>
        </div>
      </form>    
    </div>
  `;
  utils.printToDom('#console', domString);

  reservationsData.getReservationsByDateCost(today)
    .then((response) => {
      const reservationObj = response;
      // console.warn('this is the reservation objexct: ', reservationObj);
      domString = '<option value="" selected disabled> select reservation: </option>';
      reservationObj.forEach((reservation) => {
        reservationStoreObject.push(reservation);
        domString += `
        <option value="${reservation.id}" id=${reservation.id}>${reservation.name}</option>
        `;
      });
      utils.printToDom('#resOrder', domString);
    })
    .catch((err) => console.warn('couldnt get reservation data ', err));

  // console.warn(document.getElementById('myDate').value);
  // selectMyDate = document.getElementById('myDate').value;

  menuIngrediantData.getMenuIngByMenuId('menuItem5')
    .then((response) => {
      const testData = response;
      console.warn(testData);
    })
    .catch((err) => console.warn('not working somthing wrong:', err));
  // eslint-disable-next-line no-use-before-define
  $('#resOrder').change(dropUpdate);
  // $('.dropdown-item').on('show.bs.dropdown', dropUpdate);
  // eslint-disable-next-line no-use-before-define
  // $('#personOrder').change(personDropUpdate);
  // $('body').on('change', '#resOrder', dropUpdate);
};

const personDropUpdate = () => {
  // const personCheck = $('#personOrder option:selected').val();
  const menuCheck = $('#menuOrder option:selected').val();
  let domString = '';
  // console.warn('see the new function ', personCheck, menuCheck);
  if (menuCheck) {
    domString = '<a href="#" id="addToTotalCost" class="btn btn-primary">Add to total cost</a>';
    utils.printToDom('#addTotalBtn-rePrint', domString);
  } else {
    domString = '<a href="#" id="addToTotalCost" class="btn btn-primary disabled">Add to total cost</a>';
    utils.printToDom('#addTotalBtn-rePrint', domString);
  }
};

const dropUpdate = () => {
  totalCost = 0;
  const myVal = $('#resOrder option:selected').val();
  // console.warn('dropMenu selected', reservationStoreObject, myVal);
  let domString = 'Feature coming here';
  let partySize = 0;
  let resId = '';
  reservationStoreObject.forEach((res) => {
    if (res.id === myVal) {
      partySize = res.partySize;
      resPartySize = res.partySize;
      domString = res.name;
      resId = res.id;
      // console.warn('this is party size from obj ', res.id);
    }
  });
  // console.warn(partySize);
  utils.printToDom('#forCard-title1', domString);

  orderData.getOrderByReserveId(resId)
    .then((response) => {
      const orderArr = response;
      if (orderArr.length > 0) {
        // console.warn('this is the array of order length ', orderArr.length);
        const partySizeLeft = orderArr.length;

        domString = `
        <select  class="mt-3" id="personOrder">
          <option value="" selected disabled> select person: </option>
        `;
        for (let i = 0; i < partySizeLeft; i += 1) {
          domString += `
            <option value="${i + 1}" disabled>person ${i + 1}</option>
          `;
        }
        for (let i = 0; i < partySize - partySizeLeft; i += 1) {
          domString += `
            <option value="${i + partySizeLeft + 1}" >person ${i + partySizeLeft + 1}</option>
          `;
        }
        domString += '</select>';
        domString += `
        <select  class="mt-3 float-right" id="menuOrder">
          <option value="" selected disabled> select menu: </option>
        </select>
        `;
        utils.printToDom('#orderMenu-person', domString);

        domString = '';

        for (let i = 0; i < orderArr.length; i += 1) {
          domString += `
          <div id = "p${i + 1}" class="form-group">
            <label for="person ${i + 1}">Person ${i + 1}</label>
            <input type="text" class="form-control" id="person ${i + 1}" aria-describedby="menu price" placeholder="0" value="${orderArr[i].price}" disabled>
          </div>
          `;
          totalCost += orderArr[i].price;
        }
        for (let i = 0; i < partySize - partySizeLeft; i += 1) {
          domString += `
          <div id = "p${i + partySizeLeft + 1}" class="form-group">
            <label for="person ${i + partySizeLeft + 1}">Person ${i + partySizeLeft + 1}</label>
            <input type="text" class="form-control" id="person ${i + partySizeLeft + 1}" aria-describedby="menu price" placeholder="0" value="0">
          </div>
          `;
        }
        domString += `
        <div id = "totalCost" class="form-group">
          <label for="totalCost">Total Cost:</label>
          <input type="text" class="form-control" id="totalCostValue" aria-describedby="menu price" placeholder="0" value="${totalCost}">
        </div>        
        `;
        domString += `
          <div id="submitBtn">
            <button type="submit" class="btn btn-primary" >Submit</button>
          </div>
        `;
        utils.printToDom('#submitTotal', domString);
      } else {
        domString = `
        <select  class="mt-3" id="personOrder">
          <option value="" selected disabled> select person: </option>
        `;
        for (let i = 0; i < partySize; i += 1) {
          domString += `
            <option value="${i + 1}" id="ddlP${i + 1}">person ${i + 1}</option>
          `;
        }
        domString += '</select>';
        domString += `
        <select  class="mt-3 float-right" id="menuOrder">
          <option value="" selected disabled> select menu: </option>
        </select>
        `;
        utils.printToDom('#orderMenu-person', domString);

        domString = '';

        for (let i = 0; i < partySize; i += 1) {
          domString += `
          <div id = "p${i + 1}" class="form-group">
            <label for="person ${i + 1}">Person ${i + 1}</label>
            <input type="text" class="form-control" id="person ${i + 1}" aria-describedby="menu price" placeholder="0" value="0">
          </div>
          `;
        }
        domString += `
        <div id = "totalCost" class="form-group">
          <label for="totalCost">Total Cost:</label>
          <input type="text" class="form-control" id="totalCostValue" aria-describedby="menu price" placeholder="0" value="${totalCost}">
        </div>
        `;
        domString += `
          <div id="submitBtn">
            <button type="submit" class="btn btn-primary" >Submit</button>
          </div>
        `;
        utils.printToDom('#submitTotal', domString);
      }
      menuData.getMenuItems(menu)
        .then((responseMenu) => {
          domString = `
          <select  class="mt-3 float-right" id="menuOrder">
          <option value="" selected disabled> select menu: </option>
          `;
          const menuArr = responseMenu;
          menuArr.forEach((item) => {
            domString += `<option value="${item.price}" id="${item.name}" data-value=${item.id}>${item.name} - Price $${item.price}.00</option>`;
          });
          domString += '</select>';
          utils.printToDom('#menuOrder', domString);
        });
      // console.warn('this is the array of order length ', orderArr.length);
    })
    .catch((err) => console.warn('can not get the data for order ', err));
  /*
  domString = `
  <select  class="mt-3" id="personOrder">
    <option value="" selected disabled> select person: </option>
  `;
  for (let i = 0; i < partySize; i += 1) {
    domString += `
      <option value="${i + 1}">person ${i + 1}</option>
    `;
  }
  domString += '</select>';
  domString += `
  <select  class="mt-3 float-right" id="menuOrder">
    <option value="" selected disabled> select menu: </option>
  </select>
  `;
  utils.printToDom('#orderMenu-person', domString);

  domString = '';

  for (let i = 0; i < partySize; i += 1) {
    domString += `
    <div id = "p${i + 1}" class="form-group">
      <label for="person ${i + 1}">Person ${i + 1}</label>
      <input type="text" class="form-control" id="person ${i + 1}" aria-describedby="menu price" placeholder="0" value="0">
    </div>
    `;
  }
  domString += `
    <div id="submitBtn">
      <button type="submit" class="btn btn-primary" disabled>Submit</button>
    </div>
  `;

  utils.printToDom('#submitTotal', domString);
  */
  menuData.getMenuItems(menu)
    .then((response) => {
      // menuItemsStoreObject = response;
      domString = `
      <select  class="mt-3 float-right" id="menuOrder">
        <option value="" selected disabled> select menu: </option>
      `;
      const menuArr = response;
      menuArr.forEach((item) => {
        domString += `<option value="${item.price}" id="${item.id}" data-value=${item.id}>${item.name} - Price $${item.price}.00</option>`;
      });
      domString += '</select>';
      utils.printToDom('#menuOrder', domString);
    })
    .catch((err) => console.warn('error to bring menu items ', err));
  selectedMenuPrice = $('#orderMenu option:selected').val();
  selectedPerson = $('#personOrder option:selected').val();
  // eslint-disable-next-line no-use-before-define
  // $('#addToTotalCost').click(addToForm(person, price));
  $('#personOrder').change(personDropUpdate);
};

const addToForm = () => {
  let domString = '';
  selectedMenuPrice = $('#menuOrder option:selected').val();
  selectedPerson = $('#personOrder option:selected').val();
  // console.warn('this is the  person ', selectedPerson);
  // console.warn('this is the  price ', selectedMenuPrice);
  const idToGo = `p${selectedPerson}`;

  domString += `
    <label for="person ${$('#personOrder option:selected').val()}">Person ${$('#personOrder option:selected').val()}</label>
    <input type="text" class="form-control" id="person${selectedPerson}" aria-describedby="menu price" placeholder="${selectedMenuPrice}" value="${selectedMenuPrice}" disabled>
    <small id="emailHelp" class="form-text text-muted">you can add food name</small>
  `;
  utils.printToDom(`#${idToGo}`, domString);
  totalCost += parseFloat(selectedMenuPrice);
  domString = `
    <label for="totalCost">Total Cost:</label>
    <input type="text" class="form-control" id="totalCostValue" aria-describedby="menu price" placeholder="0" value="${totalCost}"></input>
  `;
  utils.printToDom('#totalCost', domString);
  utils.printToDom('#submitBtn', '<button type="submit" class="btn btn-primary">Submit the order</button>');
  domString = `
  <select  class="mt-3" id="personOrder">
    <option value="" selected disabled> select person: </option>
  `;
  // Got the price for that menuITem
  // console.warn('to be add to order tbl: ', $('#menuOrder option:selected').val());
  // got the menuITem ID
  // const ddata = $('#menuOrder option:selected', this).data('value');
  // console.warn('to be add to order tbl: ', ddata);
  // try get reservation id
  // console.warn('to add to reservationid to order tbl: ', $('#resOrder option:selected').val());
  const newOrderMenu = {
    menuId: $('#menuOrder option:selected', this).data('value'),
    price: parseFloat($('#menuOrder option:selected').val()),
    reservationsId: $('#resOrder option:selected').val(),
  };
  orderData.addorder(newOrderMenu)
    .then()
    .catch((err) => console.warn('error to add new order ', err));
  // console.warn('order object ', newOrderMenu);
  const partySize = resPartySize;
  // console.warn($(`#person${1}`).val());
  for (let i = 0; i < partySize; i += 1) {
    const checkInput = $(`#person${i + 1}`).val();
    // ddlP
    if (checkInput) {
      // console.warn('this is the checkInput val: ', checkInput);
      domString += `<option value="${i + 1}" disabled>person ${i + 1}</option>`;
    } else {
      domString += `<option value="${i + 1}">person ${i + 1}</option>`;
    }
    const checkOption = $(`#ddlp${i + 1}`).val();
    console.warn('this is the checkOption val: ', checkOption);
  }
  domString += '</select>';
  domString += `
  <select  class="mt-3 float-right" id="menuOrder">
    <option value="" selected disabled> select menu: </option>
  </select>
  `;
  utils.printToDom('#orderMenu-person', domString);
  menuData.getMenuItems(menu)
    .then((responseMenu) => {
      domString = `
      <select  class="mt-3 float-right" id="menuOrder">
      <option value="" selected disabled> select menu: </option>
      `;
      const menuArr = responseMenu;
      menuArr.forEach((item) => {
        domString += `<option value="${item.price}">${item.name} - Price $${item.price}.00</option>`;
      });
      domString += '</select>';
      utils.printToDom('#menuOrder', domString);
    })
    .catch((err) => console.warn('can not get the data for order ', err));
// console.warn('this is the array of order length ', orderArr.length);
};

const checkFilterDate = () => {
  // console.warn('excuted :: ', document.getElementById('myDate').value);
  let domString = '';
  reservationStoreObject = [];
  const filterDate = document.getElementById('myDate').value;
  reservationsData.getReservationsByDateCost(filterDate)
    .then((response) => {
      const reservationObj = response;
      // console.warn('this is the reservation objexct: ', reservationObj);
      domString = '<option value="" selected disabled> select reservation: </option>';
      reservationObj.forEach((reservation) => {
        reservationStoreObject.push(reservation);
        domString += `
        <option value="${reservation.id}">${reservation.name}</option>
        `;
      });
      utils.printToDom('#resOrder', domString);
    })
    .catch((err) => console.warn('couldnt get reservation data ', err));
};

const addTotalToRes = () => {
  // console.warn('this is totalCost ', $('#totalCostValue').val());
  const resObj = {
    date: reservationStoreObject[0].date,
    name: reservationStoreObject[0].name,
    partySize: reservationStoreObject[0].partySize,
    time: reservationStoreObject[0].time,
    totalCost: parseFloat($('#totalCostValue').val()),
  };
  const reservationId = $('#resOrder option:selected').val();
  // console.warn('reser ID ', reservationId);
  // console.warn('reser obj ', reservationStoreObject[0].date);
  // console.warn(resObj);

  reservationsData.updateReservationCost(reservationId, resObj)
    .then()
    .catch((err) => console.warn('could not update or add totoal cost ', err));
  /*
  console.warn(totalitem);
  const newOrderMenu = {
    menuId: $('#menuOrder option:selected', this).data('value'),
    price: parseFloat($('#menuOrder option:selected').val()),
    reservationsId: $('#resOrder option:selected').val(),
  };
  */
};

export default {
  filterEventOrder,
  checkFilterDate,
  buildOrderConsole2,
  addToForm,
  addTotalToRes,
};
