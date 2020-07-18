import firebase from 'firebase/app';
import 'firebase/auth';
// eslint-disable-next-line import/no-cycle
import clickEvents from '../clickEvents';

const authOnly = $('.auth-only');

// call this to appropriately hide or display everything with '.auth-only' class:
const secureButtons = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      authOnly.removeClass('hide');
    } else {
      authOnly.removeClass('hide');
      authOnly.addClass('hide');
    }
  });
};

// call this to check if user is authorized before running secure actions (returns boolean)
// jv- Does not return a bool, currently return 'undefined' regardless of auth status
const checkAuth = () => {
  firebase.auth().onAuthStateChanged((user) => (!!user));
};

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
  });
};

export default { checkLoginStatus, secureButtons, checkAuth };
