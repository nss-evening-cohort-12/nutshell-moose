import moment from 'moment';
import './seating.scss';
import getSeatingData from '../../helpers/data/getSeatingData';
import utils from '../../helpers/utils';
import authData from '../../helpers/data/authData';
import reservationsData from '../../helpers/data/reservationsData';
import seatingReservations from './seatingReservations';

const sliderChange = (valueId) => {
  $(document).ready(() => {
    const valueSpan = $('.value-span');
    const value = $(`#${valueId}`);
    valueSpan.html(value.val());
    value.on('input change', () => {
      valueSpan.html(value.val());
    });
  });
};

const numberValidation = (e) => {
  e.preventDefault();
  const datePicked = $('#1date').val();
  const tableNum = $('#input-table-number').val() * 1;
  const capacity = $('#capacity-range').val() * 1;
  let occupied = '';

  if ($('#available-radio').is(':checked')) {
    occupied = true;
  } if ($('#unavailable-radio').is(':checked')) {
    occupied = false;
  }

  const newSeatingObj = {
    date: datePicked,
    capacity,
    occupied,
    tableNum,
  };

  if ((tableNum >= 1 && tableNum <= 30) && ($('#available-radio').is(':checked') || $('#unavailable-radio').is(':checked'))) {
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

const editTableForm = (e) => {
  e.preventDefault();
  const tableId = e.currentTarget.dataset.editTableId;

  getSeatingData.getSeating()
    .then((seating) => {
      seating.forEach((table) => {
        if (tableId === table.id) {
          $('.edit-table-form').val(`${table.tableNum}`);
          $('.edit-capacity-form').val(`${table.capacity}`);
          $('.value-span').html(`${table.capacity}`);

          if (table.occupied === true) {
            $(`#input-unavailable-${table.id}`).prop('checked', true);
          } else if (table.occupied === false) {
            $(`#input-available-${table.id}`).prop('checked', true);
          } else;
        }
        sliderChange(`input-capacity-${tableId}`);
      });
    })
    .catch((err) => console.error('getting tables for editing did not work ->', err));
};

const editTableEvent = (e) => {
  e.preventDefault();
  const tableId = e.currentTarget.dataset.editIdEvent;
  let occupied = '';

  if ($(`#input-available-${tableId}`).is(':checked')) {
    occupied = false;
  } if ($(`#input-unavailable-${tableId}`).is(':checked')) {
    occupied = true;
  }

  const editedTable = {
    date: $('#1date').val(),
    capacity: $(`#input-capacity-${tableId}`).val() * 1,
    occupied,
    tableNum: $(`#input-table-${tableId}`).val() * 1,
  };

  getSeatingData.updateTable(tableId, editedTable)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      buildSeating();
    })
    .catch((err) => console.error('could not edit the table -> ', err));
};

const deleteTableEvent = (e) => {
  const tableId = e.currentTarget.dataset.deleteTableId;

  getSeatingData.deleteTable(tableId)
    .then(() => {
      // eslint-disable-next-line no-use-before-define
      buildSeating();
    })
    .catch((err) => console.error('could not delete table -> ', err));
};

const checkAvailability = () => {
  let availableNum = 0;
  let unavailableNum = 0;

  getSeatingData.getSeating()
    .then((seating) => {
      seating.forEach((table) => {
        if (table.occupied === true) {
          $(`#${table.id}`).css('background-image', 'linear-gradient(0deg, #DDD, #FFF)');
          unavailableNum += 1;
        } else if (table.occupied === false) {
          $(`#${table.id}`).css('background-image', 'linear-gradient(0deg, #4169b3, #5386E4)');
          availableNum += 1;
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

const filterRes = (reservations, table) => {
  const resToPrint = [];
  let domString = '';
  reservations.forEach((res) => {
    if (res.partySize <= table.capacity) {
      resToPrint.push(res);
    }
  });
  resToPrint.forEach((res2) => {
    domString += `<option value="${res2.id}">${res2.name} - ${res2.partySize}</option>`;
  });
  return domString;
};

const optionBuilder = () => new Promise((resolve, reject) => {
  const datePicked = $('#1date').val();
  reservationsData.getReservations(datePicked)
    .then((reservations) => {
      getSeatingData.getSeating()
        .then((tables) => {
          tables.forEach((table) => {
            let domString = `<select id="${table.id}-selector" data-add-reservation-id="${table.id}" class="mt-3 res-order">`;
            domString += '<option value="" selected>Pick Reservation</option>';
            domString += filterRes(reservations, table);
            domString += '</select>';
            utils.printToDom(`#${table.id}-select`, domString);
            $(`#${table.id}-selector`).change(seatingReservations.assignTable);
          });
        });
      resolve();
    })
    .catch((err) => reject(err));
  // return domString;
});

const buildSeating = () => {
  const datePicked = $('#1date').val();
  const today = moment(Date.now()).format('YYYY-MM-DD');
  getSeatingData.getTableByDate(!datePicked ? today : datePicked)
    .then((res) => {
      const seating = utils.firebaseArray(res.data);
      let domString = `
        <div class="container">
          <div class="progress-grid">
            <div class="progress-title d-flex">
              <div class="m-2"><h2>Current Availability:</h2></div><div class="m-2"> <input type="date" class="m-1 form-control" id="1date" value="${!datePicked ? today : datePicked}"></div>
            </div>
            <div class="progress" style="height: 25px;">
              <div class="progress-bar available-bar" role="progressbar" style="width: 20%;" aria-valuemin="0" aria-valuemax="100">Available</div>
              <div class="progress-bar unavailable-bar" role="progressbar" style="width: 80%;" aria-valuemin="0" aria-valuemax="100">Unavailable</div>
            </div>
            <div class="dropdown new-table">
              <button class="btn btn-secondary dropdown-toggle shadow-none auth-only" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-plus"></i> New Table
              </button>
              <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                <form>
                  <div class="form-group">
                    <label for="input-table-number">Table Number</label>
                    <input type="number" max="30" min="1" class="form-control" id="input-table-number" placeholder="12" required>
                  </div>
                  <div class="form-group mb-1">
                    <label for="capacity-range">Capacity:</label>
                    <span class="font-weight-bold ml-2 value-span"></span>
                    <input type="range" class="custom-range" min="1" max="12" id="capacity-range">
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
            <h1 class="table-number"><span style="font-size: .6em;">Table</span> ${table.tableNum}</h1>
            <div class="res-selector" id="${table.id}-select"></div>
            <h3 class="table-delete auth-only" id="delete-table" data-delete-table-id=${table.id}><i class="fas fa-trash-alt"></i></h3>
            <h2 class="table-capacity"><i class="fas fa-users"></i> <span style="font-size: 1.3em;">${table.capacity}</span></h2>
            <div class="dropdown new-table">
              <a class="dropdown-toggle shadow-none" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <h3 class="table-edit auth-only" id="edit-table" data-edit-table-id=${table.id}><i class="fas fa-pen"></i></h3>
              </a>
              <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                <form>
                  <div class="form-group">
                    <label for="input-table-number">Table Number</label>
                    <input type="number" max="30" min="1" class="form-control edit-table-form" id="input-table-${table.id}" placeholder="12" required>
                  </div>
                  <div class="form-group mb-1">
                    <label for="input-capacity-${table.id}">Capacity:</label>
                    <span class="font-weight-bold ml-2 value-span"></span>
                    <input type="range" class="custom-range edit-capacity-form" min="1" max="12" id="input-capacity-${table.id}">
                  </div>
                  <div class="form-group">
                    <div class="custom-control custom-radio">
                      <input type="radio" id="input-available-${table.id}" name="customRadio" class="custom-control-input edit-radio">
                      <label class="custom-control-label" for="input-available-${table.id}">Available</label>
                    </div>
                    <div class="custom-control custom-radio">
                      <input type="radio" id="input-unavailable-${table.id}" name="customRadio" class="custom-control-input">
                      <label class="custom-control-label" for="input-unavailable-${table.id}">Unavailable</label>
                    </div>
                  </div>
                  <button type="submit" class="btn btn-secondary editTable" id="edit-${table.id}" data-edit-id-event=${table.id}>Update</button>
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
      sliderChange('capacity-range');
      authData.secureButtons();
      optionBuilder();
      $('#1date').change(buildSeating);
    })
    .catch((err) => console.error('getting the seating did not work -> ', err));
};

export default {
  buildSeating,
  numberValidation,
  editTableForm,
  editTableEvent,
  deleteTableEvent,
};
