import menu from '../components/menu/menu';
// eslint-disable-next-line import/no-cycle
import displayStaff from '../components/displayStaff/displayStaff';
import reservations from '../components/reservations/reservations';
// eslint-disable-next-line import/no-cycle
import addStaff from '../components/addStaff/addStaff';
import ingredients from '../components/ingredients/ingredients';
import auth from '../components/auth/auth';

const clickEvents = () => {
  $('body').on('click', '#sign-in-button', auth.signMeIn);
  $('body').on('click', '#sign-out-button', auth.logoutEvent);

  $('body').on('click', '#reservations-link', reservations.reservationsPage);
  $('body').on('click', '#menu-link', menu.menuItems);
  $('body').on('click', '#ingredient-link', ingredients.ingredients);
  $('body').on('click', '.flip-container', (e) => {
    $(e.currentTarget).toggleClass('flipped');
  });
};

const authClickEvents = () => {
  $('body').on('click', '#staff-link', displayStaff.buildStaffConsole);
  $('body').on('click', '.stopProp', ((e) => {
    e.stopPropagation();
  }));
  $('body').on('click', '#addNewStaff', addStaff.addStaffEvent);
  $('body').on('click', '#deleteStaff', displayStaff.deleteStaff);

  $('body').on('click', '.edit-reservation', reservations.editReservationEvent);
  $('body').on('click', '#cancel-res-edit', reservations.reservationsPage);
  $('body').on('click', '#save-new-res', reservations.addReservationEvent);
  $('body').on('click', '#save-updated-res', reservations.updateReservationEvent);
  $('body').on('click', '#delete-reservation', reservations.deleteReservationEvent);
};

export default { clickEvents, authClickEvents };
