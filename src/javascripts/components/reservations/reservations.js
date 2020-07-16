// import authData from '../../helpers/data/authData';
import utils from '../../helpers/utils';
import './reservations.scss';

const reservationForm = () => {
  const form = `
  <div id="reservation-form" class="mt-5 mx-auto">
    <form>
      <div class="form-group row">
        <label for="name" class="col-sm-1 col-form-label">Name:</label>
        <div class="col-sm-5">
          <input type="text" class="form-control" id="name">
        </div>
        <label for="Date" class="col-sm-1 col-form-label">Date:</label>
        <div class="col-sm-5">
          <input type="text" class="form-control" id="date">
        </div>
      </div>
      <div class="form-group row">
        <label for="size" class="col-sm-1 col-form-label">Party size:</label>
        <div class="col-sm-1">
          <input type="number" class="form-control" id="size">
        </div>
        <div class="col-sm-4"></div>
        <div class="col-sm-6"></div>
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
