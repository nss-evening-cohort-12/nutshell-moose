const menuDom = (data) => {
  let domString = '<div class="d-flex justify-content-around">';
  data.forEach((menuItem) => {
    domString += `
            <div class="card">
            <img src="${menuItem.imgUrl}" class="card-img-top">
            <div class="card-body">
              <h5 class="card-title">${menuItem.name}</h5>
              <p class="card-text">$${menuItem.price.toFixed(2)}</p>
            </div>
          </div>
            `;
  });
  domString += '</div>';
  return domString;
};

const menuItems = () => {

};

export default { menuDom };
