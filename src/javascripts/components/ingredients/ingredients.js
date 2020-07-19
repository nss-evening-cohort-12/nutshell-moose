import ingredData from '../../helpers/data/ingredData';
import utils from '../../helpers/utils';
import './ingredients.scss';

const typeToIcon = (type, size) => {
  let print = '';
  switch (type) {
    case 'vegetable':
      print = `<i class="fa fa-carrot ${size} ingred-types"></i>`;
      break;
    case 'fruit':
      print = `<i class="fa fa-apple-alt ${size} ingred-types"></i>`;
      break;
    case 'protein':
      print = `<i class="fa fa-drumstick-bite ${size} ingred-types"></i>`;
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
              <div class="p-2 text-center">${typeToIcon(ingredient.type, 'fa-5x')}</div>
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

export default { ingredDom, ingredients, typeToIcon };
