import menuData from '../../helpers/data/menuData';
import ingredData from '../../helpers/data/ingredData';
import menu from '../menu/menu';

const newMenuItem = (e) => {
  e.preventDefault();
  const menuObj = {
    name: e.target.elements.foodName.value,
    price: e.target.elements.foodPrice.value,
    imgUrl: e.target.elements.foodImageUrl.value,
  };
  menuData.addMenuItem(menuObj)
    .then((response) => {
      const newMenuId = response.data.name;
      const addIngredients = e.target.elements.ingredList;
      addIngredients.forEach((i) => {
        if (i.checked) {
          const newMenuIngred = {
            ingredientId: i.value,
            menuId: newMenuId,
          };
          ingredData.addMenuIngredient(newMenuIngred);
        }
      });
      menu.menuItems();
    })
    .catch((err) => console.error(err));
};

export default { newMenuItem };
