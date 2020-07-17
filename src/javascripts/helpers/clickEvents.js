import menu from '../components/menu/menu';
import displayStaff from '../components/displayStaff/displayStaff';
import reservations from '../components/reservations/reservations';
import seating from '../components/seating/seating';
import navbar from '../components/navbar/navbar';

const clickEvents = () => {
  $('body').on('click', '#staff-link', displayStaff.buildStaffConsole);
  $('body').on('click', '#reservations-link', reservations.reservationsPage);
  $('body').on('click', '#seating-link', seating.buildSeating);

  $('body').on('click', '#staff-link', navbar.activeNavLinks);
  $('body').on('click', '#reservations-link', navbar.activeNavLinks);
  $('body').on('click', '#seating-link', navbar.activeNavLinks);
  $('body').on('click', '#ingredient-link', navbar.activeNavLinks);
  $('body').on('click', '#menu-link', navbar.activeNavLinks);

  $('body').on('click', '#menu-link', menu.menuItems);
  $('body').on('click', '.flip-container', (e) => {
    $(e.currentTarget).toggleClass('flipped');
  });
};

export default { clickEvents };
