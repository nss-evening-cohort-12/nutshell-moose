import ingredData from '../../helpers/data/ingredData';
import utils from '../../helpers/utils';
import './ingredients.scss';

const typeToIcon = (type) => {
  let print = '';
  switch (type) {
    case 'vegetable':
      print = '<i class="fas fa-carrot fa-5x ingred-types"></i>';
      break;
    case 'fruit':
      print = '<i class="fas fa-apple-alt fa-5x ingred-types"></i>';
      break;
    case 'protein':
      print = '<i class="fas fa-drumstick-bite fa-5x ingred-types"></i>';
      break;
    default: print = '';
  }
  return print;
};

const ingredDom = (data) => {
  let domString = '<div class="d-flex justify-content-center flex-wrap" id="ingredients-list">';
  domString += `
              <div class="card"> 
              <div class="card-body d-flex flex-column h-100" id="add-ingredient">
                <div class="p-2 text-center"><i class="fas fa-plus fa-5x ingred-types"></i></div>
                <h5 class="card-title mb-auto p-2 text-center">Add Ingredient</h5>
              </div>
            </div>`;
  data.forEach((ingredient) => {
    domString += `
            <div class="card">
            <div class="card-body d-flex flex-column h-100">
              <div class="p-2 text-center">${typeToIcon(ingredient.type)}</div>
              <h5 class="card-title mb-auto p-2 text-center">${ingredient.name}</h5>
              <div class="d-flex justify-content-end flex-nowrap p-2">
                <span class="fa-stack fa-lg">
                  <i class="fa fa-circle fa-stack-2x"></i>
                  <i class="fa fa-pen fa-stack-1x fa-inverse"></i>
                </span>
                <span class="fa-stack fa-lg">
                  <i class="fa fa-circle fa-stack-2x"></i>
                  <i class="fa fa-trash fa-stack-1x fa-inverse"></i>
                </span>
              </div>
            </div>
          </div>
            `;
  });
  domString += '</div>';
  return domString;
};

const ingredients = () => {
  ingredData.getIngredients()
    .then((printIngredients) => {
      utils.printToDom('#console', ingredDom(printIngredients));
    })
    .catch((err) => console.error(err));
};

export default { ingredDom, ingredients };
