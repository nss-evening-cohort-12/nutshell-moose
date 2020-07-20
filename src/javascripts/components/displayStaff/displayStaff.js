import utils from '../../helpers/utils';
import staffData from '../../helpers/data/getStaffData';
// eslint-disable-next-line import/no-cycle
import addStaff from '../addStaff/addStaff';
// import editStaff from '../editStaff/editStaff';

const buildStaffCards = (allStaff) => {
  let domString = '';
  allStaff.forEach((staff) => {
    domString += `
    <div class="card" style="width: 18rem;">

      <div class="card-body cardContainer container">

        <div class="row">
            <h6>Name:</h6> <h5> ${staff.name}</h5>
        </div>

        <div class="row">
          <h6>Job Title: </h6> <h5> ${staff.type}</h5>
        </div>

        <div class="btn-group dropright">

          <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Edit Staff
          </button>

          <div class="dropdown-menu">

          <form class="px-4 py-3 editStaff">
            <div class="form-group">
              <label for="newStaffName">Name</label>
              <input type="text" name="editStaffName" class="form-control editStaffName" id="editStaffName" placeholder="${staff.name}">
            </div>
            <label for="staffType">Staff Role:</label>
            <div class="stopProp">
              <select name="editStaffType" id="editStaffType">
                <option value="Busser" ${staff.type === 'Busser' ? 'selected' : ''}>Busser</option>
                <option value="Server" ${staff.type === 'Server' ? 'selected' : ''}>Server</option>
                <option value="Chef" ${staff.type === 'Chef' ? 'selected' : ''}>Chef</option>
                <option value="Host" ${staff.type === 'Host' ? 'selected' : ''}>Host</option>
                <option value="Manager" ${staff.type === 'Manager' ? 'selected' : ''}>Manager</option>
              </select> 
            </div> 
      
                    
            <button type="submit" class="btn btn-primary editStaffSubmit" id="editStaffSubmit" data-staff-id=${staff.id} >Update Staff</button>
          </form>

        </div>
      </div>    
          <button class="btn btn-danger" data-staff-id=${staff.id} id="deleteStaff">Fire</button>
        </div>
    </div>
  `;
  });
  utils.printToDom('#staffCards', domString);
};

const buildStaffConsole = () => {
  const domString1 = `
  <div class="container">
    <div class="row staffNav">
    <div id="addStaffButton">stuff</div>
      <div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Filter by Staff
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <button class="dropdown-item" id="filterStaffType" data-staff-type="Busser" type="button">Busser</button>
        <button class="dropdown-item" id="filterStaffType" data-staff-type="Server" type="button">Server</button>
        <button class="dropdown-item" id="filterStaffType" data-staff-type="Chef" type="button">Chef</button>
        <button class="dropdown-item" id="filterStaffType" data-staff-type="Manager" type="button">Manager</button>
        <button class="dropdown-item" id="filterStaffType" data-staff-type="Host" type="button">Host</button>        
      </div>
    </div>
    </div>
    <div class="d-flex flex-wrap" id="staffCards"></div>
  <div>
  `;
  utils.printToDom('#console', domString1);
  addStaff.addStaffDropDown();
  staffData.getStaff()
    .then((allStaff) => {
      buildStaffCards(allStaff);
    })
    .catch((err) => console.error(err));
};

const deleteStaff = (e) => {
  staffData.deleteStaff(e.target.dataset.staffId)
    .then(() => {
      buildStaffConsole();
    })
    .catch((err) => console.error(err));
};

export default { buildStaffConsole, deleteStaff, buildStaffCards };
