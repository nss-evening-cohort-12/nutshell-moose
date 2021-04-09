import moment from 'moment';
// import menuIngrediantData from '../../helpers/data/menuIngrediantData';
import buildOrderForm from './buildOrderForm';
import menu from '../menu/menu';

import utils from '../../helpers/utils';

import orderData from '../../helpers/data/orderData';
import reservationsData from '../../helpers/data/reservationsData';
import menuData from '../../helpers/data/menuData';
import menuFilter from './menuFilter';

import './displayOrder.scss';

// import refreshOrderMenu from './refreshOrderMenu';

// call later
let reservationStoreObject = [];
let selectedMenuPrice = 0;
let selectedPerson = 0;
let totalCost = 0;
let reservationObject;
// let checkPartyLeft = 0;
let currentOrder = 0;
// const storeCurrentFilter;

const ddlReservations = (currentFilter) => {
  reservationsData.getReservationsByDateCost(currentFilter)
    .then((response) => {
      const reservationObj = response;
      // console.warn('this is the reservation objexct: ', reservationObj);
      let domString = '<option value="" selected disabled> select reservation: </option>';
      reservationObj.forEach((reservation) => {
        reservationStoreObject.push(reservation);
        console.warn(reservation.totalCost);
        if (reservation.totalCost > 0) {
          domString += `
            <option style="color:red;"value="${reservation.id}" id=${reservation.id}>${reservation.name}</option>
          `;
        } else {
          domString += `
            <option value="${reservation.id}" id=${reservation.id}>${reservation.name}</option>
          `;
        }
      });
      utils.printToDom('#resOrder', domString);
    })
    .catch((err) => console.warn('couldnt get reservation data ', err));
};

const buildOrderConsole2 = (filterDate) => {
  let currentFilter = 'All';
  if (filterDate) {
    currentFilter = moment(filterDate).format('YYYY-MM-DD');
  } else {
    currentFilter = moment(Date.now()).format('YYYY-MM-DD');
  }
  let domString = '';
  domString = buildOrderForm.buildOrderForm(currentFilter);
  utils.printToDom('#console', domString);
  ddlReservations(currentFilter);
  // storeCurrentFilter = currentFilter;
};

const updateMenuOnChange = () => {
  const personCheck = $('#personOrder option:selected').val();
  const menuCheck = $('#menuOrder option:selected').val();
  let domString = '';
  // console.warn('see the new function ', personCheck, menuCheck);
  if (menuCheck && personCheck && menuCheck !== 'mainMenu' && personCheck !== 'mainPerson') {
    domString = '<a href="#" id="addToTotalCost" class="btn btn-primary">Add to total cost</a>';
    utils.printToDom('#addTotalBtn-rePrint', domString);
  } else {
    domString = '<a href="#" id="addToTotalCost" class="btn btn-primary disabled">Add to total cost</a>';
    utils.printToDom('#addTotalBtn-rePrint', domString);
  }
  console.warn('want to see the menu id ', $('#menuOrder option:selected').attr('id'));
};

const personDropUpdate = () => {
  updateMenuOnChange();
};

const menuDropUpdate = () => {
  updateMenuOnChange();
};

const dropUpdate = () => {
  // e.preventDefault();
  totalCost = 0;
  const myVal = $('#resOrder option:selected').val();
  // console.warn('dropMenu selected', reservationStoreObject, myVal);
  let domString = 'Feature coming here';
  domString = '<a href="#" id="addToTotalCost" class="btn btn-primary disabled">Add to total cost</a>';
  utils.printToDom('#addTotalBtn-rePrint', domString);
  let partySize = 0;
  let resId = '';
  let haveTotalCheck = false;
  reservationStoreObject.forEach((res) => {
    if (res.id === myVal) {
      partySize = parseFloat(res.partySize);
      // resPartySize = res.partySize;
      domString = res.name;
      resId = res.id;
      reservationObject = res;
      currentOrder = 0;
      if (res.totalCost > 0) {
        haveTotalCheck = true;
      } else {
        haveTotalCheck = false;
      }
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
        // checkPartyLeft = orderArr.length + 1;
        currentOrder = orderArr.length;
        domString = `
        <select  class="mt-3" id="personOrder">
          <option value="mainPerson" selected disabled> select person: </option>
        `;
        for (let i = 0; i < partySizeLeft; i += 1) {
          domString += `
            <option value="${i + 1}" id="person${i + 1}" disabled>person ${i + 1}</option>
          `;
        }
        for (let i = 0; i < partySize - partySizeLeft; i += 1) {
          domString += `
            <option value="${i + partySizeLeft + 1}" id="person${i + partySizeLeft + 1}">person ${i + partySizeLeft + 1}</option>
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
            <input type="text" class="form-control" id="person ${i + 1}" aria-describedby="menu price" placeholder="0" value="$${orderArr[i].price}.00" disabled>
            <small id="emailHelp" class="form-text text-muted">${orderArr[i].name}</small>
          </div>
          `;
          totalCost += orderArr[i].price;
        }
        for (let i = 0; i < partySize - partySizeLeft; i += 1) {
          domString += `
          <div id = "p${i + partySizeLeft + 1}" class="form-group">
            <label for="person ${i + partySizeLeft + 1}">Person ${i + partySizeLeft + 1}</label>
            <input type="text" class="form-control" id="person ${i + partySizeLeft + 1}" aria-describedby="menu price" placeholder="0" value="0.00" disabled>
          </div>
          `;
        }
        domString += `
        <div id = "totalCost" class="form-group">
          <label for="totalCost">Total Cost:</label>
          <input type="text" class="form-control" id="totalCostValue" aria-describedby="menu price" placeholder="0" value="${totalCost}.00" disabled>
        </div>        
        `;
        // console.warn('see the total check ', haveTotalCheck);
        if (haveTotalCheck) {
          domString += `
            <div id="submitBtn">
              <button type="submit" class="btn btn-primary" disabled>Submited - order complete $${totalCost}.00</button>
            </div>
          `;
        } else if (orderArr.length === partySize) {
          domString += `
            <div id="submitBtn">
              <button type="submit" class="btn btn-primary" >Submit the order</button>
            </div>
          `;
        } else {
          domString += `
            <div id="submitBtn">
              <button type="submit" class="btn btn-primary" disabled>Complete The Order First</button>
            </div>
          `;
        }
        utils.printToDom('#submitTotal', domString);
      } else {
        // checkPartyLeft = partySize - 1;
        domString = `
        <select  class="mt-3" id="personOrder">
          <option value="mainPerson" selected disabled> select person: </option>
        `;
        for (let i = 0; i < partySize; i += 1) {
          domString += `
            <option value="${i + 1}" id="person${i + 1}">person ${i + 1}</option>
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
            <input type="text" class="form-control" id="person ${i + 1}" aria-describedby="menu price" placeholder="0" value="0.00" disabled>
          </div>
          `;
        }
        domString += `
        <div id = "totalCost" class="form-group">
          <label for="totalCost">Total Cost:</label>
          <input type="text" class="form-control" id="totalCostValue" aria-describedby="menu price" placeholder="0" value="${totalCost}.00">
        </div>
        `;
        domString += `
          <div id="submitBtn">
            <button type="submit" class="btn btn-primary" disabled>Complete The Order First</button>
          </div>
        `;
        utils.printToDom('#submitTotal', domString);
      }
      menuData.getMenuItems(menu)
        .then((responseMenu) => {
          domString = `
          <select  class="mt-3 float-right" id="menuOrder">
          <option value="mainMenu" id="mainMen" selected disabled> select menu: </option>
          `;
          const menuArr = responseMenu;
          menuArr.forEach((item) => {
            domString += `<div><option value="${item.price}" id="${item.name}" class="${item.id}" data-value=${item.id}>${item.name} - Price $${item.price}.00</option>`;
          });
          domString += '</select>';
          utils.printToDom('#menuOrder', domString);
        });
      // console.warn('this is the array of order length ', orderArr.length);
    })
    .catch((err) => console.warn('can not get the data for order ', err));
  menuFilter.menuFilter();
  selectedMenuPrice = $('#orderMenu option:selected').val();
  selectedPerson = $('#personOrder option:selected').val();
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
    <input type="text" class="form-control" id="person${selectedPerson}" aria-describedby="menu price" placeholder="${selectedMenuPrice}" value="$${selectedMenuPrice}.00" disabled>
    <small id="emailHelp" class="form-text text-muted">${$('#menuOrder option:selected').attr('id')}</small>
  `;
  utils.printToDom(`#${idToGo}`, domString);
  totalCost += parseFloat(selectedMenuPrice);
  // console.warn('party size ', reservationObject.partySize);
  // console.warn('party size left ', checkPartyLeft);
  currentOrder += 1;
  // console.warn('current order', currentOrder);
  domString = `
    <label for="totalCost">Total Cost:</label>
    <input type="text" class="form-control" id="totalCostValue" aria-describedby="menu price" placeholder="0" value="${totalCost}" disabled></input>
  `;
  utils.printToDom('#totalCost', domString);
  if (currentOrder === reservationObject.partySize) {
    utils.printToDom('#submitBtn', '<button type="submit" class="btn btn-primary">Submit the order</button>');
  } else {
    utils.printToDom('#submitBtn', '<button type="submit" class="btn btn-primary" disabled>Complete The Order First</button>');
  }
  // utils.printToDom('#submitBtn', '<button type="submit" class="btn btn-primary">Submit the order</button>');
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
    name: $('#menuOrder option:selected').attr('id'),
    reservationsId: $('#resOrder option:selected').val(),
  };
  orderData.addorder(newOrderMenu)
    .then()
    .catch((err) => console.warn('error to add new order ', err));
  // console.warn('getting selected to be disable', $('#personOrder option:selected').val());
  const pVal = $('#personOrder option:selected').val();
  $(`option[value='${pVal}']`).attr('disabled', 'disabled');
  utils.printToDom('#addTotalBtn-rePrint', '<a href="#" id="addToTotalCost" class="btn btn-primary disabled">Add to total cost</a>');
  $('#personOrder').val('mainPerson');
  menuFilter.decIng(newOrderMenu.menuId);
  menuFilter.menuFilter();
  menuFilter.buildMenu();
  menuFilter.menuFilter();
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
  // utils.printToDom('#clearByDate', '');
  buildOrderConsole2(filterDate);
};

const addTotalToRes = () => {
  // console.warn('this is totalCost ', $('#totalCostValue').val());
  const reservationId = $('#resOrder option:selected').val();
  let resObj = {
    date: '',
    name: '',
    partySize: 0,
    time: 0,
    totalCost: 0,
  };
  reservationStoreObject.forEach((newResObj) => {
    if (newResObj.id === reservationId) {
      // console.warn('find the right object ', newResObj);
      resObj = {
        date: newResObj.date,
        name: newResObj.name,
        partySize: newResObj.partySize,
        time: newResObj.time,
        totalCost: parseFloat($('#totalCostValue').val()),
      };
    }
  });
  // console.warn('this is the object to be update ', resObj);
  // console.warn('this is the reservation id to be update ', reservationId);

  reservationsData.updateReservationCost(reservationId, resObj)
    .then()
    .catch((err) => console.warn('could not update or add totoal cost ', err));
  // reservationStoreObject = [];
  // ddlReservations(resObj.date);
  const domString = `
    <button type="submit" class="btn btn-primary" disabled>Submited - order complete $${resObj.totalCost}.00</button>
  `;
  // utils.printToDom('#console', '');
  // buildOrderConsole2(resObj.date);
  utils.printToDom('#submitBtn', domString);
  // utils.showFlashMessage('order complete', 'order complete!');
};

export default {
  checkFilterDate,
  buildOrderConsole2,
  addToForm,
  addTotalToRes,
  dropUpdate,
  personDropUpdate,
  menuDropUpdate,
};
