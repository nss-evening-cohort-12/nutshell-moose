import utils from '../../helpers/utils';

const drawMenuItems = () => {
  const domString = `
    <div class="d-flex flex-row justify-content-center">
      <label class="m-3 btn btn-secondary active">
      <input type="radio" name="options" id="mostPopular" checked> Most Popular
      </label>
      <label class="m-3 btn btn-secondary">
      <input type="radio" name="options" id="LeastPopular"> Least Popular
      </label>
    </div>
    <div id="reportsDisplay">cards go here</div>`;
  utils.printToDom('#menuItemsDiv', domString);
};

export default { drawMenuItems };
