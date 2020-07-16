import './seating.scss';
import getSeatingData from '../../helpers/data/getSeatingData';
import utils from '../../helpers/utils';

const buildSeating = (e) => {
  e.preventDefault();

  $('.nav-item').removeClass('active');
  $(`#${e.target.closest('li').id}`).addClass('active');

  getSeatingData.getSeating()
    .then((seating) => {
      let domString = '<div class="seating-grid">';
      seating.forEach((table) => {
        domString += `
          <div class="table-container">
            <div class="number-container">
              <h1 class="table-number">${table.tableNum}</h1>
            </div>
            <h2>Capacity: ${table.capacity}</h2>
            <h3>Available? ${table.occupied}</h3>
          </div>
        `;
      });
      domString += '</div>';
      utils.printToDom('#seating', domString);
    })
    .catch((err) => console.error('getting the seating did not work -> ', err));
};

export default { buildSeating };
