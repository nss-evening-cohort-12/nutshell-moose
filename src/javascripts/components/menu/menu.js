import menuData from '../../helpers/data/menuData';
import utils from '../../helpers/utils';
import './menu.scss';

const menuDom = (data) => {
  let domString = '<div class="d-flex justify-content-center flex-wrap" id="menu-list">';
  domString += `
              <div class="card"> 
              <div class="card-body d-flex flex-column h-100" id="add-menu-item">
                <div class="p-2 text-center"><i class="fas fa-plus fa-5x add-menu-plus"></i></div>
                <h5 class="card-title mb-auto p-2 text-center">Add Menu Item</h5>
              </div>
            </div>`;
  data.forEach((menuItem) => {
    domString += `
            <div class="card">
            <div class="card-img-top flip-container">
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
                  <div class="d-flex flex-wrap justify-content-between">
                    <span>Ingredient 1</span>
                    <span>Ingredient 2</span>
                    <span>Ingredient 3</span>
                    <span>Ingredient 4</span>
                    <span>Ingredient 5</span>
                    <span>Ingredient 6</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-body d-flex flex-column h-100">
              <h5 class="card-title mb-auto p-2">${menuItem.name}</h5>
              <h4 class="card-text p-2">$${menuItem.price.toFixed(2)}</h4>
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

const menuItems = () => {
  menuData.getMenuItems()
    .then((printMenuItems) => {
      utils.printToDom('#console', menuDom(printMenuItems));
    })
    .catch((err) => console.error(err));
};

export default { menuDom, menuItems };
