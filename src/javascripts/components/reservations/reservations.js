// import authData from '../../helpers/data/authData';
import moment from 'moment';
import utils from '../../helpers/utils';
import './reservations.scss';
import reservationsData from '../../helpers/data/reservationsData';

// const now = moment(Date.now()).format('MMMM Do YYYY, h:mm:ss a');
// <div id="reservation-form" class="mt-5 mx-auto">

const reservationForm = () => {
  const today = moment(Date.now()).format('YYYY-MM-DD');
  const form = `
  <div class="container" id="reservation-form">
    <form>
      <div class="form-group row">
        <label for="name" class="col-sm-1 col-form-label">Name:</label>
        <div class="col-sm-5">
          <input type="text" class="form-control" id="name" required>
        </div>
        <label for="date" class="col-sm-1 col-form-label">Date:</label>
        <div class="col-sm-4">
          <input type="date" min="${today}" class="form-control" id="date" required>
        </div>
      </div>
      <div class="form-group row">
        <label for="size" class="col-sm-1 col-form-label">Party size:</label>
        <div class="col-sm-1">
          <input type="number" class="form-control" id="size required" min="2" max="6">
        </div>
        <div class="col-sm-4"></div>
        <label for="time" class="col-sm-1 col-form-label">Time:</label>
        <div class="col-sm-4">
        <input type="number" id="hour" name="hour" min="1" max="12">
        :
        <select id="minutes" name="minutes">
          <option value="00">00</option>
          <option value="15">15</option>
          <option value="30">30</option>
          <option value="45">45</option>
        </select>
        </div>
        <button type="submit" class="btn btn-primary col-sm-1" id="create-reservation">Add</button>
      </div>
    </form>
  </div>
  </div>`;
  return form;
};

const displayReservations = () => new Promise((resolve, reject) => {
  let domString = '';
  reservationsData.getReservations()
    .then((reservations) => {
      // utils.printToDom('#console', result[0].name);
      // console.error(result[0]);
      // MAKE CARDS FOR EXISTING RESERVATIONS
      reservations.forEach((reservation) => {
        // const date = moment(reservation.date, 'YYYY-MM-DD');
        const date = moment(reservation.date).format('M/D/YYYY');
        const time = moment(reservation.time).format('LT');
        domString += `
        <div class="card reservation-card" style="width: 18rem;">
          <div class="card-header">
            ${date} at ${time}
          </div>
          <div class="card-body">
            <h5 class="card-title">${reservation.name}</h5>
            <p class="card-text">Party of ${reservation.partySize}</p>
            <a href="#" class="btn btn-primary">Edit</a>
          </div>
        </div>`;
      });
      resolve(domString);
    })
    .catch((err) => { reject(err); });
});

const reservationsPage = () => {
  let domString = `
  <div class="container mt-5" id="new-reservation">
    <div class="row reservation-header">
      <h3>Add New Reservation:</h3>
    </div>
  `;
  domString += reservationForm();
  domString += `
  <div class="container mt-5" id="display-reservations">
  <div class="row mt-5 reservation-header">
    <h3>Existing Reservations:</h3>
  </div>
  <div id="results-reservations">
  `;
  displayReservations()
    .then((result) => {
      domString += result;
      domString += '</div></div>';
      utils.printToDom('#console', domString);
    })
    .catch((err) => { console.error(err); });
  // utils.printToDom('#console', domString);
};

export default { reservationsPage, reservationForm };
