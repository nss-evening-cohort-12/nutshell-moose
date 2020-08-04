import reservationSeatingData from '../../helpers/data/reservationSeatingData';

const assignTable = (e) => {
  const tableId = e.target.dataset.addReservationTableId;
  const reservationSeatId = e.target.dataset.resSeatId;
  const reservationId = $(e.target).val();

  const tempobj = {
    reservationId,
    tableId,
  };
  reservationSeatingData.updateReservationSeating(reservationSeatId, tempobj)
    .then()
    .catch((err) => console.warn(err));
};

export default { assignTable };
