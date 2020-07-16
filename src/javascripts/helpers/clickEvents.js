import displayStaff from '../components/displayStaff/displayStaff';

const clickEvents = () => {
  // click events go here
  $('body').on('click', '#staff-link', displayStaff.buildStaffConsole);
};

export default { clickEvents };
