import utils from '../../helpers/utils';
import staffData from '../../helpers/data/getStaffData';
// eslint-disable-next-line import/no-cycle
import addStaff from '../addStaff/addStaff';

const buildStaffCards = (allStaff) => {
  let domString = '';
  allStaff.forEach((staff) => {
    domString += `
    <div class="card" style="width: 18rem;">
    <div class="card-body cardContainer container">
      <div class="row">
        <h6 class=" text-muted">Name: </h6> <h5 class="card-title"> ${staff.name}</h5>
      </div>
      <div class="row">
      <h6 class="card-subtitle mb-2 text-muted">Job Title: </h6> <h5 class="card-title"> ${staff.type}</h5>
      </div>
      <button class="btn btn-success" data-staff-id=${staff.id} id="editStaff">Edit</button>
      <button class="btn btn-danger" data-staff-id=${staff.id} id="deleteStaff">Delete</button>
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
