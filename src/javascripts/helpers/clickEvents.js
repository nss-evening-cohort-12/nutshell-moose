import displayStaff from '../components/displayStaff/displayStaff';
import reservations from '../components/reservations/reservations';

const clickEvents = () => {
  $('body').on('click', '#staff-link', displayStaff.buildStaffConsole);
  $('body').on('click', '#reservations-link', reservations.reservationsPage);
  $('body').on('click', '.edit-reservation', reservations.editReservationEvent);
  $('body').on('click', '#cancel-res-edit', reservations.reservationsPage);
  $('body').on('click', '#save-new-res', reservations.addReservationEvent);
  $('body').on('click', '#save-updated-res', reservations.updateReservationEvent);
  $('body').on('click', '#delete-reservation', reservations.deleteReservationEvent);
};

export default { clickEvents };
