import ingredData from '../../helpers/data/ingredData';
import ingredients from '../ingredients/ingredients';

const submitEdit = (e) => {
  e.preventDefault();
  const ingredientId = e.target.elements.ingredientId.value;
  const updatedIngredient = {
    name: e.target.elements.ingredName.value,
    type: e.target.elements.ingredType.value,
  };
  ingredData.updateIngredients(ingredientId, updatedIngredient)
    .then(() => {
      ingredients.ingredients();
    })
    .catch((err) => console.error(err));
};

export default { submitEdit };
