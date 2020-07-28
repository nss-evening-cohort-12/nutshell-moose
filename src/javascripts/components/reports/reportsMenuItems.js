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

const drawMenuItems = () => {
  const domString = `
    <div class="d-flex flex-row justify-content-center">
      <label class="m-3 btn btn-secondary active">
      <input type="radio" name="options" id="mostPopular" checked> Most Popular
      </label>
      <label class="m-3 btn btn-secondary">
      <input type="radio" name="options" id="LeastPopular"> Least Popular
      </label>
    </div>
    <div id="reportsDisplay">cards go here</div>`;
  utils.printToDom('#menuItemsDiv', domString);
  getOrderedMenuItems();
};

export default { drawMenuItems };
