// import staffData from '../../helpers/data/getStaffData';
// // eslint-disable-next-line import/no-cycle
// import displayStaff from '../displayStaff/displayStaff';

const editStaffEvent = (e) => {
  e.preventDefault();
  const editStaff = {
    name: $('.editStaffName').val(),
    type: $('#editStaffTypes option:selected').text(),
  };
  console.error(editStaff);
  // staffData.editStaff(editStaff)
  //   .then((response) => {
  //     console.error(response);
  //     // displayStaff.buildStaffConsole();
  //   })
  //   .catch((err) => console.error(err));
};

export default { editStaffEvent };
