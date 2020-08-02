import firebase from 'firebase/app';
import 'firebase/auth';
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
import editMenuItem from '../components/editMenuItem/editMenuItem';
import filterMenuItems from '../components/filterMenuItems/filterMenuItems';
import addIngredient from '../components/addIngredient/addIngredient';
import editIngredient from '../components/editIngredient/editIngredient';
import deleteIngredient from '../components/deleteIngredient/deleteIngredient';
import displayOrder from '../components/orders/displayOrder';
import reports from '../components/reports/reports';
import reportsRevenue from '../components/reports/reportsRevenue';
import reportsIngredients from '../components/reports/reportsIngredients';

const clickEvents = () => {
  // BOTH AUTHORIZED AND NON-AUTHORIZED USER USER CLICK EVENTS:
  $('body').on('click', '#sign-in-button', auth.signMeIn);
  $('body').on('click', '#sign-out-button', auth.logoutEvent);

  $('body').on('click', '#reservations-link', reservations.reservationsPage);
  $('body').on('click', '#seating-link', seating.buildSeating);

  $('body').on('click', '#staff-link', navbar.activeNavLinks);
  $('body').on('click', '#reservations-link', navbar.activeNavLinks);
  $('body').on('click', '#seating-link', navbar.activeNavLinks);
  $('body').on('click', '#menu-link', navbar.activeNavLinks);
  $('body').on('click', '#ingredient-link', navbar.activeNavLinks);
  $('body').on('click', '#orders-link', navbar.activeNavLinks);
  $('body').on('click', '#reports-link', navbar.activeNavLinks);

  $('body').on('click', '#reports-link', reports.drawReports);
  $('body').on('click', '#menu-link', menu.menuItems);
  $('body').on('click', '#ingredient-link', ingredients.ingredients);
  $('body').on('click', '.menu-cards', (e) => {
    $(e.currentTarget).toggleClass('flipped');
  });
  $('body').on('click', '.flip-add-menu-form', (e) => {
    $(e.currentTarget).closest('.flip-container').toggleClass('flipped');
  });
  $('body').on('change', '#filter-date', reservations.filterEvent);
  // $('body').on('change', '#filter-date', displayOrder.filterEventOrder);
  $('body').on('change', '#myDate', displayOrder.checkFilterDate);
  $('body').on('click', '#all-reservations', reservations.reservationsPage);
  $('body').on('change', '.filter-menu', filterMenuItems.filterMenu);
  // $('#addToTotalCost').click(addToForm(person, price));
  $('body').on('click', '#addToTotalCost', displayOrder.addToForm);

  // AUTHORIZED USER ONLY CLICK EVENTS (add in both sections so it removes click event on logout):
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      $('body').on('click', '#staff-link', displayStaff.buildStaffConsole);
      $('body').on('click', '#orders-link', displayOrder.buildOrderConsole2);
      $('body').on('click', '.stopProp', ((e) => {
        e.stopPropagation();
      }));
      $('body').on('click', '#addNewStaff', addStaff.addStaffEvent);
      $('body').on('click', '.deleteStaff', displayStaff.deleteStaff);
      $('body').on('submit', '#add-new-menu', addMenuItem.newMenuItem);
      $('body').on('submit', '#edit-menu-item', editMenuItem.processMenuEdit);
      $('body').on('click', '.edit-menu-item', editMenuItem.populateEditForm);
      $('body').on('click', '.delete-menu-item', deleteMenuItem.deleteMenuItemAndJoins);
      $('body').on('submit', '#add-new-ingredient', addIngredient.newIngredient);
      $('body').on('submit', '.edit-ingredient', editIngredient.submitEdit);
      $('body').on('click', '.delete-ingredient', deleteIngredient.deleteIngredsAndJoins);
      $('body').on('click', '#filterStaffType', filterStaff.filterStaffEvent);
      $('body').on('click', '.editStaffSubmit', editStaff.editStaffEvent);
      $('body').on('click', '.edit-reservation-btn', reservations.editReservationEvent);
      $('body').on('click', '#cancel-res-edit', reservations.reservationsPage);
      $('body').on('click', '#save-new-res', reservations.addReservationEvent);
      $('body').on('click', '#save-updated-res', reservations.updateReservationEvent);
      $('body').on('click', '#delete-reservation', reservations.deleteReservationEvent);
      $('body').on('click', '#add-new-table', seating.numberValidation);
      $('body').on('click', '#edit-table', seating.editTableForm);
      $('body').on('click', '#edit-current-table', seating.editTableEvent);
      $('body').on('click', '#delete-table', seating.deleteTableEvent);
      $('body').on('click', '#submitBtn', displayOrder.addTotalToRes);
      $('body').on('change', '#resOrder', displayOrder.dropUpdate);
      $('body').on('change', '#personOrder', displayOrder.personDropUpdate);
      $('body').on('change', '#menuOrder', displayOrder.menuDropUpdate);
      $('body').on('click', '#revenueSubmit', reportsRevenue.pickReport);
      $('body').on('click', '#ingredientsSubmit', reportsIngredients.pickReport);
      $('body').on('click', '#1IngredDay', reportsIngredients.toggleDatePicker);
      $('body').on('click', '#7IngredDay', reportsIngredients.toggleDatePicker);
      $('body').on('click', '#allIngredDays', reportsIngredients.toggleDatePicker);
    }
    if (!user) {
      $('body').off('click', '#staff-link', displayStaff.buildStaffConsole);
      $('body').off('click', '.stopProp', ((e) => {
        e.stopPropagation();
      }));
      $('body').off('click', '#addNewStaff', addStaff.addStaffEvent);
      $('body').off('click', '.deleteStaff', displayStaff.deleteStaff);
      $('body').off('submit', '#add-new-menu', addMenuItem.newMenuItem);
      $('body').off('submit', '#edit-menu-item', editMenuItem.processMenuEdit);
      $('body').off('click', '.edit-menu-item', editMenuItem.populateEditForm);
      $('body').off('click', '.delete-menu-item', deleteMenuItem.deleteMenuItemAndJoins);
      $('body').off('click', '#filterStaffType', filterStaff.filterStaffEvent);
      $('body').off('click', '.editStaffSubmit', editStaff.editStaffEvent);
      $('body').off('click', '.edit-reservation-btn', reservations.editReservationEvent);
      $('body').off('click', '#cancel-res-edit', reservations.reservationsPage);
      $('body').off('click', '#save-new-res', reservations.addReservationEvent);
      $('body').off('click', '#save-updated-res', reservations.updateReservationEvent);
      $('body').off('click', '#delete-reservation', reservations.deleteReservationEvent);
      $('body').off('click', '#add-new-table', seating.numberValidation);
      $('body').off('click', '#edit-table', seating.editTableEvent);
      $('body').off('click', '#edit-current-table', seating.editTableEvent);
      $('body').off('click', '#delete-table', seating.deleteTableEvent);
    }
  });
};

export default { clickEvents };
