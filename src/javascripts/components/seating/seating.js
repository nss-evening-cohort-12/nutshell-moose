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
  const tableNum = $('#input-table-number').val() * 1;
  const capacity = $('#capacity-range').val() * 1;
  let occupied = '';

  if ($('#available-radio').is(':checked')) {
    occupied = true;
  } if ($('#unavailable-radio').is(':checked')) {
    occupied = false;
  }

  const newSeatingObj = {
    capacity,
    occupied,
    tableNum,
  };

  if ((tableNum >= 7 && tableNum <= 30) && ($('#available-radio').is(':checked') || $('#unavailable-radio').is(':checked'))) {
    $('.alert').remove('.alert');
    getSeatingData.addTable(newSeatingObj)
      .then(() => {
        // eslint-disable-next-line no-use-before-define
        buildSeating();
      })
      .catch((err) => console.error('adding to the table did not work -> ', err));
  } else {
    $('.alert').remove('.alert');
    $('#input-table-number').after(`
      <div class="alert alert-danger alert-dismissible fade show mt-2 pl-2 pr-3" role="alert">
        <em>Fill out entire form.
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    `);
  }
};

const editTable = (e) => {
  e.preventDefault();
  const currentTable = e.currentTarget.dataset.editTableId;

  getSeatingData.getSeating()
    .then((seating) => {
      seating.forEach((table) => {
        if (currentTable === table.id) {
          $('.edit-table-form').val(`${table.tableNum}`);
          $('.edit-capacity-form').val(`${table.capacity}`);
          $('.value-span').html(`${table.capacity}`);
        }
      });
    })
    .catch((err) => console.error('getting tables for editing did not work ->', err));
};

const checkAvailability = () => {
  let availableNum = 0;
  let unavailableNum = 0;

  getSeatingData.getSeating()
    .then((seating) => {
      seating.forEach((table) => {
        if (table.occupied === true) {
          $(`#${table.id}`).css('background-color', '#FFF');
          availableNum += 1;
        } else if (table.occupied === false) {
          $(`#${table.id}`).css('background-color', '#5386E4');
          unavailableNum += 1;
        } else;
      });

      if (availableNum > unavailableNum) {
        $('.available-bar').css('width', '75%');
        $('.unavailable-bar').css('width', '25%');
      } else if (availableNum < unavailableNum) {
        $('.available-bar').css('width', '25%');
        $('.unavailable-bar').css('width', '75%');
      } else if (availableNum === unavailableNum) {
        $('.available-bar').css('width', '50%');
        $('.unavailable-bar').css('width', '50%');
      }
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
              <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                <form>
                  <div class="form-group">
                    <label for="input-table-number">Table Number</label>
                    <input type="number" max="30" min="7" class="form-control" id="input-table-number" placeholder="12" required>
                  </div>
                  <div class="form-group mb-1">
                    <label for="capacity-range">Capacity:</label>
                    <span class="font-weight-bold ml-2 value-span"></span>
                    <input type="range" class="custom-range" min="1" max="6" id="capacity-range">
                  </div>
                  <div class="form-group">
                    <div class="custom-control custom-radio">
                      <input type="radio" id="available-radio" name="customRadio" class="custom-control-input">
                      <label class="custom-control-label" for="available-radio">Available</label>
                    </div>
                    <div class="custom-control custom-radio">
                      <input type="radio" id="unavailable-radio" name="customRadio" class="custom-control-input">
                      <label class="custom-control-label" for="unavailable-radio">Unavailable</label>
                    </div>
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
            <div class="dropdown new-table">
              <a class="dropdown-toggle shadow-none" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <h3 class="table-edit" id="edit-table" data-edit-table-id=${table.id}><i class="fas fa-pen"></i></h3>
              </a>
              <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                <form>
                  <div class="form-group">
                    <label for="input-table-number">Table Number</label>
                    <input type="number" max="30" min="7" class="form-control edit-table-form" id="input-table-number" placeholder="12" required>
                  </div>
                  <div class="form-group mb-1">
                    <label for="capacity-range">Capacity:</label>
                    <span class="font-weight-bold ml-2 value-span"></span>
                    <input type="range" class="custom-range edit-capacity-form" min="1" max="6" id="capacity-range">
                  </div>
                  <button type="submit" class="btn btn-secondary" id="add-new-table">Update</button>
                </form>
              </div>
            </div>
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

export default { buildSeating, numberValidation, editTable };
