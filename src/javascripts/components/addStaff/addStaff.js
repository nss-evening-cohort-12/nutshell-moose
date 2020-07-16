import utils from '../../helpers/utils';

const addStaffDropDown = () => {
  const domString = `

  <div class="btn-group dropright">
    <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      Add Staff
    </button>
    <div class="dropdown-menu">
      <form class="px-4 py-3">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="test" class="form-control" id="name" placeholder="Name">
      </div>
      <div class="form-group">
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
      <div class="form-check">
        <input type="checkbox" class="form-check-input" id="dropdownCheck">
        <label class="form-check-label" for="dropdownCheck">
          Remember me
        </label>
      </div>
      <button type="submit" class="btn btn-primary">Sign in</button>
    </form>

    </div>
  </div>

    <div class="dropdown-menu"> 
</div>
  `;
  utils.printToDom('#addStaffButton', domString);
};

export default { addStaffDropDown };
