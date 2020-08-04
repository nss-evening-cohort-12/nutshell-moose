const { default: reservationsData } = require('./reservationsData');
const { default: staffReservationData } = require('./staffReservationData');
const { default: getStaffData } = require('./getStaffData');

const getSingleResWithStaff = (resId) => new Promise((resolve, reject) => {
// 1. get the reservation who's id is resId
  reservationsData.getReservationById(resId)
    .then((response) => {
      const reservation = response;
      reservation.id = resId;
      reservation.staff = [];
      // 2. get all of their staffReservations using the resId
      staffReservationData.getStaffResByResId(resId).then((resStaff) => {
        // 3. get ALL of the staffs
        getStaffData.getStaff().then((allStaff) => {
          // 4. add the staffs linked staffRes to reservation.staff[]
          resStaff.forEach((staffRes) => {
            const staff = allStaff.find((m) => m.id === staffRes.staffId);
            reservation.staff.push(staff);
          });
          /**
         * example retun:
         * {
         *   "name": "John",
             "partySize": 2,
             "date": "2020-08-01",
             "time": 2000,
             "totalCost": 0.00,
             id: 'reservationId',
         *   staff: [
         *     { id: 'staff6', name: 'Ada', "type": "Chef" },
         *     { id: 'staff2', name: 'Abelard', "type": "Busser" },
         *     { id: 'staff4', name: 'Achille', "type": "Server" },
         *   ],
         * }
         */
          resolve(reservation);
        });
      });
    })
    .catch((err) => reject(err));
});

export default { getSingleResWithStaff };
