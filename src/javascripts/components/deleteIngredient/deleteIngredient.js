import ingredData from '../../helpers/data/ingredData';
import ingredients from '../ingredients/ingredients';

const deleteIngredsAndJoins = (e) => {
  e.stopPropagation();
  const ingredientId = e.target.dataset.deleteId;
  ingredData.deleteIngredient(ingredientId)
    .then(() => {
      ingredData.getIngredientsJoin()
        .then((joins) => {
          const filteredJoins = joins.filter((join) => join.ingredientId === ingredientId);
          filteredJoins.forEach((join) => {
            ingredData.deleteMenuIngredient(join.id);
          });
          ingredients.ingredients();
        });
    })
    .catch((err) => console.error(err));
};

export default { deleteIngredsAndJoins };
