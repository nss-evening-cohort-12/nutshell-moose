import menu from '../components/menu/menu';

const clickEvents = () => {
  $('body').on('click', '#menu-link', menu.menuItems);
};

export default { clickEvents };
