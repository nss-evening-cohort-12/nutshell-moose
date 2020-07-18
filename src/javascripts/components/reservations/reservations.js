// import authData from '../../helpers/data/authData';
import moment from 'moment';
import utils from '../../helpers/utils';
import './reservations.scss';
import reservationsData from '../../helpers/data/reservationsData';

const updateAmPm = () => {
  const hour = $('#hour').val();
  const status = hour === '11' ? 'AM' : 'PM';
  utils.printToDom('#ampm', status);
};

const updateAmPmEvent = () => {
  updateAmPm();
  $('#hour').change(updateAmPm);
};

const setSelectedIndex = (select, i) => {
  const s = select;
  s.options[i - 1].selected = true;
};

const dimCards = (shownCard) => {
  $('.reservation-card').addClass('mute-card bg-light');
  $(`#${shownCard}`).removeClass('mute-card bg-light');
  $(`#edit-btn-${shownCard}`).removeClass('btn-primary');
  $(`#edit-btn-${shownCard}`).addClass('btn-secondary');
};

const undimCards = () => {
  $('.reservation-card').removeClass('mute-card bg-light');
};

const reservationsFilter = (selectedDate) => {
  const today = moment(Date.now()).format('YYYY-MM-DD');
  let filteredDate = today;
  if (selectedDate) {
    filteredDate = selectedDate;
  }
  const domString = `
    <label for="date" class="col-form-label">Date:</label>
    <input type="date" min="${today}" class="form-control" id="date" value="${filteredDate}">
  `;
  return domString;
};

const displayReservationForm = (reservation, reservationId) => {
  const today = moment(Date.now()).format('YYYY-MM-DD');
  const tomorrow = moment(today).add(1, 'd').format('YYYY-MM-DD');
  let existing = {
    name: '',
    partySize: 2,
    date: tomorrow,
    hour: 11,
    minutes: '00',
    save: 'new',
  };
  let formType = 'Add New';
  if (reservation) {
    // TODO: change color of form for editing existing res
    formType = 'Edit';
    existing = { ...reservation };
    existing.hour = Math.floor(existing.time / 100);
    existing.minutes = 0;
    existing.save = 'updated';
  }
  let domString = `
      <div class="row reservation-header justify-content-between px-3">
        <div></div>
        <h3>${formType} Reservation:</h3>
        <div class="cancel-area"><i class="far fa-2x fa-times-circle text-secondary hide" id="cancel-res-edit"></i></div>
      </div>`;
  domString += `
  <div class="container" id="reservation-form">
    <form>
      <div class="form-group row">
        <label for="name" class="col-sm-1 col-form-label">Name:</label>
        <div class="col-sm-4">
          <input type="text" class="form-control" id="name" value="${existing.name}" required>
        </div>
        <label for="date" class="col-sm-1 col-form-label">Date:</label>
        <div class="col-sm-5">
          <input type="date" min="${today}" class="form-control" id="date" value="${existing.date}" required>
        </div>
      </div>
      <div class="form-group row">
        <label for="size" class="col-sm-1 col-form-label">Party size:</label>
        <div class="col-sm-1">
          <input type="number" class="form-control" id="size" value=${existing.partySize} required" min="2" max="8">
        </div>
        <div class="col-sm-3"></div>
        <label for="time" class="col-sm-1 col-form-label">Time:</label>
        <div class="col-sm-2">
        <select id="hour" name="hour" value=${existing.hour}>
          <option value=11>11</option>
          <option value=12>12</option>
          <option value=13>1</option>
          <option value=14>2</option>
          <option value=15>3</option>
          <option value=16>4</option>
          <option value=17>5</option>
          <option value=18>6</option>
          <option value=19>7</option>
          <option value=20>8</option>
          <option value=21>9</option>
          <option value=22>10</option>
        </select>
        :
        <select id="minutes" name="minutes">
          <option value=00>00</option>
          <option value=15>15</option>
          <option value=30>30</option>
          <option value=45>45</option>
        </select>
        <span id="ampm">AM</span>
        </div>
        <div class="col-sm-3 res-form-btns">
        <button type="submit" class="btn btn-primary mx-1" id="save-${existing.save}-res" data-reservationid="${reservationId}">Save</button>
        <button type="submit" class="btn btn-danger mx-1 hide" id="delete-reservation" data-reservationid="${reservationId}">Delete</button>
        </div>
      </div>
    </form>
  </div>`;
  utils.printToDom('#edit-reservation', domString);
  let select = existing.hour - 10;
  if (select < 0 || select > 11) { select = 0; }
  setSelectedIndex(document.getElementById('hour'), select);
  updateAmPmEvent();
};

const displayReservations = () => new Promise((resolve, reject) => {
  let domString = `
  <div class="container">
  <div class="row mt-5 reservation-header justify-content-center">
    <h3>Existing Reservations:</h3>
  </div>
  <div class="row">
    <div class="filter-buttons ml-auto">
      <button type="button" class="btn btn-primary mx-1 ">Show All</button>
      <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Right-aligned menu
      </button>
      <div class="dropdown-menu dropdown-menu-right">

        <button class="dropdown-item" type="button">Action</button>
        <button class="dropdown-item" type="button">Another action</button>
        <button class="dropdown-item" type="button">Something else here</button>
      </div>
    </div>
  </div>
  </div>
  <div id="results-reservations">
    <div class="container-fluid">
      <div class="row">
  `;
  reservationsData.getReservations()
    .then((reservations) => {
      reservations.forEach((reservation) => {
        const date = moment(reservation.date).format('M/D/YYYY');
        const time = moment(reservation.time, 'hhmm').format('LT');
        domString += `
        <div class="col-auto">
          <div class="card reservation-card" id="${reservation.id}" style="width: 18em;">
            <div class="card-header">
              ${date} at ${time}
            </div>
            <div class="card-body">
              <h5 class="card-title">${reservation.name}</h5>
              <p class="card-text">Party of ${reservation.partySize}</p>
              <a href="#" class="btn btn-primary edit-reservation" id="edit-btn-${reservation.id}" data-reservationid="${reservation.id}">Edit</a>
            </div>
          </div>
        </div>`;
      });
      domString += '</div></div>';
      utils.printToDom('#display-reservations', domString);
      displayReservationsFilter();
      resolve();
    })
    .catch((err) => { reject(err); });
});

const reservationsPage = () => {
  undimCards();
  const domString = `
  <div class="container mt-5" id="edit-reservation">edit-reservation</div>
  <div class="container mt-5" id="display-reservations">display-reservations</div>`;
  utils.printToDom('#console', domString);
  displayReservations();
  displayReservationForm();
};

const editReservation = (reservationId) => {
  reservationsData.getReservationById(reservationId)
    .then((reservation) => {
      displayReservationForm(reservation, reservationId);
      $('#cancel-res-edit').removeClass('hide');
      $('#delete-reservation').removeClass('hide');
    })
    .catch((err) => console.error(err));
};

const editReservationEvent = (e) => {
  e.preventDefault();
  const reservationId = e.target.dataset.reservationid;
  editReservation(reservationId);
  dimCards(reservationId);
};

const addReservationEvent = (e) => {
  e.preventDefault();
  const time = Number($('#hour').val() + $('#minutes').val());
  const newResObj = {
    name: $('#name').val(),
    partySize: Number($('#size').val()),
    date: $('#date').val(),
    time,
  };
  reservationsData.addReservation(newResObj)
    .then(() => {
      displayReservations();
      displayReservationForm();
    })
    .catch((err) => console.error('could not create reservation', err));
};

const deleteReservationEvent = (e) => {
  e.preventDefault();
  const reservationId = e.target.dataset.reservationid;
  reservationsData.deleteReservation(reservationId)
    .then(() => {
      displayReservations();
      displayReservationForm();
    })
    .catch((err) => console.error('could not delete reservation', err));
};

const updateReservationEvent = (e) => {
  e.preventDefault();
  const reservationId = e.target.dataset.reservationid;
  const time = Number($('#hour').val() + $('#minutes').val());
  const newReservationInfo = {
    name: $('#name').val(),
    partySize: $('#size').val(),
    date: $('#date').val(),
    time,
  };
  reservationsData.updateReservation(reservationId, newReservationInfo)
    .then(() => {
      displayReservations();
      displayReservationForm();
    })
    .catch((err) => console.error('could not update reservation', err));
};

export default {
  reservationsPage, displayReservationForm, editReservationEvent, updateAmPm, addReservationEvent, deleteReservationEvent, updateReservationEvent,
};
