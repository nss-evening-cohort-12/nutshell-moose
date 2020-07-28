import utils from '../../helpers/utils';

const drawIngredients = () => {
  const domString = ` 
    <div class="row d-flex justify-content-center">
    <div class="col-6 d-flex flex-column">
      <label class="btn btn-secondary active">
      <input type="radio" name="options" id="ingredients1Day" checked> 1 Day
      </label>
      <label class="btn btn-secondary">
      <input type="radio" name="options" id="ingredients7Day"> 7 Day
      </label>
      <label class="btn btn-secondary">
        <input type="radio" name="options" id="ingredientsAllDays"> All Days
      </label>
    </div>
    <div class="col-6 d-flex flex-column">
    <input type="date" class="m-1 form-control" id="ingredients1date">
    <input type="date" class="m-1 form-control" id="ingredients7date">
    </div>
    <div>
    <button id="ingredientsSubmit" class="m5 btn btn-secondary submit">Submit</button>
    </div>
    </div>
    <div id="reportsDisplay">cards go here</div>`;
  utils.printToDom('#ingredientsDiv', domString);
};

export default { drawIngredients };
