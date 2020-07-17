import utils from '../../helpers/utils';
import staffData from '../../helpers/data/getStaffData';
// eslint-disable-next-line import/no-cycle
import addStaff from '../addStaff/addStaff';

const buildStaffConsole = () => {
  const domString1 = `
  <div class="container">
    <div class="row staffNav">
    <div id="addStaffButton">stuff</div>
      <div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Filter by Staff
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <button class="dropdown-item" id="Busser" type="button">Busser</button>
        <button class="dropdown-item" id="Server" type="button">Server</button>
        <button class="dropdown-item" id="Chef" type="button">Chef</button>
        <button class="dropdown-item" id="Manager" type="button">Manager</button>
        <button class="dropdown-item" id="Host" type="button">Host</button>        
      </div>
    </div>
    </div>
    <div class="d-flex flex-wrap" id="staffCards"></div>
  <div>
  `;
  utils.printToDom('#console', domString1);
  addStaff.addStaffDropDown();
  let domString2 = '';
  staffData.getStaff()
    .then((allStaff) => {
      allStaff.forEach((staff) => {
        domString2 += `
        <div class="card" style="width: 18rem;">
          <div class="card-body cardContainer container">
            <div class="row">
              <h5 class="card-title">Name: </h5> <h6 class=" text-muted"> ${staff.name}</h6>
            </div>
            <div class="row">
              <h5 class="card-title">Job Title: </h5> <h6 class="card-subtitle mb-2 text-muted"> ${staff.type}</h6>
            </div>
            <button class="btn btn-danger" data-staff-id=${staff.id} id="editStaff">Edit</button>
          </div>
        </div>
        `;
      });
      utils.printToDom('#staffCards', domString2);
    })
    .catch((err) => console.error(err));
};

export default { buildStaffConsole };
