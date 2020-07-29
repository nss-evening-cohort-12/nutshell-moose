import utils from '../../helpers/utils';
import reservationsData from '../../helpers/data/reservationsData';

const drawRevenue = () => {
  const domString = ` 
    <div class="row d-flex justify-content-center">
    <div class="col-6 d-flex flex-column">
      <label class="btn btn-secondary active">
      <input type="radio" name="options" id="1Day" value="1Day" checked> 1 Day
      </label>
      <label class="btn btn-secondary">
      <input type="radio" name="options" id="7Day" value="7Day"> 7 Day
      </label>
      <label class="btn btn-secondary">
        <input type="radio" name="options" id="allDays" value="allDays"> All Days
      </label>
    </div>
    <div class="col-6 d-flex flex-column">
    <input type="date" class="m-1 form-control" id="1date">
    <input type="date" class="m-1 form-control" id="7date">
    </div>
    <div>
    <button id="revenueSubmit" class="m5 btn btn-secondary submit">Submit</button>
    </div>
    </div>
    <div id="reportsDisplay">cards go here</div>`;
  utils.printToDom('#revenueDiv', domString);
};

const pickReport = () => {
  const radioVal = $('input[name="options"]:checked').val();
  let pickDate1;
  let pickDate2;
  let valid = false;
  switch (radioVal) {
    case '1Day':
      // console.warn('this is one day report', valid);
      pickDate1 = $('#1date').val();
      if (pickDate1) {
        valid = true;
        // eslint-disable-next-line no-use-before-define
        getOneDayRevenue();
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
        valid = true;
        // console.warn('there is date selected', pickDate1, pickDate2, valid);
      }
      break;
    case 'allDays':
      // console.warn('this is all days report');
      valid = true;
      console.warn('there is status', valid);
      break;
    default:
      // do nothing
  }
};

const getOneDayRevenue = () => {
  const pickDate1 = $('#1date').val();
  let domString = '';
  let totalCost = 0;
  reservationsData.getReservations(pickDate1)
    .then((response) => {
      const resObj = response;
      resObj.forEach((res) => {
        totalCost += res.totalCost;
      });
      domString += `
        <div class="mt-3 card text-center">
          <div class="card-header">
            One Day Revenue
          </div>
          <div class="card-body">
            <h2 class="card-title">${pickDate1}</h2>
            <h3 class="card-text">Total revenue for that day : $${totalCost}.00</h3>
          </div>
          <div class="card-footer text-muted">
          </div>
        </div>
      `;
      utils.printToDom('#reportsDisplay', domString);
    })
    .catch((err) => console.warn('did not bring the reservation ', err));
};

export default { drawRevenue, pickReport };
