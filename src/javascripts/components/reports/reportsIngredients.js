import moment from 'moment';
import utils from '../../helpers/utils';
import ingredientsSmash from '../../helpers/data/ingredientsSmash';

const drawIngredients = () => {
  const today = moment(Date.now()).format('YYYY-MM-DD');
  const domString = ` 
    <div class="row d-flex justify-content-center">
    <div class="col-6 d-flex flex-column">
      <label class="btn btn-secondary active">
      <input type="radio" name="options" id="1IngredDay" value="1IngredDay" checked> 1 Day
      </label>
      <label class="btn btn-secondary">
      <input type="radio" name="options" id="7IngredDay" value="7IngredDay"> Date Range
      </label>
      <label class="btn btn-secondary">
        <input type="radio" name="options" id="allIngredDays" value="allIngredDays"> All Days
      </label>
    </div>
    <div id="dateContainer" class="col-6 d-flex flex-row inline-block">
    <div class="m-1">
    <label for="1date">1 Day/Start Date</label>
    <input type="date" class="m-1 form-control" id="1IngredDate" value="${today}">
    </div>
    <div class="m-1">
    <label for="7date">End Date</label>
    <input type="date" class="m-1 form-control" id="7IngredDate" value="${today}">
    </div>
    </div>
    <div>
    <button id="ingredientsSubmit" class="m5 btn btn-secondary submit">Submit</button>
    </div>
    </div>
    <div id="reportsIngredDisplay">cards go here</div>`;
  utils.printToDom('#ingredientsDiv', domString);
};

const get7DayIngredients = () => {
  const pickDate1 = $('#1IngredDate').val();
  const pickDate2 = $('#7IngredDate').val();
  // get reservations in the range of these dates
  let domString = '';
  ingredientsSmash.get7DayIngredAmount(pickDate2, pickDate1)
    .then((rawIngredients) => {
      domString += `
        <div class="mt-3 card text-center">
          <div class="card-header">
            Ingredients Used
          </div>
          <div class="card-body">
            <h2 class="card-title">Amount of Ingredients Used</h2>`;
      const keys = Object.keys(rawIngredients);
      keys.forEach((key) => {
        domString += `
            <h3 class="card-text"> ${key}: ${rawIngredients[key]}</h3>`;
      });
      domString += `
          </div>
          <div class="card-footer text-muted">
          </div>
        </div>
      `;
      utils.printToDom('div #reportsIngredDisplay', domString);
    })
    .catch((err) => console.warn('did not bring the reservation ', err));
};

const getOneDayIngredients = () => {
  const pickDate1 = $('#1IngredDate').val();
  // get reservations in the range of these dates
  let domString = '';
  ingredientsSmash.getOneDayIngredAmount(pickDate1)
    .then((rawIngredients) => {
      domString += `
        <div class="mt-3 card text-center">
          <div class="card-header">
            Ingredients Used
          </div>
          <div class="card-body">
            <h2 class="card-title">Amount of Ingredients Used</h2>`;
      const keys = Object.keys(rawIngredients);
      keys.forEach((key) => {
        domString += `
            <h3 class="card-text"> ${key}: ${rawIngredients[key]}</h3>`;
      });
      domString += `
          </div>
          <div class="card-footer text-muted">
          </div>
        </div>
      `;
      utils.printToDom('div #reportsIngredDisplay', domString);
    })
    .catch((err) => console.warn('did not bring the reservation ', err));
};

const getAllDayIngredients = () => {
  // get reservations in the range of these dates
  let domString = '';
  ingredientsSmash.getAllDayIngredAmount()
    .then((rawIngredients) => {
      domString += `
        <div class="mt-3 card text-center">
          <div class="card-header">
            Ingredients Used
          </div>
          <div class="card-body">
            <h2 class="card-title">Amount of Ingredients Used</h2>`;
      const keys = Object.keys(rawIngredients);
      keys.forEach((key) => {
        domString += `
            <h3 class="card-text"> ${key}: ${rawIngredients[key]}</h3>`;
      });
      domString += `
          </div>
          <div class="card-footer text-muted">
          </div>
        </div>
      `;
      utils.printToDom('div #reportsIngredDisplay', domString);
    })
    .catch((err) => console.warn('did not bring the reservation ', err));
};

const pickReport = () => {
  const radioVal = $('input[name="options"]:checked').val();
  let pickDate1;
  let pickDate2;
  switch (radioVal) {
    case '1IngredDay':
      // console.warn('this is one day report', valid);
      pickDate1 = $('#1IngredDate').val();
      if (pickDate1) {
        // eslint-disable-next-line no-use-before-define
        getOneDayIngredients();
        // console.warn('there is date selected', pickDate1, valid);
      } else {
        utils.printToDom('div #reportsIngredDisplay', 'Please select the date to get the report for it!!');
      }
      break;
    case '7IngredDay':
      // console.warn('this is 7 days report', valid);
      pickDate2 = $('#7IngredDate').val();
      pickDate1 = $('#1IngredDate').val();
      if (pickDate1 && pickDate2) {
        get7DayIngredients();
        // console.warn('there is date selected', pickDate1, pickDate2, valid);
      }
      break;
    case 'allIngredDays':
      // console.warn('this is all days report');
      getAllDayIngredients();
      break;
    default:
      // do nothing
  }
};

export default { drawIngredients, pickReport };
