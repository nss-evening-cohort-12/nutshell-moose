import displayStaff from '../components/displayStaff/displayStaff';
import reservations from '../components/reservations/reservations';
import seating from '../components/seating/seating';

const clickEvents = () => {
  $('body').on('click', '#staff-link', displayStaff.buildStaffConsole);
  $('body').on('click', '#reservations-link', reservations.reservationsPage);
  $('body').on('click', '#seating-link', seating.buildSeating);
};

export default { clickEvents };
