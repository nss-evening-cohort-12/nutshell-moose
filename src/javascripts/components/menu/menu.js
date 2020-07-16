import menuData from '../../helpers/data/menuData';
import utils from '../../helpers/utils';
import './menu.scss';

const menuDom = (data) => {
  let domString = '<div class="d-flex justify-content-around flex-wrap" id="menu-list">';
  data.forEach((menuItem) => {
    domString += `
            <div class="card">
            <img src="${menuItem.imgUrl}" class="card-img-top">
            <div class="card-body">
              <h5 class="card-title">${menuItem.name}</h5>
              <p class="card-text">$${menuItem.price.toFixed(2)}</p>
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
      utils.printToDom('#content', menuDom(printMenuItems));
    })
    .catch((err) => console.error(err));
};

export default { menuDom, menuItems };
