import './seating.scss';
import getSeatingData from '../../helpers/data/getSeatingData';
import utils from '../../helpers/utils';

const buildSeating = (e) => {
  e.preventDefault();

  $('.nav-item').removeClass('active');
  $(`#${e.target.closest('li').id}`).addClass('active');

  getSeatingData.getSeating()
    .then((seating) => {
      let domString = '';
      seating.forEach((table) => {
        domString += `<h1>${table.tableNum}</h1>`;
      });
      utils.printToDom('#seating', domString);
    })
    .catch((err) => console.error('getting the seating did not work -> ', err));
};

export default { buildSeating };
