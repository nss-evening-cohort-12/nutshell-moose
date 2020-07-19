import menuData from '../../helpers/data/menuData';
import utils from '../../helpers/utils';
import './menu.scss';
import ingredData from '../../helpers/data/ingredData';
import ingredients from '../ingredients/ingredients';

const menuDom = (data, data2) => {
  let domString = '<div class="d-flex justify-content-center flex-wrap" id="menu-list">';
  domString += `
            <div class="card flip-container" id="add-menu-item">  
            <div class="card-body"> 
              <div class="flipper"> 
                <div class="front flip-add-menu-form">
                  <div class="p-2 text-center"><i class="fas fa-plus fa-5x add-menu-plus"></i></div>
                  <h5 class="mb-auto p-2 text-center">Add Menu Item</h5>
                </div>
                <div class="back flex-column">
                <form id="add-new-menu">
                  <div class="form-row">
                    <div class="form-group col-md-8">
                      <input type="text" class="form-control" name="foodName" placeholder="Food Name">
                    </div>
                    <div class="form-group col-md-4">
                      <input type="text" class="form-control" name="foodPrice" placeholder="Price">
                    </div>
                  </div>
                  <div class="form-group">
                    <input type="text" class="form-control" name="foodImageUrl" placeholder="Image Url">
                  </div>
                  <div class="form-group d-flex flex-wrap">`;
  data2.forEach((ingredient) => {
    domString += `
    <div class="form-check mr-3">
    <input type="checkbox" class="form-check-input" name="ingredList" id="${ingredient.id}" value="${ingredient.id}">
    <label class="form-check-label" for="${ingredient.id}">${ingredient.name}</label>
    </div>
    `;
  });
  domString += `
                  </div>
                  <button type="submit" class="btn btn-primary">Add New Menu Item</button>
              </form>
                </div>
              </div>
              </div>
            </div>
              `;
  data.forEach((menuItem) => {
    const price = menuItem.price * 1;
    domString += `
            <div class="card" id="${menuItem.id}">
            <div class="card-img-top flip-container menu-cards">
              <div class="flipper">
                <div class="front">
                  <img src="${menuItem.imgUrl}" class="card-img-top">
                  <div class="flip-arrow">
                    <span class="fa-stack fa-lg">
                      <i class="fa fa-circle fa-stack-2x"></i>
                      <i class="fa fa-sync-alt fa-stack-1x fa-inverse"></i>
                    </span>
                  </div>
                </div>
                <div class="back text-center">
                  <h3>Ingredients List</h3>
                  <img src="https://i.ibb.co/602hTvZ/divider.png" class="divider">
                  <div class="d-flex flex-wrap justify-content-around">`;
    if (menuItem.ingredients) {
      menuItem.ingredients.forEach((ingredient) => {
        domString += `<span>${ingredients.typeToIcon(ingredient.type, 'fa-sm')}<br>${ingredient.name}</span>`;
      });
    }
    domString += `</div>
                </div>
              </div>
            </div>
            <div class="card-body d-flex flex-column h-100">
              <h5 class="card-title mb-auto p-2">${menuItem.name}</h5>
              <h4 class="card-text p-2">$${price.toFixed(2)}</h4>
              <div class="d-flex justify-content-end flex-nowrap p-2">
                <span class="fa-stack fa-lg">
                  <i class="fa fa-circle fa-stack-2x"></i>
                  <i class="fa fa-pen fa-stack-1x fa-inverse"></i>
                </span>
                <span class="fa-stack fa-lg">
                  <i class="fa fa-circle fa-stack-2x"></i>
                  <i class="fa fa-trash fa-stack-1x fa-inverse delete-menu-item" data-delete-id="${menuItem.id}"></i>
                </span>
              </div>
            </div>
          </div>
            `;
  });
  domString += '</div>';
  return domString;
};

const menuItems = () => {
  menuData.getMenuItems()
    .then((MenuItemsArray) => { // we have menu items
      ingredData.getIngredients()
        .then((ingredsArray) => { // we have ingredients
          ingredData.getIngredientsJoin()
            .then((joinedIngreds) => { // we have our joins
              const finalMenuItemsArray = []; // new array we're making
              MenuItemsArray.forEach((item) => {
                const filteredJoins = joinedIngreds.filter((ingreds) => ingreds.menuId === item.id); // these are only joins that belong to this menu item
                const finalIngreds = [];
                filteredJoins.forEach((join) => {
                  const tempIngred = ingredsArray.find((ingred) => ingred.id === join.ingredientId);
                  finalIngreds.push(tempIngred);
                });
                const objToPush = {
                  id: item.id,
                  name: item.name,
                  imgUrl: item.imgUrl,
                  price: item.price,
                  ingredients: finalIngreds,
                };
                finalMenuItemsArray.push(objToPush);
              });
              utils.printToDom('#console', menuDom(finalMenuItemsArray, ingredsArray));
            });
        });
    })
    .catch((err) => console.error(err));
};

export default { menuDom, menuItems };
