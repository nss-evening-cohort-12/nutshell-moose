const buildOrderForm = (currentFilter) => {
  let domString = `
    <div class="container mt-2">
      <div class="card" id="firstCard">
        <h5 class="card-header">Reservation</h5>
        <div class="card-body">
          <div class=float-right>
            <input class="" type="date" id="myDate" value="${currentFilter}">
            <br>
            <select  class="mt-3" id="resOrder">
              <option value="" selected disabled> select reservation: </option>
              <option value="1">c1</option>
              <option value="2">c2</option>
            </select>
          </div>
          <h5 id="forCard-title1" class="card-title">Reservation</h5>
        </div>
      </div>
  `;
  domString += `
      <div id="clearByDate" class="card mt-2">
        <h5 class="card-header">Menu Order</h5>
        <div class="card-body">
          <h5 class="card-title"></h5>
          <div id = "orderMenu-person">
          </div>
          <div id = "orderMenu-menu">
          </div>
          <p class="card-text"></p>
          <div id="addTotalBtn-rePrint">
          <a href="#" id="addToTotalCost" class="btn btn-primary disabled">Add to total cost</a>
          </div>
        </div>
      </div>
      <div class="card mt-2 mb-5" id="summary">
        <h5 class="card-header">Summary</h5>
        <div class="p-2 ">
          <form id="submitTotal">
            <div class="form-group">
              <label for=""></label>
            </div>
            <div class="form-group">
            </div>
            <div class="form-check">
            </div>
            <div id="submitBtn">
              <button type="submit" class="btn btn-primary" disabled>Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;
  return domString;
};

export default { buildOrderForm };
