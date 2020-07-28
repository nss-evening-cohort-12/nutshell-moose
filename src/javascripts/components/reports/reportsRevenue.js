import utils from '../../helpers/utils';

const drawRevenue = () => {
  const domString = ` 
    <div class="row d-flex justify-content-center">
    <div class="col-6 d-flex flex-column">
      <label class="btn btn-secondary active">
      <input type="radio" name="options" id="1Day" checked> 1 Day
      </label>
      <label class="btn btn-secondary">
      <input type="radio" name="options" id="7Day"> 7 Day
      </label>
      <label class="btn btn-secondary">
        <input type="radio" name="options" id="allDays"> All Days
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

export default { drawRevenue };
