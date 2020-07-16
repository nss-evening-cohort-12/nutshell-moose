import './seating.scss';
import getSeatingData from '../../helpers/data/getSeatingData';
import utils from '../../helpers/utils';

const buildSeating = (e) => {
  e.preventDefault();

  $('.nav-item').removeClass('active');
  $(`#${e.target.closest('li').id}`).addClass('active');

  getSeatingData.getSeating()
    .then((seating) => {
      let domString = `
      <div class="progress-title">
        <h2>Current Availability:</h2>
      </div>
      <div class="progress">
        <div class="progress-bar available-bar" role="progressbar" style="width: 80%;" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100">Available</div>
        <div class="progress-bar unavailable-bar" role="progressbar" style="width: 20%;" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">Unavailable</div>
      </div>
      <div class="seating-grid">
      `;
      seating.forEach((table) => {
        domString += `
          <div class="table-container">
            <h1 class="table-number"><i class="fas fa-hashtag" style="font-size: .6em;"></i> ${table.tableNum}</h1>
            <h2><i class="fas fa-users"></i> <span style="font-size: 1.3em;">${table.capacity}</span></h2>
          </div>
        `;
      });
      domString += '</div>';
      utils.printToDom('#seating', domString);
    })
    .catch((err) => console.error('getting the seating did not work -> ', err));
};

export default { buildSeating };
