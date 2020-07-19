import menu from '../components/menu/menu';
// eslint-disable-next-line import/no-cycle
import displayStaff from '../components/displayStaff/displayStaff';
import reservations from '../components/reservations/reservations';
import seating from '../components/seating/seating';
import navbar from '../components/navbar/navbar';
import addStaff from '../components/addStaff/addStaff';
import ingredients from '../components/ingredients/ingredients';
import filterStaff from '../components/filterStaff/filterStaff';
import auth from '../components/auth/auth';
import editStaff from '../components/editStaff/editStaff';
import addMenuItem from '../components/addMenuItem/addMenuItem';
import deleteMenuItem from '../components/deleteMenuItem/deleteMenuItem';

const clickEvents = () => {
  $('body').on('click', '#sign-in-button', auth.signMeIn);
  $('body').on('click', '#sign-out-button', auth.logoutEvent);

  $('body').on('click', '#reservations-link', reservations.reservationsPage);
  $('body').on('click', '#seating-link', seating.buildSeating);
  $('body').on('click', '#add-new-table', seating.numberValidation);

  $('body').on('click', '#staff-link', navbar.activeNavLinks);
  $('body').on('click', '#reservations-link', navbar.activeNavLinks);
  $('body').on('click', '#seating-link', navbar.activeNavLinks);
  $('body').on('click', '#menu-link', navbar.activeNavLinks);
  $('body').on('click', '#ingredient-link', navbar.activeNavLinks);

  $('body').on('click', '#menu-link', menu.menuItems);
  $('body').on('click', '#ingredient-link', ingredients.ingredients);
  $('body').on('click', '.menu-cards', (e) => {
    $(e.currentTarget).toggleClass('flipped');
  });
  $('body').on('click', '.flip-add-menu-form', (e) => {
    $(e.currentTarget).closest('.flip-container').toggleClass('flipped');
  });
  $('body').on('change', '#filter-date', reservations.filterEvent);
  $('body').on('click', '#all-reservations', reservations.reservationsPage);
};

const authClickEvents = () => {
  $('body').on('click', '#staff-link', displayStaff.buildStaffConsole);
  $('body').on('click', '.stopProp', ((e) => {
    e.stopPropagation();
  }));
  $('body').on('click', '#addNewStaff', addStaff.addStaffEvent);
  $('body').on('click', '#deleteStaff', displayStaff.deleteStaff);
  $('body').on('submit', '#add-new-menu', addMenuItem.newMenuItem);
  $('body').on('click', '.delete-menu-item', deleteMenuItem.deleteMenuItemAndJoins);
  $('body').on('click', '#filterStaffType', filterStaff.filterStaffEvent);
  $('body').on('click', '.editStaffSubmit', editStaff.editStaffEvent);

  $('body').on('click', '.edit-reservation', reservations.editReservationEvent);
  $('body').on('click', '#cancel-res-edit', reservations.reservationsPage);
  $('body').on('click', '#save-new-res', reservations.addReservationEvent);
  $('body').on('click', '#save-updated-res', reservations.updateReservationEvent);
  $('body').on('click', '#delete-reservation', reservations.deleteReservationEvent);
};

export default { clickEvents, authClickEvents };
