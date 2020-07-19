import firebase from 'firebase/app';
import 'firebase/auth';
// eslint-disable-next-line import/no-cycle
import clickEvents from '../clickEvents';
import homePage from '../../components/homePage/homePage';

// call this to appropriately hide things with '.auth-only' class:
const secureButtons = () => {
  if (!firebase.auth().currentUser) {
    $(document).ready(() => {
      $('.auth-only').addClass('hide');
    });
  }
};

// returns either user info or null (can use like true or false)
const checkAuth = () => firebase.auth().currentUser;

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      $('#sign-out-button').removeClass('hide');
      $('#sign-in-button').addClass('hide');
      clickEvents.authClickEvents();
    } else {
      $('#sign-out-button').addClass('hide');
      $('#sign-in-button').removeClass('hide');
    }
    homePage.displayHomePage(user);
  });
};

export default { checkLoginStatus, secureButtons, checkAuth };
