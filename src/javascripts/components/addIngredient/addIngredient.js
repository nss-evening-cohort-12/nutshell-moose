import ingredData from '../../helpers/data/ingredData';
import ingredients from '../ingredients/ingredients';

const newIngredient = (e) => {
  e.preventDefault();
  const ingredientObj = {
    name: e.target.elements.ingredName.value,
    type: e.target.elements.ingredType.value,
    quantity: e.target.elements.ingredQuantity.value,
  };
  ingredData.addIngredient(ingredientObj)
    .then(() => {
      ingredients.ingredients();
    })
    .catch((err) => console.error(err));
};

export default { newIngredient };
