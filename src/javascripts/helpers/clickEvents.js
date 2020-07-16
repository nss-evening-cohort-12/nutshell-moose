import menu from '../components/menu/menu';

const clickEvents = () => {
  $('body').on('click', '#menu-link', menu.menuItems);
  $('body').on('click', '.flip-container', (e) => {
    $(e.currentTarget).toggleClass('flipped');
  });
};

export default { clickEvents };
