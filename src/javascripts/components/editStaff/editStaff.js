// import staffData from '../../helpers/data/getStaffData';
// eslint-disable-next-line import/no-cycle
// import displayStaff from '../displayStaff/displayStaff';

const editStaffDropDown = (staff) => {
  // eslint-disable-next-line no-unused-vars
  const domString = `
  <div class="btn-group dropright">
    <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      Edit Staff
    </button>
    <div class="dropdown-menu">
      <form class="px-4 py-3">
        <div class="form-group">
          <label for="newStaffName">Name</label>
          <input type="text" class="form-control" id="editStaffName" placeholder="${staff.name}">
        </div>
        <label for="staffType">Staff Role:</label>
        <div class="stopProp">
        <select name="staffType" id="newStaffType">
          <option value="Busser" ${staff.type === 'Busser' ? 'selcted' : ''}>Busser</option>
          <option value="Host" ${staff.type === 'Host' ? 'selcted' : ''}>Host</option>
          <option value="Chef" ${staff.type === 'Chef' ? 'selcted' : ''}>Chef</option>
          <option value="Waiter" ${staff.type === 'Waiter' ? 'selcted' : ''}>Waiter</option>
          <option value="Manager" ${staff.type === 'Manager' ? 'selcted' : ''}>Manager</option>
        </select>  
        <div>
                
        <button type="submit" class="btn btn-primary editStaffSubmit" >Update Staff</button>
      </form>

    </div>
  </div>

    <div class="dropdown-menu"> 
</div>
  `;
};

export default { editStaffDropDown };
