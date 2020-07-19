import utils from '../../helpers/utils';
import './homePage.scss';

const displayHomePage = (user) => {
  let domString = '<div id="welcome-page">';
  if (user) {
    domString += `
    <img class="profile-pic mb-3" src="${user.photoURL}" alt="profile-pic">
    <h1 class="text-muted text-center">Hello, ${user.displayName}</h1>
    `;
  }
  domString += `
  <span class="mt-5 text-center">Welcome to La Baguette.</span>
  </div>
  `;
  utils.printToDom('#console', domString);
  $('.nav-item').removeClass('active');
};

export default { displayHomePage };
