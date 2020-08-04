import './reports.scss';
import utils from '../../helpers/utils';
import orderData from '../../helpers/data/orderData';
import menuData from '../../helpers/data/menuData';

const countOrders = (arr) => {
  const ref = {};
  const res = [];
  arr.forEach((order) => {
    if (!(order.menuId in ref)) { res[ref[order.menuId] = res.length] = { menuId: order.menuId, count: 0 }; }
    res[ref[order.menuId]].count += 1;
  });
  return res;
};

const getOrderedMenuItems = () => new Promise((resolve, reject) => {
  orderData.getAllOrders()
    .then((response) => {
      // const menuOrders = [];
      const allOrders = utils.firebaseArray(response.data);
      const menuOrderCount = countOrders(allOrders);
      menuData.getMenuItems()
        .then((resp) => {
          const allMenuItems = resp;
          allMenuItems.forEach((mi) => {
            const countObject = menuOrderCount.find((moc) => moc.menuId === mi.id);
            // eslint-disable-next-line no-param-reassign
            mi.count = countObject.count;
          });
          resolve(allMenuItems);
        });
    })
    .catch((err) => reject(err));
});

const compareLow = (a, b) => {
  if (a.count < b.count) {
    return -1;
  }
  if (a.count > b.count) {
    return 1;
  }
  return 0;
};

const compareHigh = (a, b) => {
  if (a.count > b.count) {
    return -1;
  }
  if (a.count < b.count) {
    return 1;
  }
  return 0;
};

const drawCards = (e) => {
  const buttonClicked = e.target.id;
  getOrderedMenuItems().then((data) => {
    if (buttonClicked === 'mostPopular') {
      data.sort(compareHigh);
    } else {
      data.sort(compareLow);
    }
    let domString = '<div id="menuItemCards" class="justify-content-center d-flex flex-wrap">';
    data.forEach((d) => {
      domString += `
      <div class="p-2">
        <div class="card" style="width: 18rem;">
        <img src="${d.imgUrl}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${d.name}</h5>
          <p class="card-text">$${d.price}</p>
          <p class="card-text">Sold: ${d.count}</p>
        </div>
      </div>
    </div>`;
    });
    domString += '</div>';
    console.warn(domString);
    utils.printToDom('div #reportsDisplay', domString);
  });
};

const drawMenuItems = () => {
  const domString = `
    <div class="d-flex flex-row justify-content-center">
      <label class="m-3 btn btn-primary active">
      <input type="radio" name="options" id="mostPopular" checked> Most Popular
      </label>
      <label class="m-3 btn btn-primary">
      <input type="radio" name="options" id="leastPopular"> Least Popular
      </label>
    </div>
    <div id="reportsDisplay"></div>`;
  utils.printToDom('#menuItemsDiv', domString);
  $('#mostPopular').click(drawCards);
  $('#leastPopular').click(drawCards);
  $('#mostPopular').click();
};

export default { drawMenuItems };
