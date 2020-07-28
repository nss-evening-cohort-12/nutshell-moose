import utils from '../../helpers/utils';
import reportsRevenue from './reportsRevenue';
import reportsIngredients from './reportsIngredients';
import reportsMenuItems from './reportsMenuItems';

const drawReports = (e) => {
  e.preventDefault();
  const domString = `<div class="mt-5 ml-5 mr-5">
    <div>
      <div class="nav nav-tabs" id="nav-tab" role="tablist">
        <a class="nav-item nav-link active" id="nav-revenue-tab" data-toggle="tab" href="#nav-revenue" role="tab" aria-controls="nav-revenue" aria-selected="true">Revenue</a>
        <a class="nav-item nav-link" id="nav-ingredients-tab" data-toggle="tab" href="#nav-ingredients" role="tab" aria-controls="nav-ingredients" aria-selected="false">Ingredients</a>
        <a class="nav-item nav-link" id="nav-menuItems-tab" data-toggle="tab" href="#nav-menuItems" role="tab" aria-controls="nav-menuItems" aria-selected="false">Menu Items</a>
      </div>
    </div>
    <div class="tab-content" id="nav-tabContent">
      <div class="tab-pane fade show active" id="nav-revenue" role="tabpanel" aria-labelledby="nav-revenue-tab"><div id="revenueDiv" class="tabDiv">revenue</div></div>
      <div class="tab-pane fade" id="nav-ingredients" role="tabpanel" aria-labelledby="nav-ingredients-tab"><div id="ingredientsDiv" class="tabDiv">ingredidents</div></div>
      <div class="tab-pane fade" id="nav-menuItems" role="tabpanel" aria-labelledby="nav-menuItems-tab"><div id="menuItemsDiv" class="tabDiv">Menu Items</div></div>
    </div>
  </div>
  `;
  utils.printToDom('#console', domString);
  reportsRevenue.drawRevenue();
  $('#nav-revenue-tab').click(reportsRevenue.drawRevenue);
  $('#nav-ingredients-tab').click(reportsIngredients.drawIngredients);
  $('#nav-menuItems-tab').click(reportsMenuItems.drawMenuItems);
};

export default { drawReports };
