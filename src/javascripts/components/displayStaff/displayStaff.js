import utils from '../../helpers/utils';
import staffData from '../../helpers/data/getStaffData';

const buildStaffConsole = () => {
  const domString1 = `
  <div class="container">
    <div class="row staffNav">
    <button type="button" id="addStaff" class="btn btn-info">Add Staff</button>
      <div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Filter by Staff
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a class="dropdown-item" id="Busser">Busser</a>
        <a class="dropdown-item" id="Server">Server</a>
        <a class="dropdown-item" id="Chef">Chef</a>
        <a class="dropdown-item" id="Manager">Manager</a>
        <a class="dropdown-item" id="Host">Host</a>
      </div>
    </div>
    </div>
    <div class="d-flex flex-wrap" id="staffCards"></div>
  <div>
  `;
  utils.printToDom('#console', domString1);
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
