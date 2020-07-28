import utils from '../../helpers/utils';

import reservationsData from '../../helpers/data/reservationsData';
import orderData from '../../helpers/data/orderData';
import menuData from '../../helpers/data/menuData';

let domString = '';
let totalCost = 0;
let haveTotalCheck = false;

const updateOrderMenu = (resId) => {
  reservationsData.getReservationById(resId)
    .then((responseResObj) => {
      const resObj = responseResObj;
      console.warn('exccute updateMenu and res party ', resObj);
      if (resObj.totalCost > 0) {
        haveTotalCheck = true;
      } else {
        haveTotalCheck = false;
      }
      orderData.getOrderByReserveId(resId)
        .then((response) => {
          const orderArr = response;
          // console.warn('this is the array of order length ', orderArr.length);
          const partySizeLeft = orderArr.length;

          domString = `
          <select  class="mt-3" id="personOrder">
            <option value="" selected disabled> select person: </option>
          `;
          for (let i = 0; i < partySizeLeft; i += 1) {
            domString += `
              <option value="${i + 1}" id="${i + 1}" disabled>person ${i + 1}</option>
            `;
          }
          for (let i = 0; i < resObj.partySize - partySizeLeft; i += 1) {
            domString += `
              <option value="${i + partySizeLeft + 1}" id="${i + partySizeLeft + 1}" >person ${i + partySizeLeft + 1}</option>
            `;
          }
          domString += '</select>';
          domString += `
          <select  class="mt-3 float-right" id="menuOrder">
            <option value="" selected disabled> select menu: </option>
          </select>
          `;
          utils.printToDom('#orderMenu-person', domString);

          domString = '';

          for (let i = 0; i < orderArr.length; i += 1) {
            domString += `
            <div id = "p${i + 1}" class="form-group">
              <label for="person ${i + 1}">Person ${i + 1}</label>
              <input type="text" class="form-control" id="person ${i + 1}" aria-describedby="menu price" placeholder="0" value="$${orderArr[i].price}.00" disabled>
            </div>
            `;
            totalCost += orderArr[i].price;
          }
          for (let i = 0; i < resObj.partySize - partySizeLeft; i += 1) {
            domString += `
            <div id = "p${i + partySizeLeft + 1}" class="form-group">
              <label for="person ${i + partySizeLeft + 1}">Person ${i + partySizeLeft + 1}</label>
              <input type="text" class="form-control" id="person ${i + partySizeLeft + 1}" aria-describedby="menu price" placeholder="0" value="0">
            </div>
            `;
          }
          domString += `
          <div id = "totalCost" class="form-group">
            <label for="totalCost">Total Cost:</label>
            <input type="text" class="form-control" id="totalCostValue" aria-describedby="menu price" placeholder="0" value="${totalCost}">
          </div>        
          `;
          console.warn('see the total check ', haveTotalCheck);
          if (haveTotalCheck) {
            domString += `
              <div id="submitBtn">
                <button type="submit" class="btn btn-primary" disabled>Submit</button>
              </div>
            `;
          } else if (orderArr.length === resObj.partySize) {
            domString += `
              <div id="submitBtn">
                <button type="submit" class="btn btn-primary" >Submit</button>
              </div>
            `;
          } else {
            domString += `
              <div id="submitBtn">
                <button type="submit" class="btn btn-primary" disabled>Submit</button>
              </div>
            `;
          }
          utils.printToDom('#submitTotal', domString);
          domString = `
          <select  class="mt-3" id="personOrder">
            <option value="" selected disabled> select person: </option>
          `;
          for (let i = 0; i < resObj.partySize; i += 1) {
            domString += `
              <option value="${i + 1}" id="ddlP${i + 1}">person ${i + 1}</option>
            `;
          }
          domString += '</select>';
          domString += `
          <select  class="mt-3 float-right" id="menuOrder">
            <option value="" selected disabled> select menu: </option>
          </select>
          `;
          utils.printToDom('#orderMenu-person', domString);

          domString = '';

          for (let i = 0; i < resObj.partySize; i += 1) {
            domString += `
            <div id = "p${i + 1}" class="form-group">
              <label for="person ${i + 1}">Person ${i + 1}</label>
              <input type="text" class="form-control" id="person ${i + 1}" aria-describedby="menu price" placeholder="0" value="0">
            </div>
            `;
          }
          domString += `
          <div id = "totalCost" class="form-group">
            <label for="totalCost">Total Cost:</label>
            <input type="text" class="form-control" id="totalCostValue" aria-describedby="menu price" placeholder="0" value="${totalCost}">
          </div>
          `;
          domString += `
            <div id="submitBtn">
              <button type="submit" class="btn btn-primary" disabled>Submit</button>
            </div>
          `;
          utils.printToDom('#submitTotal', domString);
          menuData.getMenuItems()
            .then((responseMenu) => {
              domString = `
              <select  class="mt-3 float-right" id="menuOrder">
              <option value="" selected disabled> select menu: </option>
              `;
              const menuArr = responseMenu;
              menuArr.forEach((item) => {
                domString += `<option value="${item.price}" id="${item.name}" data-value=${item.id}>${item.name} - Price $${item.price}.00</option>`;
              });
              domString += '</select>';
              utils.printToDom('#menuOrder', domString);
            });
        // console.warn('this is the array of order length ', orderArr.length);
        });
    })
    .catch((err) => console.warn('error to get resById ', err));
};

export default { updateOrderMenu };
