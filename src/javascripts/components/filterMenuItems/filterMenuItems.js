import ingredData from '../../helpers/data/ingredData';
import './filterMenuItem.scss';

const getAllChecked = () => {
  const a = [];
  $('.filter-menu:checked').each((index, element) => {
    a.push($(element).val());
  });
  return a;
};

const filterMenu = () => {
  ingredData.getIngredientsJoin()
    .then((joins) => {
      const checkArray = getAllChecked();
      $('.remove-card-class').addClass('fade-out');
      joins.forEach((join) => {
        if (checkArray.length === 0) {
          $('.remove-card-class').removeClass('fade-out');
        }
        if (checkArray.includes(join.ingredientId)) {
          $(`#${join.menuId}`).removeClass('fade-out');
        }
      });
    })
    .catch((err) => console.error(err));
};

export default { filterMenu, getAllChecked };
