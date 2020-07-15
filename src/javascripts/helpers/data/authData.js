import firebase from 'firebase/app';
import 'firebase/auth';

const logoutButton = $('#navbar-logout-button');
const loginButton = $('#navbar-login-button');
const authOnly = $('.auth-only');

// this should make sure all buttons with .auth-only class are hidden or unhidden appropriately:
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

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      logoutButton.removeClass('hide');
      loginButton.addClass('hide');
    } else {
      logoutButton.addClass('hide');
      loginButton.removeClass('hide');
    }
  });
};

export default { checkLoginStatus, secureButtons };
