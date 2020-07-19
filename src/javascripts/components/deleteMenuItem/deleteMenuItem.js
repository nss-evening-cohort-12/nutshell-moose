// delete menu item with selected id
// find all menuIngredients with selected id
// foreach through menuIngredients and delete

import menuData from '../../helpers/data/menuData';
import ingredData from '../../helpers/data/ingredData';
import menu from '../menu/menu';

const deleteMenuItemAndJoins = (e) => {
  e.stopPropagation();
  const menuId = e.target.dataset.deleteId;
  menuData.deleteMenuItem(menuId)
    .then(() => {
      ingredData.getIngredientsJoin()
        .then((joins) => {
          const filteredJoins = joins.filter((join) => join.menuId === menuId);
          filteredJoins.forEach((join) => {
            ingredData.deleteMenuIngredient(join.id);
          });
          menu.menuItems();
        });
    })
    .catch((err) => console.error(err));
};

export default { deleteMenuItemAndJoins };
