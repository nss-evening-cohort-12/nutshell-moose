import menu from '../components/menu/menu';
import displayStaff from '../components/displayStaff/displayStaff';
import reservations from '../components/reservations/reservations';
import seating from '../components/seating/seating';
import navbar from '../components/navbar/navbar';
import addStaff from '../components/addStaff/addStaff';

const clickEvents = () => {
  $('body').on('click', '#staff-link', displayStaff.buildStaffConsole);
  $('body').on('click', '#reservations-link', reservations.reservationsPage);
  $('body').on('click', '#seating-link', seating.buildSeating);
  $('body').on('click', '#add-new-table', seating.numberValidation);

  $('body').on('click', '#staff-link', navbar.activeNavLinks);
  $('body').on('click', '#reservations-link', navbar.activeNavLinks);
  $('body').on('click', '#seating-link', navbar.activeNavLinks);
  $('body').on('click', '#menu-link', navbar.activeNavLinks);
  $('body').on('click', '#ingredient-link', navbar.activeNavLinks);

  $('body').on('click', '#menu-link', menu.menuItems);
  $('body').on('click', '.flip-container', (e) => {
    $(e.currentTarget).toggleClass('flipped');
  });
  $('body').on('click', '.stopProp', ((e) => {
    e.stopPropagation();
  }));
  $('body').on('click', '#addNewStaff', addStaff.addStaffEvent);
};

export default { clickEvents };
