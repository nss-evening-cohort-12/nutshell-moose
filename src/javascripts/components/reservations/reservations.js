// import authData from '../../helpers/data/authData';
import moment from 'moment';
import utils from '../../helpers/utils';
import './reservations.scss';

// const now = moment(Date.now()).format('MMMM Do YYYY, h:mm:ss a');

const reservationForm = () => {
  const today = moment(Date.now()).format('YYYY-MM-DD');
  const form = `
  <div id="reservation-form" class="mt-5 mx-auto">
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
          <input type="number" class="form-control" id="size required">
        </div>
        <div class="col-sm-4"></div>
        <label for="time" class="col-sm-1 col-form-label">Time:</label>
        <div class="col-sm-5">
          <input type="time" min="11:00" max="21:00" class="form-control" id="time" required>
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
  utils.printToDom('#content', reservationForm());
};

export default { reservationsPage };
