import utils from '../../helpers/utils';
import staffData from '../../helpers/data/getStaffData';
// eslint-disable-next-line import/no-cycle
import displayStaff from '../displayStaff/displayStaff';

const addStaffDropDown = () => {
  const domString = `

  <div class="btn-group dropright">
    <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      Add Staff
    </button>
    <div class="dropdown-menu">
      <form class="px-4 py-3">
        <div class="form-group">
          <label for="newStaffName">Name</label>
          <input type="text" class="form-control" id="newStaffName" placeholder="Name">
        </div>
        <label for="staffType">Staff Role:</label>
        <div class="stopProp">
        <select name="staffType" id="newStaffType">
          <option value="busser">Busser</option>
          <option value="Host">Host</option>
          <option value="Chef">Chef</option>
          <option value="Waiter">Waiter</option>
          <option value="Manager">Manager</option>
        </select>  
        <div>
                
        <button type="submit" class="btn btn-primary" id="addNewStaff">Add New Staff</button>
      </form>

    </div>
  </div>

    <div class="dropdown-menu"> 
</div>
  `;
  utils.printToDom('#addStaffButton', domString);
};

const addStaffEvent = (e) => {
  e.preventDefault();

  const newStaff = {
    name: $('#newStaffName').val(),
    type: $('#newStaffType').val(),
  };

  staffData.addStaff(newStaff)
    .then(() => {
      displayStaff.buildStaffConsole();
    })
    .catch((err) => console.error(err));
};

export default { addStaffDropDown, addStaffEvent };
