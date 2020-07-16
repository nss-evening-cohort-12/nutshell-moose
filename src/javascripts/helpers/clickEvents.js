import displayStaff from '../components/displayStaff/displayStaff';
import reservations from '../components/reservations/reservations';

const createRes = (e) => {
  e.preventDefault();
  console.error(e);
  const date = $('#date').val();
  console.error(date);
};

const clickEvents = () => {
  $('body').on('click', '#staff-link', displayStaff.buildStaffConsole);
  $('body').on('click', '#reservations-link', reservations.reservationsPage);
  $('body').on('click', '#create-reservation', createRes);
};

export default { clickEvents };
