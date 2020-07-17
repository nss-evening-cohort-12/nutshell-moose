import displayStaff from '../components/displayStaff/displayStaff';
import reservations from '../components/reservations/reservations';

const clickEvents = () => {
  $('body').on('click', '#staff-link', displayStaff.buildStaffConsole);
  $('body').on('click', '#reservations-link', reservations.reservationsPage);
  $('body').on('click', '.edit-reservation', reservations.editReservationEvent);
  $('body').on('click', '#cancel-res-edit', reservations.reservationsPage);
  // $('body').on('click', '#hour', reservations.updateAmPm);
};

export default { clickEvents };
