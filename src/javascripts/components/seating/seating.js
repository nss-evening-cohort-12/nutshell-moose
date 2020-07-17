import './seating.scss';
import getSeatingData from '../../helpers/data/getSeatingData';
import utils from '../../helpers/utils';

const sliderChange = () => {
  $(document).ready(() => {
    const valueSpan = $('.value-span');
    const value = $('#capacity-range');
    valueSpan.html(value.val());
    value.on('input change', () => {
      valueSpan.html(value.val());
    });
  });
};

const numberValidation = (e) => {
  e.preventDefault();
  const number = $('#input-table-number').val() * 1;
  const capacity = $('#capacity-range').val();

  getSeatingData.getSeating()
    .then((seating) => {
      seating.forEach((table) => {
        if (number === table.tableNum) {
          $('#input-table-number').after(`
            <div class="alert alert-danger alert-dismissible fade show mt-2 pl-2 pr-3" role="alert">
              <em>Table is not available.
              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          `);
        } else {
          $('.alert').remove('.alert');
          console.warn('Nice! That worked. -> ', `New Table Number: ${number} /`, `New Capacity: ${capacity}`);
        }
      });
    })
    .catch((err) => console.error('getting the seats for number validation did not work -> ', err));
};

const checkAvailability = () => {
  getSeatingData.getSeating()
    .then((seating) => {
      seating.forEach((table) => {
        if (table.occupied === true) {
          $(`#${table.id}`).css('background-color', '#FFF');
        } else if (table.occupied === false) {
          $(`#${table.id}`).css('background-color', '#5386E4');
        } else;
      });
    })
    .catch((err) => console.error('getting seat data for availability did not work -> ', err));
};

const buildSeating = () => {
  getSeatingData.getSeating()
    .then((seating) => {
      let domString = `
        <div class="container">
          <div class="progress-grid">
            <div class="progress-title">
              <h2>Current Availability:</h2>
            </div>
            <div class="progress" style="height: 25px;">
              <div class="progress-bar available-bar" role="progressbar" style="width: 20%;" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">Available</div>
              <div class="progress-bar unavailable-bar" role="progressbar" style="width: 80%;" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100">Unavailable</div>
            </div>
            <div class="dropdown new-table">
              <button class="btn btn-secondary dropdown-toggle shadow-none" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-plus"></i> New Table
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <form>
                  <div class="form-group">
                    <label for="input-table-number">Table Number</label>
                    <input type="number" max="30" min="1" class="form-control" id="input-table-number" placeholder="12" required>
                  </div>
                  <div class="form-group">
                    <label for="capacity-range">Capacity:</label>
                    <span class="font-weight-bold ml-2 value-span"></span>
                    <input type="range" class="custom-range" min="1" max="6" id="capacity-range">
                  </div>
                  <button type="submit" class="btn btn-secondary" id="add-new-table">Add Table</button>
                </form>
              </div>
            </div>
          </div>
          <div class="seating-grid">
      `;
      seating.forEach((table) => {
        domString += `
          <div class="table-container" id="${table.id}">
            <h1 class="table-number"><i class="fas fa-hashtag" style="font-size: .6em;"></i> ${table.tableNum}</h1>
            <h2 class="table-capacity"><i class="fas fa-users"></i> <span style="font-size: 1.3em;">${table.capacity}</span></h2>
            <h3 class="table-edit"><i class="fas fa-pen"></i></h3>
          </div>
        `;
      });
      domString += `
          </div>
        </div>
      `;
      utils.printToDom('#console', domString);
      checkAvailability();
      sliderChange();
    })
    .catch((err) => console.error('getting the seating did not work -> ', err));
};

export default { buildSeating, numberValidation };
