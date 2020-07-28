import utils from '../../helpers/utils';

import reservationsData from '../../helpers/data/reservationsData';

const ddResevations = (currentFilter) => {
  reservationsData.getReservationsByDateCost(currentFilter)
    .then((response) => {
      const reservationObj = response;
      // console.warn('this is the reservation objexct: ', reservationObj);
      let domString = '<option value="" selected disabled> select reservation: </option>';
      reservationObj.forEach((reservation) => {
        // reservationStoreObject.push(reservation);
        domString += `
        <option value="${reservation.id}" id=${reservation.id}>${reservation.name}</option>
        `;
      });
      utils.printToDom('#resOrder', domString);
    })
    .catch((err) => console.warn('couldnt get reservation data ', err));
};

export default { ddResevations };
