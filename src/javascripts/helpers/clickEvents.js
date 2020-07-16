import displayStaff from '../components/displayStaff/displayStaff';
import reservations from '../components/reservations/reservations';

const clickEvents = () => {
  $('body').on('click', '#staff-link', displayStaff.buildStaffConsole);
  $('body').on('click', '#reservations-link', reservations.reservationsPage);
};

export default { clickEvents };
