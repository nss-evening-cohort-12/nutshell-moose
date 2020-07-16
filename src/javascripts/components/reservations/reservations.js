// import authData from '../../helpers/data/authData';
import moment from 'moment';
import utils from '../../helpers/utils';
import './reservations.scss';

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
        <div class="col-sm-5">
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
        <div class="col-sm-5">
        <input type="number" id="hour" name="hour" min="1" max="12">
        :
        <select id="minutes" name="minutes">
          <option value="00">00</option>
          <option value="15">15</option>
          <option value="30">30</option>
          <option value="45">45</option>
        </select>
        </div>
      </div>
      <div class="form-group row">
        <div class="col-sm-8"></div> 
        <button type="submit" class="btn btn-primary col-sm-1">Submit</button>
        <div class="col-sm-3"></div>
      </div>
      
    </form>
  </div>`;
  return form;
};

const reservationsPage = () => {
  let domString = `
  <div class="row mt-5" id="reservation-header">
    <h3>Add New Reservation</h3>
  </div>
  `;
  domString += reservationForm();
  utils.printToDom('#console', domString);
};

export default { reservationsPage };
