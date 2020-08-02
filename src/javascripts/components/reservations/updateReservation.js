import moment from 'moment';
import authData from '../../helpers/data/authData';
import utils from '../../helpers/utils';
import './reservations.scss';
import reservationsData from '../../helpers/data/reservationsData';
import getStaffData from '../../helpers/data/getStaffData';
import staffReservationData from '../../helpers/data/staffReservationData';
import reservationSmash from '../../helpers/data/reservationSmash';
import reservationClone from './reservations';

const dimCards = (shownCard) => {
  $('.reservation-card').addClass('mute-card bg-light');
  $(`#${shownCard}`).removeClass('mute-card bg-light');
};
// this is when user clicks the edit icon on reservations card
const editReservationForm = (reservation, reservationId) => {
  if (!authData.checkAuth()) {
    $('#edit-reservation').addClass('hide');
    return;
  }
  const today = moment(Date.now()).format('YYYY-MM-DD');
  const tomorrow = moment(today).add(1, 'd').format('YYYY-MM-DD');
  let existing = {
    name: '',
    partySize: 2,
    date: tomorrow,
    hour: 11,
    minutes: '00',
    save: 'new',
  };
  let formType = 'Add New';
  if (reservation) {
    // TODO: change color of form for editing existing res
    formType = 'Edit';
    existing = { ...reservation };
    existing.hour = Math.floor(existing.time / 100);
    existing.minutes = 0;
    existing.save = 'updated';
    existing.chef = reservation.staff.find((m) => m.type === 'Chef');
    existing.busser = reservation.staff.find((m) => m.type === 'Busser');
    existing.server = reservation.staff.find((m) => m.type === 'Server');
  }
  getStaffData.getStaff()
    .then((staff) => {
      const busserList = staff.filter((person) => person.type === 'Busser');
      const serverList = staff.filter((person) => person.type === 'Server');
      const chefList = staff.filter((person) => person.type === 'Chef');

      let domString = `
    <div id="add-edit-reservation-form">
      <div class="row reservation-header justify-content-between px-3">
        <div></div>
        <h3>${formType} Reservation</h3>
        <div class="cancel-area mx-2"><i class="far fa-2x fa-times-circle text-dark" id="cancel-res-edit"></i></div>
      </div>`;

      domString += `
    <div id="reservation-form">
      <form>
        <div class="form-group row">
          <label for="name" class="col-sm-1 col-form-label res-form-col">Name:</label>
          <div class="col-sm-5 res-form-col">
            <input type="text" class="form-control" id="name" value="${existing.name}" required>
          </div>
          <label for="date" class="col-sm-1 col-form-label res-form-col">Date:</label>
          <div class="col-sm-5 res-form-col">
            <input type="date" min="${today}" class="form-control" id="date" value="${existing.date}" required>
          </div>
        </div>
        <div class="form-group row">
          <label for="size" class="col-sm-1 col-form-label res-form-col">Party size:</label>
          <div class="col-sm-1 res-form-col">
            <input type="number" class="form-control" id="size" value=${existing.partySize} required" min="2" max="8">
          </div>
          <div class="col-sm-4 res-form-col"></div>
          <label for="time" class="col-sm-1 col-form-label res-form-col">Time:</label>
          <div class="col-sm-2 res-form-col">
            <div class="res-form-block">
              <select id="hour" name="hour" value=${existing.hour}>
                <option value=11>11</option>
                <option value=12>12</option>
                <option value=13>1</option>
                <option value=14>2</option>
                <option value=15>3</option>
                <option value=16>4</option>
                <option value=17>5</option>
                <option value=18>6</option>
                <option value=19>7</option>
                <option value=20>8</option>
                <option value=21>9</option>
                <option value=22>10</option>
              </select>
              :
              <select id="minutes" name="minutes">
                <option value=00>00</option>
                <option value=15>15</option>
                <option value=30>30</option>
                <option value=45>45</option>
              </select>
              <span id="ampm">AM</span>
            </div>
          </div>
        </div>
          <div class="form-group row">
          <label for="chef" class="col-sm-1 col-form-label res-form-col">Select Chef:</label>
          <div class="col-sm-3 res-form-col">
            <select class="form-control" id="chef">`;
      chefList.forEach((chef) => {
        if (chef.id === existing.chef.id) {
          domString += `<option value=${chef.id} selected="selected">${chef.name}</option>`;
        } else {
          domString += `<option value=${chef.id}>${chef.name}</option>`;
        }
      });
      domString += ` 
                  </select>  
                </div> 
                <label for="busser" class="col-sm-1 col-form-label res-form-col">Select Buss Boy:</label>
                <div class="col-sm-3 res-form-col">
                  <select class="form-control" id="busser">`;
      busserList.forEach((busser) => {
        if (busser.id === existing.busser.id) {
          domString += `<option value=${busser.id} selected="selected">${busser.name}</option>`;
        } else {
          domString += `<option value=${busser.id}>${busser.name}</option>`;
        }
      });
      domString += `   
                  </select>  
                </div> 
                <label for="server" class="col-sm-1 col-form-label res-form-col">Select Server:</label>
                <div class="col-sm-3 res-form-col">
                  <select class="form-control" id="server">`;
      serverList.forEach((server) => {
        if (server.id === existing.server.id) {
          domString += `<option value=${server.id} selected="selected">${server.name}</option>`;
        } else {
          domString += `<option value=${server.id}>${server.name}</option>`;
        }
      });
      domString += `
                  </select>  
                </div>
                </div> 
                <div class="col-sm-3 res-form-btns res-form-col">
                <button type="submit" class="btn btn-primary my-2" id="save-${existing.save}-res" data-reservationid="${reservationId}">Save Changes</button>
                <button type="submit" class="btn btn-danger my-2 ml-2" id="delete-reservation" data-reservationid="${reservationId}">Delete</button>
                </div>
        
      </form>
    </div>
  </div>`;
      utils.printToDom('#edit-reservation', domString);

      let select = existing.hour - 10;
      if (select < 0 || select > 11) { select = 0; }
      reservationClone.setSelectedIndex(document.getElementById('hour'), select);
      if (reservation) { reservationClone.setSelectedIndex(document.getElementById('minutes'), ((reservation.time % 100) / 15) + 1); }

      reservationClone.updateAmPmEvent();
    })
    .catch((err) => console.warn(err));
};

const editReservation = (reservationId) => {
  reservationSmash.getSingleResWithStaff(reservationId)
    .then((reservation) => {
      editReservationForm(reservation, reservationId);
      // $('#cancel-res-edit').removeClass('hide');
      // $('#delete-reservation').removeClass('hide');
    })
    .catch((err) => console.error(err));
};

const zip = (a, b) => {
  const arr = [];
  for (let i = 0; i < a.length; i += 1) {
    arr.push([a[i], b[i]]);
  }
  return arr;
};

const editReservationEvent = (e) => {
  e.preventDefault();
  const reservationId = e.target.dataset.reservationid;
  editReservation(reservationId);
  dimCards(reservationId);
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Updates the eservation staffs in to the staffReservation table for each chef, busser and server with same resId)
const updateStaffToStaffRes = (updatingReservationId, updatingStaffData) => new Promise((resolve, reject) => {
  const updatingStaffList = [];
  Object.values(updatingStaffData).forEach((value) => {
    updatingStaffList.push(value);
  });
  staffReservationData.getStaffResByResId(updatingReservationId)
    .then((staffRes) => {
      const zippedList = zip(staffRes, updatingStaffList);
      zippedList.forEach((staffReservation) => {
        const updatingStaffObj = {
          reservationsId: `${updatingReservationId}`,
          staffId: `${staffReservation[1]}`,
        };
        const staffResId = staffReservation[0].id;
        staffReservationData.updateStaffReservation(staffResId, updatingStaffObj)
          .then(() => {
            resolve();
          });
      });
    })
    .catch((err) => reject(err));
});

const updateReservationEvent = (e) => {
  e.preventDefault();
  const reservationId = e.target.dataset.reservationid;
  const time = Number($('#hour').val() + $('#minutes').val());
  const newReservationInfo = {
    name: $('#name').val(),
    partySize: $('#size').val(),
    date: $('#date').val(),
    time,
    totalCost: 0.0,
  };
  const newStaffData = {
    chef: $('#chef').val(),
    busser: $('#busser').val(),
    server: $('#server').val(),
  };
  reservationsData.updateReservation(reservationId, newReservationInfo)
    .then(() => {
      updateStaffToStaffRes(reservationId, newStaffData)
        .then(() => {
          reservationClone.displayReservations();
          reservationClone.displayReservationForm();
        });
    })
    .catch((err) => console.error('could not update reservation', err));
};

export default {
  editReservationEvent, updateReservationEvent,
};
