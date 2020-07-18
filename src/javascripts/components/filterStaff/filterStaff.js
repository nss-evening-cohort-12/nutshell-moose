import getStaffData from '../../helpers/data/getStaffData';
import displyStaff from '../displayStaff/displayStaff';

const filterStaffEvent = (e) => {
  const { staffType } = e.target.dataset;
  getStaffData.getStaffByType(staffType)
    .then((response) => {
      displyStaff.buildStaffCards(response);
    })
    .catch((err) => console.error(err));
};

export default { filterStaffEvent };
