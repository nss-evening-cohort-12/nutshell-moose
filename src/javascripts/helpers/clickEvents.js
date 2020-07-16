import menu from '../components/menu/menu';
import displayStaff from '../components/displayStaff/displayStaff';
import reservations from '../components/reservations/reservations';

const clickEvents = () => {
  $('body').on('click', '#staff-link', displayStaff.buildStaffConsole);
  $('body').on('click', '#reservations-link', reservations.reservationsPage);
  $('body').on('click', '#menu-link', menu.menuItems);
  $('body').on('click', '.flip-container', (e) => {
    $(e.currentTarget).toggleClass('flipped');
  });
};

export default { clickEvents };
