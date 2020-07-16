// import authData from '../../helpers/data/authData';
import moment from 'moment';
import utils from '../../helpers/utils';
import './reservations.scss';
import reservationsData from '../../helpers/data/reservationsData';

const setSelectedIndex = (select, i) => {
  const s = select;
  s.options[i - 1].selected = true;
};

const displayReservationForm = (e) => {
  const today = moment(Date.now()).format('YYYY-MM-DD');
  const nextHour = Number(moment(Date.now()).format('hh')) + 1;
  let existing = {
    name: '',
    partySize: 2,
    date: today,
    hour: nextHour,
    minutes: '00',
  };
  let formType = 'Add New';
  if (e) {
    formType = 'Edit';
    existing = { ...e };
    existing.hour = Math.floor(existing.time / 100);
    existing.minutes = 0;
    console.error('existing', existing.hour);
  }
  let domString = `
      <div class="row reservation-header">
        <h3>${formType} Reservation:</h3>
      </div>`;
  // const today = moment(Date.now()).format('YYYY-MM-DD');
  domString += `
  <div class="container" id="reservation-form">
    <form>
      <div class="form-group row">
        <label for="name" class="col-sm-1 col-form-label">Name:</label>
        <div class="col-sm-5">
          <input type="text" class="form-control" id="name" value="${existing.name}" required>
        </div>
        <label for="date" class="col-sm-1 col-form-label">Date:</label>
        <div class="col-sm-4">
          <input type="date" min="${today}" class="form-control" id="date" value="${existing.date}" required>
        </div>
      </div>
      <div class="form-group row">
        <label for="size" class="col-sm-1 col-form-label">Party size:</label>
        <div class="col-sm-1">
          <input type="number" class="form-control" id="size" value=${existing.partySize} required" min="2" max="8">
        </div>
        <div class="col-sm-4"></div>
        <label for="time" class="col-sm-1 col-form-label">Time:</label>
        <div class="col-sm-4">
        <select id="hour" name="hour" value=${existing.hour}>
          <option value=11>11</option>
          <option value=12>12</option>
          <option value=1>1</option>
          <option value=2>2</option>
          <option value=3>3</option>
          <option value=4>4</option>
          <option value=5>5</option>
          <option value=6>6</option>
          <option value=7>7</option>
          <option value=8>8</option>
          <option value=9>9</option>
          <option value=10>10</option>
        </select>
        :
        <select id="minutes" name="minutes">
          <option value=00>00</option>
          <option value=15>15</option>
          <option value=30>30</option>
          <option value=45>45</option>
        </select>
        </div>
        <button type="submit" class="btn btn-primary col-sm-1" id="create-reservation">Save</button>
      </div>
    </form>
  </div>`;
  utils.printToDom('#edit-reservation', domString);
  const select = existing.hour - 10;
  console.error(select);
  setSelectedIndex(document.getElementById('hour'), select);
};

const displayReservations = () => new Promise((resolve, reject) => {
  let domString = `
  <div class="row mt-5 reservation-header">
    <h3>Existing Reservations:</h3>
  </div>
  <div id="results-reservations">
  `;
  reservationsData.getReservations()
    .then((reservations) => {
      reservations.forEach((reservation) => {
        const date = moment(reservation.date).format('M/D/YYYY');
        const time = moment(reservation.time, 'hhmm').format('LT');
        domString += `
        <div class="card reservation-card" style="width: 18rem;">
          <div class="card-header">
            ${date} at ${time}
          </div>
          <div class="card-body">
            <h5 class="card-title">${reservation.name}</h5>
            <p class="card-text">Party of ${reservation.partySize}</p>
            <a href="#" class="btn btn-primary edit-reservation" data-reservationid="${reservation.id}">Edit</a>
          </div>
        </div>`;
      });
      domString += '</div>';
      utils.printToDom('#display-reservations', domString);
      resolve();
    })
    .catch((err) => { reject(err); });
});

const reservationsPage = () => {
  const domString = `
  <div class="container mt-5" id="edit-reservation">edit-reservation</div>
  <div class="container mt-5" id="display-reservations">display-reservations</div>`;
  utils.printToDom('#console', domString);
  displayReservations();
  displayReservationForm();
};

// const reservationsPage = () => {
//   let domString = `
//   <div class="container mt-5" id="new-reservation">
//     <div class="row reservation-header">
//       <h3>Add New Reservation:</h3>
//     </div>
//   `;
//   domString += displayReservationForm();
//   domString += `
//   <div class="container mt-5" id="display-reservations">
//   <div class="row mt-5 reservation-header">
//     <h3>Existing Reservations:</h3>
//   </div>
//   <div id="results-reservations">
//   `;
//   displayReservations()
//     .then((result) => {
//       domString += result;
//       domString += '</div></div>';
//       utils.printToDom('#console', domString);
//     })
//     .catch((err) => { console.error(err); });
// };

const editReservation = (e) => {
  e.preventDefault();
  // console.error(e.target.dataset.reservationid);
  // const reservationId = e.target.dataset.reservationid;
  reservationsData.getReservationById(e.target.dataset.reservationid)
    .then((reservation) => {
      displayReservationForm(reservation);
    })
    .catch((err) => console.error(err));
};

export default { reservationsPage, displayReservationForm, editReservation };
