import moment from 'moment';
import utils from '../../helpers/utils';
import ingredientsSmash from '../../helpers/data/ingredientsSmash';

const drawIngredients = () => {
  const today = moment(Date.now()).format('YYYY-MM-DD');
  const domString = ` 
    <div class="row d-flex justify-content-center">
    <div class="col-6 d-flex flex-column">
      <label class="btn btn-secondary active">
      <input type="radio" name="options" id="1Day" checked> 1 Day
      </label>
      <label class="btn btn-secondary">
      <input type="radio" name="options" id="7Day" value="7Day"> Date Range
      </label>
      <label class="btn btn-secondary">
        <input type="radio" name="options" id="allDays" value="allDays"> All Days
      </label>
    </div>
    <div id="dateContainer" class="col-6 d-flex flex-row inline-block">
    <div class="m-1">
    <label for="1date">1 Day/Start Date</label>
    <input type="date" class="m-1 form-control" id="1date" value="${today}">
    </div>
    <div class="m-1">
    <label for="1date">End Date</label>
    <input type="date" class="m-1 form-control" id="7date" value="${today}">
    </div>
    </div>
    <div>
    <button id="ingredientsSubmit" class="m5 btn btn-secondary submit">Submit</button>
    </div>
    </div>
    <div id="reportsDisplay">cards go here</div>`;
  utils.printToDom('#ingredientsDiv', domString);
};

const get7DayIngredients = () => {
  const pickDate1 = $('#1date').val();
  const pickDate2 = $('#7date').val();
  // get reservations in the range of these dates
  ingredientsSmash.get7DayIngredAmount(pickDate2, pickDate1)
    .then((rawIngredients) => {
      console.warn(rawIngredients);
    });
};

const pickReport = () => {
  const radioVal = $('input[name="options"]:checked').val();
  let pickDate1;
  let pickDate2;
  switch (radioVal) {
    case '1Day':
      // console.warn('this is one day report', valid);
      pickDate1 = $('#1date').val();
      if (pickDate1) {
        // eslint-disable-next-line no-use-before-define
        // getOneDayRevenue();
        // console.warn('there is date selected', pickDate1, valid);
      } else {
        utils.printToDom('#reportsDisplay', 'Please select the date to get the report for it!!');
      }
      break;
    case '7Day':
      // console.warn('this is 7 days report', valid);
      pickDate2 = $('#7date').val();
      pickDate1 = $('#1date').val();
      if (pickDate1 && pickDate2) {
        get7DayIngredients();
        // console.warn('there is date selected', pickDate1, pickDate2, valid);
      }
      break;
    case 'allDays':
      // console.warn('this is all days report');
      // getAllRevenue();
      break;
    default:
      // do nothing
  }
};

export default { drawIngredients, pickReport };
