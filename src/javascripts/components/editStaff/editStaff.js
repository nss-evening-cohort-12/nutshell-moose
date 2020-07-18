import staffData from '../../helpers/data/getStaffData';
// // eslint-disable-next-line import/no-cycle
import displayStaff from '../displayStaff/displayStaff';

const editStaffEvent = (e) => {
  e.preventDefault();

  const editStaff = {
    name: $('.editStaffName').val(),
    type: $('#editStaffType option:selected')[0].innerHTML,
  };
  const { staffId } = e.target.dataset;

  staffData.editStaff(staffId, editStaff)
    .then(() => {
      displayStaff.buildStaffConsole();
    })
    .catch((err) => console.error(err));
};

export default { editStaffEvent };
