// import authData from '../../helpers/data/authData';
import utils from '../../helpers/utils';

const reservationForm = () => {
  const form = `<form>
  <div class="form-group row">
    <label for="name" class="col-sm-1 col-form-label">Name</label>
    <div class="col-sm-5">
      <input type="text" class="form-control" id="name">
    </div>
    <label for="Date" class="col-sm-1 col-form-label">Date</label>
    <div class="col-sm-5">
      <input type="text" class="form-control" id="date">
    </div>
  </div>
  <div class="form-group row">
    <label for="size" class="col-sm-1 col-form-label">Party size</label>
    <div class="col-sm-1">
      <input type="number" class="form-control" id="size">
    </div>
    <div class="col-sm-4"></div>
    <button type="submit" class="btn btn-primary col-sm-1">Submit</button>
    <div class="col-sm-5">
    </div>
</div>
</form>`;
  return form;
};

const reservationsPage = () => {
  utils.printToDom('#content', reservationForm());
};

export default { reservationsPage };
