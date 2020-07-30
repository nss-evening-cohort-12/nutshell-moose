import moment from 'moment';
import utils from '../../helpers/utils';

const drawIngredients = () => {
  const today = moment(Date.now()).format('YYYY-MM-DD');
  const domString = ` 
    <div class="row d-flex justify-content-center">
    <div class="col-6 d-flex flex-column">
      <label class="btn btn-secondary active">
      <input type="radio" name="options" id="ingredients1Day" checked> 1 Day
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

export default { drawIngredients };
