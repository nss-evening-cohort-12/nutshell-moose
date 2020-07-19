import menuData from '../../helpers/data/menuData';
import ingredData from '../../helpers/data/ingredData';
import utils from '../../helpers/utils';
import menu from '../menu/menu';

const editMenuCardForm = (obj, ingredients) => {
  let domString = `<div class="card-body">
                    <form id="edit-menu-item">
                      <div class="form-row">
                        <div class="form-group col-md-8">
                          <input type="text" class="form-control" name="foodName" value="${obj.name}">
                        </div>
                        <div class="form-group col-md-4">
                          <input type="text" class="form-control" name="foodPrice" value="${obj.price.toFixed(2)}">
                        </div>
                      </div>
                      <div class="form-group">
                        <input type="text" class="form-control" name="foodImageUrl" value="${obj.imgUrl}">
                      </div>
                      <div class="form-group d-flex flex-wrap">`;
  ingredients.forEach((ingredient) => {
    domString += `
  <div class="form-check mr-3">
    <input type="checkbox" class="form-check-input" name="ingredList" id="${ingredient.id}" value="${ingredient.id}"${obj.ingredients.find((ingred) => ingred.id === ingredient.id) ? ' checked' : ''}>
    <label class="form-check-label" for="${ingredient.id}">${ingredient.name}</label>
  </div>`;
  });
  domString += `
                      </div>
                      <input type="hidden" class="form-control" name="foodId" value="${obj.id}">
                      <button type="submit" class="btn btn-primary">Edit Menu Item</button>
                  </form>
                  </div>`;
  return domString;
};

const populateEditForm = (e) => {
  const menuId = e.target.dataset.editId;
  menuData.getMenuItemById(menuId)
    .then((menuItem) => { // we have menu item
      ingredData.getIngredients()
        .then((ingredsArray) => { // we have all ingredients
          ingredData.getIngredientsJoin()
            .then((joinedIngreds) => { // we have our joins
              const finalMenuItem = {
                id: menuId,
                name: menuItem.data.name,
                imgUrl: menuItem.data.imgUrl,
                price: menuItem.data.price * 1,
                ingredients: [],
              }; // new object we're making
              const filteredJoins = joinedIngreds.filter((ingreds) => ingreds.menuId === menuId); // these are only joins that belong to this menu item
              filteredJoins.forEach((join) => {
                const tempIngred = ingredsArray.find((ingred) => ingred.id === join.ingredientId);
                finalMenuItem.ingredients.push(tempIngred);
              });
              utils.printToDom(`#${menuId}`, editMenuCardForm(finalMenuItem, ingredsArray));
            });
        });
    })
    .catch((err) => console.error(err));
};

const processMenuEdit = (e) => {
  e.preventDefault();
  // push that object to db for update --
  // get all ingredients and filter by menuId
  // loop through submitted ingredients
  // check if checked
  // then check if in menuIngreds array
  // if not in array add new join
  // reprint dom
  const menuId = e.target.elements.foodId.value;
  const updatedItem = {
    imgUrl: e.target.elements.foodImageUrl.value,
    name: e.target.elements.foodName.value,
    price: e.target.elements.foodPrice.value * 1,
  };
  menuData.updateMenuItem(menuId, updatedItem)
    .then(() => {
      ingredData.getIngredientsJoin()
        .then((joins) => {
          const addIngredients = e.target.elements.ingredList;
          joins.forEach((join) => {
            if (join.menuId === menuId) {
              ingredData.deleteMenuIngredient(join.id);
            }
          });
          addIngredients.forEach((i) => {
            if (i.checked) {
              const newMenuIngred = {
                ingredientId: i.value,
                menuId,
              };
              ingredData.addMenuIngredient(newMenuIngred);
            }
          });
          menu.menuItems();
        });
    })
    .catch((err) => console.error(err));
};

export default { editMenuCardForm, populateEditForm, processMenuEdit };
