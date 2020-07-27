import moment from 'moment';
import menuIngrediantData from '../../helpers/data/menuIngrediantData';
import utils from '../../helpers/utils';
import reservationsData from '../../helpers/data/reservationsData';
import menuData from '../../helpers/data/menuData';
import menu from '../menu/menu';

// let selectMyDate;
// call later
let reservationStoreObject = [];
let selectedMenuPrice = 0;
let selectedPerson = 0;

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
  // eslint-disable-next-line no-use-before-define
  buildOrderConsole(date);
};

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

const buildOrderConsole2 = (filterDate) => {
  let currentFilter = 'All';
  if (filterDate) {
    currentFilter = moment(filterDate).format('M/D/YYYY');
    // document.getElementById('myDate').value = moment(filterDate).format('M/D/YYYY');
  }
  console.warn(currentFilter);
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
          <h5 class="card-title">Reservation</h5>
        </div>
      </div>
  `;
  domString += `
      <div class="card">
        <h5 class="card-header">Menu Order</h5>
        <div class="card-body">
          <h5 class="card-title"></h5>
          <div id = "orderMenu">
            <select  class="mt-3 float-right" id="menuOrder">
              <option value="" selected disabled> select menu: </option>
            </select>
          </div>
          <p class="card-text"></p>
          <a href="#" id="addToTotalCost" class="btn btn-primary">Add to total cost</a>
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
          <button type="submit" class="btn btn-primary" disabled>Submit</button>
        </div>
      </form>    
    </div>
  `;
  utils.printToDom('#console', domString);

  reservationsData.getReservationsByDateCost(today)
    .then((response) => {
      const reservationObj = response;
      console.warn('this is the reservation objexct: ', reservationObj);
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
  // $('body').on('change', '#resOrder', dropUpdate);
};

const dropUpdate = () => {
  const myVal = $('#resOrder option:selected').val();
  console.warn('dropMenu selected', reservationStoreObject, myVal);
  let domString = 'Feature coming here';
  let partySize = 0;
  reservationStoreObject.forEach((res) => {
    if (res.id === myVal) {
      partySize = res.partySize;
      domString = res.name;
      console.warn('this is party size from obj ', res.partySize);
    }
  });
  console.warn(partySize);
  utils.printToDom('.card-title', domString);
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
  utils.printToDom('#orderMenu', domString);

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

  menuData.getMenuItems(menu)
    .then((response) => {
      domString = `
      <select  class="mt-3 float-right" id="menuOrder">
        <option value="" selected disabled> select menu: </option>
      `;
      const menuArr = response;
      menuArr.forEach((item) => {
        domString += `<option value="${item.price}">${item.name} - Price $${item.price}.00</option>`;
      });
      utils.printToDom('#menuOrder', domString);
    })
    .catch((err) => console.warn('error to bring menu items ', err));
  selectedMenuPrice = $('#orderMenu option:selected').val();
  selectedPerson = $('#personOrder option:selected').val();
  // eslint-disable-next-line no-use-before-define
  // $('#addToTotalCost').click(addToForm(person, price));
};

const addToForm = () => {
  let domString = '';
  selectedMenuPrice = $('#menuOrder option:selected').val();
  selectedPerson = $('#personOrder option:selected').val();
  console.warn('this is the  person ', selectedPerson);
  console.warn('this is the  price ', selectedMenuPrice);
  const idToGo = `p${selectedPerson}`;

  domString += `
    <label for="person ${$('#personOrder option:selected').val()}">Person ${$('#personOrder option:selected').val()}</label>
    <input type="text" class="form-control" id="person${selectedPerson}" aria-describedby="menu price" placeholder="${selectedMenuPrice}" value="${selectedMenuPrice}" disabled>
    <small id="emailHelp" class="form-text text-muted">you can add food name</small>
  `;
  utils.printToDom(`#${idToGo}`, domString);
  utils.printToDom('#submitBtn', '<button type="submit" class="btn btn-primary">Submit the order</button>');
};

const checkFilterDate = () => {
  console.warn('excuted :: ', document.getElementById('myDate').value);
  let domString = '';
  reservationStoreObject = [];
  const filterDate = document.getElementById('myDate').value;
  reservationsData.getReservationsByDateCost(filterDate)
    .then((response) => {
      const reservationObj = response;
      console.warn('this is the reservation objexct: ', reservationObj);
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

export default {
  buildOrderConsole,
  filterEventOrder,
  checkFilterDate,
  buildOrderConsole2,
  addToForm,
};

/*
            <div id="resOrder" class="dropdown mt-3">
              <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Dropdown button
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <a class="dropdown-item" href="#">Something else here</a>
              </div>
            </div>

*/
